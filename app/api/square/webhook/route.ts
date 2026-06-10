import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logPayment } from "@/lib/googleSheets";

export const runtime = "nodejs";

/**
 * Square webhook endpoint.
 *
 * In your Square Developer Dashboard → Webhooks, add:
 *   URL: https://siteer.dev/api/square/webhook
 *   Events: payment.completed
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
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(request: Request) {
    const rawBody = await request.text();
    const signature = request.headers.get("x-square-hmacsha256-signature");
    const sigKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY ?? "";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://siteer.dev";
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

    // Only handle completed payments
    if (eventType !== "payment.completed") {
        return NextResponse.json({ ok: true, skipped: true });
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const paymentObj = (event.data as Record<string, unknown>)?.object as Record<string, unknown> | undefined;
        const payment = paymentObj?.payment as Record<string, unknown> | undefined;
        const squareLinkId = payment?.order_id as string | undefined;
        const buyerEmail = (payment?.buyer_email_address as string | undefined) ?? null;
        const amountMoney = payment?.amount_money as { amount?: number; currency?: string } | undefined;
        const amountCents = amountMoney?.amount ?? 0;

        // Mark payment as completed in Supabase using the Square order ID
        const { data: paymentRecord } = await supabaseAdmin
            .from("payments")
            .update({ status: "completed" })
            .eq("square_link_id", squareLinkId ?? "")
            .select("report_token, email")
            .single();

        const reportToken = paymentRecord?.report_token ?? null;
        const reportUrl = reportToken ? `${appUrl}/scan/${reportToken}?paid=true` : null;
        const contactEmail = paymentRecord?.email ?? buyerEmail ?? "unknown";

        // Log to Google Sheets (non-blocking)
        void logPayment({
            email: contactEmail,
            reportToken: reportToken ?? "",
            amountCents,
            status: "completed",
        });

        // Notify Jason and Frank
        const resendKey = process.env.RESEND_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL ?? "SiteER <reports@siteer.dev>";
        const notifyAddresses = ["jasonm@coaibakersfield.com", "frankh@coaibakersfield.com"];

        if (resendKey) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: senderEmail,
                    to: notifyAddresses,
                    subject: `💰 $${(amountCents / 100).toFixed(2)} Deep ER Report Purchased — Action Required`,
                    html: `
                        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
                            <div style="background:#0f172a;padding:24px 28px;border-radius:12px 12px 0 0">
                                <div style="color:#3ee28f;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">SiteER — Payment Received</div>
                                <h2 style="color:#eef7ff;margin:0;font-size:20px">Deep ER Report — Human Review Needed</h2>
                            </div>
                            <div style="background:#1e293b;padding:24px 28px;border-radius:0 0 12px 12px">
                                <table style="border-collapse:collapse;width:100%;font-size:14px">
                                    <tr><td style="padding:8px 0;color:#94a3b8;width:130px">Amount Paid</td><td style="padding:8px 0;color:#3ee28f;font-weight:700;font-size:16px">$${(amountCents / 100).toFixed(2)}</td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Buyer Email</td><td style="padding:8px 0;color:#6ee7ff"><a href="mailto:${contactEmail}" style="color:#6ee7ff">${contactEmail}</a></td></tr>
                                    ${reportToken ? `<tr><td style="padding:8px 0;color:#94a3b8">Report Token</td><td style="padding:8px 0;color:#eef7ff;font-family:monospace;font-size:12px">${reportToken}</td></tr>` : ""}
                                </table>

                                ${reportUrl ? `
                                <div style="margin-top:20px">
                                    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1b080a;font-weight:700;padding:12px 22px;border-radius:8px;text-decoration:none;font-size:14px">
                                        View Their Scan Report →
                                    </a>
                                </div>
                                <div style="margin-top:12px;font-size:13px;color:#94a3b8">
                                    Open the report, review their scan data, and prepare the deep PDF review.<br/>
                                    Reach out to <a href="mailto:${contactEmail}" style="color:#6ee7ff">${contactEmail}</a> within 30–60 minutes.
                                </div>
                                ` : `
                                <div style="margin-top:12px;font-size:13px;color:#94a3b8">
                                    Could not locate the report token. Check Supabase payments table for Square order ID: <code style="color:#ff8792">${squareLinkId ?? "unknown"}</code>
                                </div>
                                `}

                                <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#64748b">
                                    SiteER · <a href="https://coaibakersfield.com" style="color:#94a3b8">COAIBAKERSFIELD.COM</a>
                                </div>
                            </div>
                        </div>
                    `,
                }),
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Webhook processing failed";
        console.error("[/api/square/webhook] Error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
