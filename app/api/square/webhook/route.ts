import crypto from "crypto";
import { NextResponse } from "next/server";
import { fixPackDepositOffer, quickAuditOffer } from "@/lib/offers";
import { resolveAppUrl } from "@/lib/appUrl";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logPayment } from "@/lib/googleSheets";
import { markLeadFollowupsConverted } from "@/lib/leadFollowups";
import { getInternalNotificationRecipients, sendResendEmail } from "@/lib/resend";

export const runtime = "nodejs";

/**
 * Square webhook endpoint.
 *
 * In your Square Developer Dashboard → Webhooks, add:
 *   URL: https://siteer.dev/api/square/webhook
 *   Events: payment.updated
 *
 * Square sends HMAC-SHA256 signature in the "x-square-hmacsha256-signature" header.
 * Set SQUARE_WEBHOOK_SIGNATURE_KEY in your Vercel env vars (from Square dashboard).
 */

function verifySquareSignature(
    body: string,
    signature: string | null,
    sigKey: string,
    webhookUrl: string,
): boolean {
    if (!signature || !sigKey) return false;
    const hmac = crypto.createHmac("sha256", sigKey);
    hmac.update(webhookUrl + body);
    const expected = hmac.digest("base64");
    const providedBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expected, "utf8");
    if (providedBuffer.length !== expectedBuffer.length) return false;
    return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
    const rawBody = await request.text();
    const signature = request.headers.get("x-square-hmacsha256-signature");
    const sigKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY ?? "";
    const appUrl = resolveAppUrl(request);
    const webhookUrl = `${appUrl}/api/square/webhook`;

    // Verify signature in production
    if (sigKey && !verifySquareSignature(rawBody, signature, sigKey, webhookUrl)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let event: Record<string, unknown>;
    try {
        event = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const eventType = event.type as string | undefined;

    try {
        const paymentObj = (event.data as Record<string, unknown>)?.object as Record<string, unknown> | undefined;
        const payment = paymentObj?.payment as Record<string, unknown> | undefined;
        const paymentStatus = payment?.status as string | undefined;
        const squareOrderId = payment?.order_id as string | undefined;
        const buyerEmail = (payment?.buyer_email_address as string | undefined) ?? null;
        const amountMoney = payment?.amount_money as { amount?: number; currency?: string } | undefined;
        const amountCents = amountMoney?.amount ?? 0;

        // Payment links generate payment.updated events when the payment becomes COMPLETED.
        if (!["payment.updated", "payment.completed"].includes(eventType ?? "")) {
            return NextResponse.json({ ok: true, skipped: true, reason: "unsupported_event" });
        }

        if (paymentStatus !== "COMPLETED") {
            return NextResponse.json({ ok: true, skipped: true, reason: paymentStatus ?? "missing_status" });
        }

        let reportToken: string | null = null;
        let contactEmail = buyerEmail ?? "unknown";
        let shouldNotify = true;

        try {
            const supabaseAdmin = getSupabaseAdmin();
            const { data: paymentRecord } = await supabaseAdmin
                .from("payments")
                .update({ status: "completed" })
                .eq("square_link_id", squareOrderId ?? "")
                .neq("status", "completed")
                .select("report_token, email")
                .maybeSingle();

            reportToken = paymentRecord?.report_token ?? null;
            contactEmail = paymentRecord?.email ?? buyerEmail ?? "unknown";
            shouldNotify = Boolean(paymentRecord || !squareOrderId);
        } catch (persistenceError) {
            console.warn(
                "[/api/square/webhook] Payment persistence fallback:",
                persistenceError instanceof Error
                    ? persistenceError.message
                    : "Unknown persistence error",
            );
        }

        if (!shouldNotify) {
            return NextResponse.json({ ok: true, skipped: true, reason: "already_processed" });
        }

        const isQuoteDeposit = Boolean(reportToken?.startsWith("quote:"));
        const quoteReference = isQuoteDeposit ? reportToken?.slice("quote:".length) : null;
        const reportUrl = reportToken && !isQuoteDeposit
            ? `${appUrl}/scan/${reportToken}?paid=true`
            : quoteReference
                ? `${appUrl}/get-quote?deposit=paid&quote=${encodeURIComponent(quoteReference)}`
                : null;

        await logPayment({
            email: contactEmail,
            reportToken: reportToken ?? squareOrderId ?? "",
            amountCents,
            status: "completed",
        });

        if (reportToken && !isQuoteDeposit) {
            try {
                await markLeadFollowupsConverted(reportToken);
            } catch (followupError) {
                console.warn(
                    "[/api/square/webhook] Failed to stop follow-ups after payment:",
                    followupError instanceof Error ? followupError.message : "Unknown follow-up error",
                );
            }
        }

        // Notify Jason and Frank
        try {
            await sendResendEmail({
                to: getInternalNotificationRecipients(),
                subject: isQuoteDeposit
                    ? `💰 ${fixPackDepositOffer.priceLabel} ER Fix Pack Deposit Paid`
                    : `💰 $${(amountCents / 100).toFixed(2)} ${quickAuditOffer.name} Purchased — Action Required`,
                html: `
                        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
                            <div style="background:#0f172a;padding:24px 28px;border-radius:12px 12px 0 0">
                                <div style="color:#3ee28f;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">SiteER — Payment Received</div>
                                <h2 style="color:#eef7ff;margin:0;font-size:20px">${isQuoteDeposit ? "ER Fix Pack Deposit" : quickAuditOffer.name} — Human Review Needed</h2>
                            </div>
                            <div style="background:#1e293b;padding:24px 28px;border-radius:0 0 12px 12px">
                                <table style="border-collapse:collapse;width:100%;font-size:14px">
                                    <tr><td style="padding:8px 0;color:#94a3b8;width:130px">Amount Paid</td><td style="padding:8px 0;color:#3ee28f;font-weight:700;font-size:16px">$${(amountCents / 100).toFixed(2)}</td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Buyer Email</td><td style="padding:8px 0;color:#6ee7ff"><a href="mailto:${contactEmail}" style="color:#6ee7ff">${contactEmail}</a></td></tr>
                                    ${isQuoteDeposit && quoteReference ? `<tr><td style="padding:8px 0;color:#94a3b8">Quote Reference</td><td style="padding:8px 0;color:#eef7ff;font-family:monospace;font-size:12px">${quoteReference}</td></tr>` : ""}
                                    ${reportToken && !isQuoteDeposit ? `<tr><td style="padding:8px 0;color:#94a3b8">Report Token</td><td style="padding:8px 0;color:#eef7ff;font-family:monospace;font-size:12px">${reportToken}</td></tr>` : ""}
                                </table>

                                ${reportUrl ? `
                                <div style="margin-top:20px">
                                    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1b080a;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none;font-size:14px">
                                        ${isQuoteDeposit ? "View Quote Confirmation →" : "View Their Scan Report →"}
                                    </a>
                                </div>
                                <div style="margin-top:12px;font-size:13px;color:#94a3b8">
                                    ${isQuoteDeposit
                                        ? `Deposit captured. Reach out to <a href="mailto:${contactEmail}" style="color:#6ee7ff">${contactEmail}</a> and move the ER Fix Pack into scheduling as soon as possible.`
                                        : `Open the report, review their scan data, and prepare the short PDF action plan.<br/>Reach out to <a href="mailto:${contactEmail}" style="color:#6ee7ff">${contactEmail}</a> as soon as possible.`}
                                </div>
                                ` : `
                                <div style="margin-top:12px;font-size:13px;color:#94a3b8">
                                    Could not locate the linked record. Check Supabase payments table for Square order ID: <code style="color:#ff8792">${squareOrderId ?? "unknown"}</code>
                                </div>
                                `}

                                <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#64748b">
                                    SiteER · <a href="https://coaibakersfield.com" style="color:#94a3b8">COAIBAKERSFIELD.COM</a>
                                </div>
                            </div>
                        </div>
                    `,
            });
        } catch (emailError) {
            console.error(
                "[/api/square/webhook] Email notification failed:",
                emailError instanceof Error ? emailError.message : "Unknown email error",
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Webhook processing failed";
        console.error("[/api/square/webhook] Error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
