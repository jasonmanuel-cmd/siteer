import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logQuote } from "@/lib/googleSheets";

export const runtime = "nodejs";

const QuoteSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    businessName: z.string().min(1),
    websiteUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = consumeRateLimit(`quote:${ip}`, 5, 60_000);
    if (!limiter.ok) {
        return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body = QuoteSchema.parse(await request.json());

        const { error } = await supabaseAdmin.from("quotes").insert({
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email.trim().toLowerCase(),
            phone: body.phone || null,
            business_name: body.businessName,
            website_url: body.websiteUrl || null,
        });

        if (error) throw new Error(error.message);

        // Log to Google Sheets (non-blocking)
        void logQuote({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            businessName: body.businessName,
            websiteUrl: body.websiteUrl,
        });

        // Notify team via Resend — both Jason and Frank receive every quote request
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
                    subject: `🔔 New Fix Quote Request — ${body.businessName}`,
                    html: `
                        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
                            <div style="background:#0f172a;padding:24px 28px;border-radius:12px 12px 0 0">
                                <div style="color:#ff4d5e;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px">SiteER — New Lead</div>
                                <h2 style="color:#eef7ff;margin:0;font-size:20px">Fix Quote Request</h2>
                            </div>
                            <div style="background:#1e293b;padding:24px 28px;border-radius:0 0 12px 12px">
                                <table style="border-collapse:collapse;width:100%;font-size:14px">
                                    <tr><td style="padding:8px 0;color:#94a3b8;width:110px">Name</td><td style="padding:8px 0;color:#eef7ff;font-weight:600">${body.firstName} ${body.lastName}</td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0;color:#6ee7ff"><a href="mailto:${body.email}" style="color:#6ee7ff">${body.email}</a></td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Phone</td><td style="padding:8px 0;color:#eef7ff">${body.phone || "—"}</td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Business</td><td style="padding:8px 0;color:#eef7ff;font-weight:600">${body.businessName}</td></tr>
                                    <tr><td style="padding:8px 0;color:#94a3b8">Website</td><td style="padding:8px 0;color:#6ee7ff">${body.websiteUrl ? `<a href="${body.websiteUrl}" style="color:#6ee7ff">${body.websiteUrl}</a>` : "—"}</td></tr>
                                </table>
                                <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#64748b">
                                    Submitted via SiteER · <a href="https://coaibakersfield.com" style="color:#94a3b8">COAIBAKERSFIELD.COM</a>
                                </div>
                            </div>
                        </div>
                    `,
                }),
            });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Quote submission failed";
        
        // Sanitize error message to not expose internal implementation
        const sanitizedError = message.includes("Supabase") ||
                               message.includes("connection") ||
                               message.includes("Resend") ||
                               message.includes("timeout")
            ? "Failed to submit your quote. Please try again or contact support."
            : message;
        
        console.error("[/api/quote] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
