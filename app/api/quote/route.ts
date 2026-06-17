import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveAppUrl } from "@/lib/appUrl";
import { fixPackDepositOffer } from "@/lib/offers";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logPayment, logQuote } from "@/lib/googleSheets";
import { getInternalNotificationRecipients, sendResendEmail } from "@/lib/resend";
import { formatPublicValidationError } from "@/lib/publicValidation";

export const runtime = "nodejs";

const QuoteSchema = z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).optional(),
    businessName: z.string().trim().min(1).max(120),
    websiteUrl: z.string().trim().url().max(2048).optional().or(z.literal("")),
});

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = await consumeRateLimit(`quote:${ip}`, 5, 60_000);
    if (!limiter.ok) {
        return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }

    try {
        const body = QuoteSchema.parse(await request.json());
        const appUrl = resolveAppUrl(request);
        const normalizedEmail = body.email.trim().toLowerCase();
        let quoteId: string | null = null;
        try {
            const supabaseAdmin = getSupabaseAdmin();
            const { data: quote, error } = await supabaseAdmin.from("quotes").insert({
                first_name: body.firstName,
                last_name: body.lastName,
                email: normalizedEmail,
                phone: body.phone || null,
                business_name: body.businessName,
                website_url: body.websiteUrl || null,
            }).select("id").single();

            if (error) {
                throw new Error(error.message);
            }

            quoteId = quote?.id ?? null;
        } catch (persistenceError) {
            console.warn(
                "[/api/quote] Persistence fallback:",
                persistenceError instanceof Error
                    ? persistenceError.message
                    : "Unknown persistence error",
            );
        }

        await logQuote({
            firstName: body.firstName,
            lastName: body.lastName,
            email: normalizedEmail,
            phone: body.phone,
            businessName: body.businessName,
            websiteUrl: body.websiteUrl,
        });

        const quoteReference = quoteId ?? crypto.randomUUID();

        try {
            await sendResendEmail({
                to: getInternalNotificationRecipients(),
                subject: `🔔 New Fix Quote Request — ${body.businessName}`,
                html: `
                            <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
                                <div style="background:#0f172a;padding:24px 28px;border-radius:12px 12px 0 0">
                                    <div style="color:#ff4d5e;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">SiteER — New Lead</div>
                                    <h2 style="color:#eef7ff;margin:0;font-size:20px">Fix Quote Request</h2>
                                </div>
                                <div style="background:#1e293b;padding:24px 28px;border-radius:0 0 12px 12px">
                                    <table style="border-collapse:collapse;width:100%;font-size:14px">
                                        <tr><td style="padding:8px 0;color:#94a3b8;width:110px">Quote Ref</td><td style="padding:8px 0;color:#eef7ff;font-family:monospace;font-size:12px">${quoteReference}</td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8;width:110px">Name</td><td style="padding:8px 0;color:#eef7ff;font-weight:600">${body.firstName} ${body.lastName}</td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0;color:#6ee7ff"><a href="mailto:${normalizedEmail}" style="color:#6ee7ff">${normalizedEmail}</a></td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8">Phone</td><td style="padding:8px 0;color:#eef7ff">${body.phone || "—"}</td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8">Business</td><td style="padding:8px 0;color:#eef7ff;font-weight:600">${body.businessName}</td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8">Website</td><td style="padding:8px 0;color:#6ee7ff">${body.websiteUrl ? `<a href="${body.websiteUrl}" style="color:#6ee7ff">${body.websiteUrl}</a>` : "—"}</td></tr>
                                        <tr><td style="padding:8px 0;color:#94a3b8">Deposit Due</td><td style="padding:8px 0;color:#ffb15c;font-weight:700">${fixPackDepositOffer.priceLabel} applied toward ER Fix Pack total</td></tr>
                                    </table>
                                    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#64748b">
                                        Submitted via SiteER · <a href="https://coaibakersfield.com" style="color:#94a3b8">COAIBAKERSFIELD.COM</a>
                                    </div>
                                </div>
                            </div>
                        `,
            });
        } catch (notificationError) {
            console.error(
                "[/api/quote] Email notification failed:",
                notificationError instanceof Error ? notificationError.message : "Unknown email error",
            );
        }

        const accessToken = process.env.SQUARE_ACCESS_TOKEN;
        const locationId = process.env.SQUARE_LOCATION_ID;
        const squareEnvironment = process.env.SQUARE_ENVIRONMENT ?? "sandbox";
        if (!accessToken || !locationId) {
            throw new Error("Square deposit checkout is not configured");
        }

        const squareHost = squareEnvironment === "production"
            ? "connect.squareup.com"
            : "connect.squareupsandbox.com";
        const redirectUrl = `${appUrl}/get-quote?deposit=paid&quote=${encodeURIComponent(quoteReference)}`;

        const squareRes = await fetch(`https://${squareHost}/v2/online-checkout/payment-links`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Square-Version": "2024-01-18",
            },
            body: JSON.stringify({
                idempotency_key: crypto.randomBytes(16).toString("hex"),
                description: `${fixPackDepositOffer.name} for ${body.businessName} — ${fixPackDepositOffer.description}`,
                quick_pay: {
                    name: `${fixPackDepositOffer.name} — ${body.businessName}`,
                    price_money: { amount: fixPackDepositOffer.priceCents, currency: "USD" },
                    location_id: locationId,
                },
                checkout_options: {
                    redirect_url: redirectUrl,
                    ask_for_shipping_address: false,
                },
            }),
        });

        const squareData = await squareRes.json();
        const paymentLink = squareData.payment_link as
            | { id?: string; order_id?: string; url?: string }
            | undefined;
        const squareOrderId = paymentLink?.order_id
            ?? squareData.related_resources?.orders?.[0]?.id
            ?? paymentLink?.id
            ?? null;

        if (!squareRes.ok || !paymentLink?.url) {
            throw new Error(squareData.errors?.[0]?.detail ?? "Square checkout creation failed");
        }

        try {
            const supabaseAdmin = getSupabaseAdmin();
            await supabaseAdmin.from("payments").insert({
                report_token: `quote:${quoteReference}`,
                email: normalizedEmail,
                square_link_id: squareOrderId,
                amount_cents: fixPackDepositOffer.priceCents,
                status: "pending",
            });
        } catch (persistenceError) {
            console.warn(
                "[/api/quote] Payment persistence fallback:",
                persistenceError instanceof Error
                    ? persistenceError.message
                    : "Unknown persistence error",
            );
        }

        await logPayment({
            email: normalizedEmail,
            reportToken: `quote:${quoteReference}`,
            amountCents: fixPackDepositOffer.priceCents,
            status: "quote_deposit_started",
        });

        return NextResponse.json({ ok: true, checkoutUrl: paymentLink.url });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Quote submission failed";

        const sanitizedError = error instanceof z.ZodError
            ? formatPublicValidationError(error, {
                fieldLabels: {
                    firstName: "first name",
                    lastName: "last name",
                    email: "email address",
                    phone: "phone number",
                    businessName: "business name",
                    websiteUrl: "website URL",
                },
                fieldMessages: {
                    email: "Please enter a valid email address.",
                    websiteUrl: "Please enter a full website URL like https://yourbusiness.com.",
                    phone: "Please enter a valid phone number.",
                },
            })
            : message.includes("Square")
            ? "Your quote was received, but the $200 deposit checkout could not start. Please contact Jason directly."
            : message.includes("Supabase") ||
                               message.includes("connection") ||
                               message.includes("timeout")
            ? "Failed to submit your quote. Please try again or contact support."
            : message;

        console.error("[/api/quote] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
