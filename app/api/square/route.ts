import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const SquareSchema = z.object({
    reportToken: z.string().min(1),
    email: z.string().email().optional(),
});

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = consumeRateLimit(`square:${ip}`, 10, 60_000);
    if (!limiter.ok) {
        return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!accessToken || !locationId) {
        return NextResponse.json(
            { ok: false, error: "Square is not configured. Contact COAIBAKERSFIELD.COM to purchase." },
            { status: 503 },
        );
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body = SquareSchema.parse(await request.json());

        // Look up the scan_id for this report token
        const { data: report } = await supabaseAdmin
            .from("reports")
            .select("scan_id")
            .eq("public_token", body.reportToken)
            .single();

        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
        const redirectUrl = `${appUrl}/scan/${body.reportToken}?paid=true`;

        const squareHost = process.env.SQUARE_ENVIRONMENT === "production"
            ? "connect.squareup.com"
            : "connect.squareupsandbox.com";

        const squareRes = await fetch(`https://${squareHost}/v2/online-checkout/payment-links`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
                "Square-Version": "2024-01-18",
            },
            body: JSON.stringify({
                idempotency_key: crypto.randomBytes(16).toString("hex"),
                description: "Deep ER Report — Human review of your SiteER scan by COAIBAKERSFIELD.COM",
                quick_pay: {
                    name: "Deep ER Report",
                    price_money: { amount: 4900, currency: "USD" },
                    location_id: locationId,
                },
                checkout_options: {
                    redirect_url: redirectUrl,
                    ask_for_shipping_address: false,
                },
                ...(body.email ? { pre_populated_data: { buyer_email: body.email } } : {}),
            }),
        });

        const squareData = await squareRes.json();

        if (!squareRes.ok || !squareData.payment_link?.url) {
            throw new Error(squareData.errors?.[0]?.detail ?? "Square checkout creation failed");
        }

        // Store the pending payment record
        await supabaseAdmin.from("payments").insert({
            scan_id: report?.scan_id ?? null,
            report_token: body.reportToken,
            email: body.email ?? null,
            square_link_id: squareData.payment_link.id,
            amount_cents: 4900,
            status: "pending",
        });

        return NextResponse.json({ ok: true, checkoutUrl: squareData.payment_link.url });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Payment setup failed";
        
        // Sanitize error message to not expose internal implementation
        const sanitizedError = message.includes("Square") ||
                               message.includes("Supabase") ||
                               message.includes("connection") ||
                               message.includes("timeout")
            ? "Failed to set up payment. Please try again."
            : message;
        
        console.error("[/api/square] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
