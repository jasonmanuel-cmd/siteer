import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

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

        // Notify admin via Resend
        const resendKey = process.env.RESEND_API_KEY;
        const contactEmail = process.env.CONTACT_EMAIL;
        const senderEmail = process.env.SENDER_EMAIL ?? "SiteER <reports@yourdomain.com>";

        if (resendKey && contactEmail) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: senderEmail,
                    to: contactEmail,
                    subject: `New Fix Quote Request — ${body.businessName}`,
                    html: `
                        <h2>New Quote Request</h2>
                        <table style="border-collapse:collapse;width:100%">
                            <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${body.firstName} ${body.lastName}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${body.email}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${body.phone || "—"}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold">Business</td><td style="padding:8px">${body.businessName}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold">Website</td><td style="padding:8px">${body.websiteUrl || "—"}</td></tr>
                        </table>
                        <p style="margin-top:16px;color:#666">Submitted via SiteER — <a href="https://coaibakersfield.com">COAIBAKERSFIELD.COM</a></p>
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
