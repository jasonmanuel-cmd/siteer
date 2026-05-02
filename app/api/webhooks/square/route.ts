import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// Square sends a HMAC-SHA256 signature in the header to prove the webhook is genuine.
// We verify it before processing anything.
function verifySquareSignature(
    body: string,
    signature: string | null,
    secret: string,
    url: string,
): boolean {
    if (!signature) return false;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(url + body);
    const expected = hmac.digest("base64");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(request: Request) {
    const webhookSecret = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    if (!webhookSecret) {
        console.error("[square-webhook] SQUARE_WEBHOOK_SIGNATURE_KEY not set");
        return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const body = await request.text();
    const signature = request.headers.get("x-square-hmacsha256-signature");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
    const webhookUrl = `${appUrl}/api/webhooks/square`;

    if (!verifySquareSignature(body, signature, webhookSecret, webhookUrl)) {
        console.warn("[square-webhook] Invalid signature — ignoring request");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let event: Record<string, unknown>;
    try {
        event = JSON.parse(body) as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const eventType = event.type as string | undefined;

    // We care about completed payments only
    if (eventType !== "payment.completed" && eventType !== "payment.updated") {
        return NextResponse.json({ ok: true, skipped: true });
    }

    const paymentData = (event.data as Record<string, unknown>)?.object as Record<string, unknown> | undefined;
    const payment = paymentData?.payment as Record<string, unknown> | undefined;
    const linkId = payment?.payment_link_id as string | undefined;
    const status = (payment?.status as string | undefined)?.toLowerCase();

    if (!linkId || status !== "completed") {
        return NextResponse.json({ ok: true, skipped: true });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: paymentRow, error } = await supabaseAdmin
        .from("payments")
        .update({ status: "completed" })
        .eq("square_link_id", linkId)
        .eq("status", "pending")
        .select("report_token, email")
        .single();

    if (error) {
        // Row may not exist or already completed — not an error we need to surface
        console.warn("[square-webhook] Payment update skipped:", error.message);
        return NextResponse.json({ ok: true });
    }

    // Send a "payment confirmed" email if we have the buyer's email
    if (paymentRow?.email && paymentRow?.report_token) {
        const resendKey = process.env.RESEND_API_KEY;
        const senderEmail = process.env.SENDER_EMAIL ?? "SiteER <reports@yourdomain.com>";
        const reportUrl = `${appUrl}/scan/${paymentRow.report_token}?paid=true`;

        if (resendKey) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: senderEmail,
                    to: paymentRow.email,
                    subject: "Your Deep ER Report is ready — SiteER",
                    html: `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#ff4d5e,#ffb15c);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px">
    <h1 style="color:#1a0509;margin:0;font-size:1.5rem;font-weight:800">Payment Confirmed!</h1>
    <p style="color:#3a0a12;margin:8px 0 0;font-size:0.95rem">Your Deep ER Report is confirmed and being prepared.</p>
  </div>
  <h2 style="font-size:1.1rem">What happens next?</h2>
  <ol style="color:#444;line-height:1.8;font-size:0.95rem">
    <li>Our expert will review your scan results manually over the next 1–2 business days.</li>
    <li>You'll receive a detailed written report with specific recommendations.</li>
    <li>We'll follow up if we have questions about your business goals.</li>
  </ol>
  <div style="margin:28px 0;background:#fff8f8;border:1px solid #ffc7cc;border-radius:12px;padding:20px">
    <p style="margin:0 0 12px;font-size:0.95rem">Your automated scan report is available now:</p>
    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1a0509;padding:12px 24px;border-radius:999px;font-weight:800;text-decoration:none;font-size:0.9rem">View My Report →</a>
  </div>
  <p style="color:#666;font-size:0.85rem;margin-top:24px">Questions? Reply to this email or visit <a href="https://coaibakersfield.com" style="color:#dc2626">coaibakersfield.com</a>.</p>
  <p style="color:#999;font-size:0.75rem;margin-top:16px;border-top:1px solid #f0f0f0;padding-top:16px">SiteER — The Emergency Room for Sick Websites<br>Powered by COAIBAKERSFIELD.COM, Bakersfield CA</p>
</body>
</html>`,
                }),
            }).catch((err) => console.error("[square-webhook] Email send failed:", err));
        }
    }

    console.log("[square-webhook] Payment completed for token:", paymentRow?.report_token);
    return NextResponse.json({ ok: true });
}
