import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const LeadSchema = z.object({
    email: z.string().email(),
    scanId: z.string().uuid().or(z.string().min(1)),
});

async function sendReportEmail(
    email: string,
    reportUrl: string,
    grade: string | null,
): Promise<void> {
    const resendKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL ?? "SiteER <reports@yourdomain.com>";

    if (!resendKey) return;

    const gradeLabel = grade ?? "your grade";
    const gradeColor =
        grade === "A" ? "#16a34a"
        : grade === "B" ? "#0891b2"
        : grade === "C" ? "#d97706"
        : "#dc2626";

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
            from: senderEmail,
            to: email,
            subject: `Your SiteER Report is Ready — Grade ${gradeLabel}`,
            html: `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#ff4d5e,#ffb15c);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px">
    <h1 style="color:#1a0509;margin:0;font-size:1.4rem;font-weight:800">Your Website Report is Ready</h1>
    <p style="color:#3a0a12;margin:8px 0 0;font-size:0.95rem">The SiteER Emergency Room has completed your diagnosis.</p>
  </div>

  <div style="text-align:center;margin-bottom:24px">
    <div style="display:inline-block;background:${gradeColor};color:white;font-size:3rem;font-weight:900;width:100px;height:100px;line-height:100px;border-radius:20px;text-align:center">${gradeLabel}</div>
    <p style="margin:12px 0 0;color:#555;font-size:0.9rem">Your overall website health grade</p>
  </div>

  <p style="color:#333;line-height:1.7;font-size:0.95rem">
    Your full report includes every issue found, their severity, specific recommendations, and an estimate of how much revenue your site may be losing each month.
  </p>

  <div style="margin:28px 0;text-align:center">
    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1a0509;padding:16px 32px;border-radius:999px;font-weight:800;text-decoration:none;font-size:1rem">
      Open My Full Report →
    </a>
  </div>

  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px">
    <h3 style="margin:0 0 12px;font-size:0.95rem;font-weight:700">Save this link — it's yours forever:</h3>
    <code style="display:block;background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;font-size:0.85rem;word-break:break-all;color:#dc2626">${reportUrl}</code>
  </div>

  <div style="background:#fff8f8;border:1px solid #ffc7cc;border-radius:12px;padding:20px;margin-bottom:24px">
    <h3 style="margin:0 0 8px;font-size:0.95rem;font-weight:700">Want the issues fixed for you?</h3>
    <p style="margin:0 0 12px;color:#555;font-size:0.9rem">The team at COAIBAKERSFIELD.COM implements your highest-impact fixes and re-scans to prove results. Starting at $497.</p>
    <a href="https://siteer.dev/get-quote" style="display:inline-block;background:#dc2626;color:white;padding:10px 20px;border-radius:999px;font-weight:700;text-decoration:none;font-size:0.88rem">Get a Fix Quote →</a>
  </div>

  <p style="color:#999;font-size:0.75rem;margin-top:24px;border-top:1px solid #f0f0f0;padding-top:16px">
    SiteER — The Emergency Room for Sick Websites<br>
    Powered by <a href="https://coaibakersfield.com" style="color:#dc2626">COAIBAKERSFIELD.COM</a>, Bakersfield CA<br>
    <a href="https://siteer.dev/privacy" style="color:#999">Privacy Policy</a>
  </p>
</body>
</html>`,
        }),
    });
}

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const limiter = consumeRateLimit(`lead:${ip}`, 5, 60_000);
    if (!limiter.ok) {
        return NextResponse.json(
            {
                ok: false,
                error: "Too many submissions. Please wait a moment and try again.",
            },
            { status: 429 },
        );
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body = LeadSchema.parse(await request.json());
        const email = body.email.trim().toLowerCase();

        let lead: { id: string; email: string } | null = null;
        const { data: inserted, error: insertError } = await supabaseAdmin
            .from("leads")
            .insert({ email })
            .select("id,email")
            .single();

        if (insertError) {
            if (insertError.code === "23505") {
                const { data: existing } = await supabaseAdmin
                    .from("leads")
                    .select("id,email")
                    .eq("email", email)
                    .single();
                lead = existing;
            } else {
                throw new Error(insertError.message || "Failed to capture lead");
            }
        } else {
            lead = inserted;
        }

        if (!lead) throw new Error("Failed to capture lead");

        const token = crypto.randomBytes(24).toString("hex");

        const { data: report, error: reportError } = await supabaseAdmin
            .from("reports")
            .insert({
                scan_id: body.scanId,
                lead_id: lead.id,
                public_token: token,
            })
            .select("public_token")
            .single();

        if (reportError || !report) {
            throw new Error(reportError?.message || "Failed to create report link");
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const reportUrl = `${appUrl}/scan/${report.public_token}`;

        // Fetch the scan grade so the email can show it
        const { data: scanRow } = await supabaseAdmin
            .from("scans")
            .select("overall_grade")
            .eq("id", body.scanId)
            .single<{ overall_grade: string }>();

        // Send the report link email immediately (non-blocking — fire and forget)
        sendReportEmail(email, reportUrl, scanRow?.overall_grade ?? null).catch((err) =>
            console.error("[/api/lead] Email send failed:", err),
        );

        // Schedule follow-up emails (Day 3 and Day 7) for re-engagement
        const day3 = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
        const day7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

        await supabaseAdmin.from("follow_up_emails").insert([
            {
                lead_id: lead.id,
                email,
                report_token: report.public_token,
                send_at: day3,
                type: "day_3",
            },
            {
                lead_id: lead.id,
                email,
                report_token: report.public_token,
                send_at: day7,
                type: "day_7",
            },
        ]).then(({ error }) => {
            if (error) console.warn("[/api/lead] Follow-up scheduling failed:", error.message);
        });

        return NextResponse.json({
            ok: true,
            reportUrl,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Lead capture failed";

        const sanitizedError =
            message.includes("Supabase") ||
            message.includes("connection") ||
            message.includes("timeout")
                ? "Failed to capture your email. Please try again."
                : message;

        console.error("[/api/lead] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
