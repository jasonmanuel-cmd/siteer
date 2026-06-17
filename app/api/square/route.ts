import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { quickAuditOffer } from "@/lib/offers";
import { resolveAppUrl } from "@/lib/appUrl";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logPayment } from "@/lib/googleSheets";
import {
    createPaymentConfirmToken,
    isStatelessReportToken,
    isValidStatelessReportToken,
} from "@/lib/reportToken";

export const runtime = "nodejs";

const SquareSchema = z.object({
    reportToken: z.string().min(1),
    email: z.string().email().optional(),
});

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = await consumeRateLimit(`square:${ip}`, 10, 60_000);
    if (!limiter.ok) {
        return NextResponse.json({ ok: false, error: "Too many requests." }, { status: 429 });
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    const squareEnvironment = process.env.SQUARE_ENVIRONMENT ?? "sandbox";
    const appUrl = resolveAppUrl(request);
    const isLiveSite = /^https:\/\/(www\.)?siteer\.dev$/i.test(appUrl);

    if (!accessToken || !locationId) {
        return NextResponse.json(
            { ok: false, error: "Square is not configured. Contact COAIBAKERSFIELD.COM to purchase." },
            { status: 503 },
        );
    }

    if (isLiveSite && squareEnvironment !== "production") {
        return NextResponse.json(
            {
                ok: false,
                error: "Online checkout is temporarily unavailable. Use the quote form or contact COAIBAKERSFIELD.COM and we will send an invoice.",
            },
            { status: 503 },
        );
    }

    try {
        const body = SquareSchema.parse(await request.json());
        if (isStatelessReportToken(body.reportToken)) {
            if (!isValidStatelessReportToken(body.reportToken)) {
                throw new Error("Invalid report token");
            }
        } else {
            const supabaseAdmin = getSupabaseAdmin();
            const { data: report } = await supabaseAdmin
                .from("reports")
                .select("public_token")
                .eq("public_token", body.reportToken)
                .single();

            if (!report?.public_token) {
                throw new Error("Report not found");
            }
        }

        const normalizedEmail = body.email?.trim().toLowerCase();
        const confirmToken = normalizedEmail
            ? createPaymentConfirmToken(body.reportToken, normalizedEmail)
            : null;
        const redirectUrl = `${appUrl}/payment-return`;

        const squareHost = squareEnvironment === "production"
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
                description: `${quickAuditOffer.name} — ${quickAuditOffer.description} by COAIBAKERSFIELD.COM`,
                quick_pay: {
                    name: quickAuditOffer.name,
                    price_money: { amount: quickAuditOffer.priceCents, currency: "USD" },
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
                report_token: body.reportToken,
                email: body.email ?? null,
                // Square payment webhooks reference the order_id created by the payment link.
                square_link_id: squareOrderId,
                amount_cents: quickAuditOffer.priceCents,
                status: "pending",
            });
        } catch (persistenceError) {
            console.warn(
                "[/api/square] Payment persistence fallback:",
                persistenceError instanceof Error
                    ? persistenceError.message
                    : "Unknown persistence error",
            );
        }

        if (body.email) {
            await logPayment({
                email: normalizedEmail ?? body.email.trim().toLowerCase(),
                reportToken: body.reportToken,
                amountCents: quickAuditOffer.priceCents,
                status: "checkout_started",
            });
        }

        return NextResponse.json({
            ok: true,
            checkoutUrl: paymentLink.url,
            buyerEmail: normalizedEmail ?? "",
            confirmToken: confirmToken ?? "",
        });
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
