import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// This route is called by Vercel Cron (configured in vercel.json) once per day.
// It sends scheduled follow-up emails for leads who haven't converted yet.
export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://siteer.dev";
    const resendKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL ?? "SiteER <reports@yourdomain.com>";

    if (!resendKey) {
        return NextResponse.json({ ok: false, error: "RESEND_API_KEY not set" }, { status: 500 });
    }

    // Fetch all due, unsent follow-up emails
    const { data: due, error } = await supabaseAdmin
        .from("follow_up_emails")
        .select("id, email, report_token, type")
        .lte("send_at", new Date().toISOString())
        .is("sent_at", null)
        .limit(100);

    if (error) {
        console.error("[cron/follow-up] Query failed:", error.message);
        return NextResponse.json({ ok: false, error: "Query failed" }, { status: 500 });
    }

    if (!due || due.length === 0) {
        return NextResponse.json({ ok: true, sent: 0 });
    }

    let sent = 0;
    const failed: string[] = [];

    for (const row of due) {
        const reportUrl = `${appUrl}/scan/${row.report_token}`;

        const subject =
            row.type === "day_3"
                ? "3 quick website fixes that take under an hour — SiteER"
                : "Is your website still costing you customers? — SiteER";

        const html =
            row.type === "day_3"
                ? buildDay3Email(reportUrl)
                : buildDay7Email(reportUrl);

        try {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({ from: senderEmail, to: row.email, subject, html }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                console.error("[cron/follow-up] Resend error:", body);
                failed.push(row.id as string);
                continue;
            }

            await supabaseAdmin
                .from("follow_up_emails")
                .update({ sent_at: new Date().toISOString() })
                .eq("id", row.id);

            sent++;
        } catch (err) {
            console.error("[cron/follow-up] Send failed for", row.email, err);
            failed.push(row.id as string);
        }
    }

    return NextResponse.json({ ok: true, sent, failed: failed.length });
}

function buildDay3Email(reportUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#fff;color:#111">
  <div style="background:linear-gradient(135deg,#ff4d5e,#ffb15c);border-radius:16px;padding:28px;margin-bottom:28px">
    <h1 style="color:#1a0509;margin:0;font-size:1.3rem;font-weight:800">3 Quick Fixes You Can Do Today</h1>
    <p style="color:#3a0a12;margin:8px 0 0;font-size:0.9rem">From your SiteER report — high impact, low effort</p>
  </div>

  <p style="color:#333;line-height:1.7;font-size:0.95rem">A few days ago you ran a SiteER scan. Here are three fixes that typically take under an hour and have the highest impact on leads:</p>

  <div style="margin:20px 0">
    <div style="background:#f8fafc;border-left:4px solid #ff4d5e;border-radius:0 12px 12px 0;padding:16px;margin-bottom:12px">
      <strong style="font-size:0.95rem">1. Add your phone number to the header</strong>
      <p style="margin:4px 0 0;color:#555;font-size:0.88rem">Sites with a visible phone number convert 25% better on mobile. Takes 5 minutes.</p>
    </div>
    <div style="background:#f8fafc;border-left:4px solid #ffb15c;border-radius:0 12px 12px 0;padding:16px;margin-bottom:12px">
      <strong style="font-size:0.95rem">2. Make your CTA button bigger</strong>
      <p style="margin:4px 0 0;color:#555;font-size:0.88rem">The action button should be visible without scrolling on a phone. Minimum 48px height.</p>
    </div>
    <div style="background:#f8fafc;border-left:4px solid #16a34a;border-radius:0 12px 12px 0;padding:16px;margin-bottom:12px">
      <strong style="font-size:0.95rem">3. Add one customer review above the fold</strong>
      <p style="margin:4px 0 0;color:#555;font-size:0.88rem">A single 5-star quote near the hero can lift trust signals by 30%. Even a screenshot works.</p>
    </div>
  </div>

  <div style="margin:28px 0;text-align:center">
    <a href="${reportUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff4d5e,#ffb15c);color:#1a0509;padding:14px 28px;border-radius:999px;font-weight:800;text-decoration:none;font-size:0.95rem">
      See My Full Report →
    </a>
  </div>

  <p style="color:#555;font-size:0.9rem">Need someone to implement these for you? Our team at <a href="https://coaibakersfield.com" style="color:#dc2626">COAIBAKERSFIELD.COM</a> handles it end-to-end starting at $497, with a before/after re-scan to prove results.</p>

  <p style="color:#999;font-size:0.75rem;margin-top:24px;border-top:1px solid #f0f0f0;padding-top:16px">SiteER — The Emergency Room for Sick Websites<br><a href="https://siteer.dev/privacy" style="color:#999">Unsubscribe</a></p>
</body>
</html>`;
}

function buildDay7Email(reportUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:32px 20px;background:#fff;color:#111">
  <div style="background:#111;border-radius:16px;padding:28px;margin-bottom:28px">
    <h1 style="color:#ff4d5e;margin:0;font-size:1.3rem;font-weight:800">Still losing customers to your website?</h1>
    <p style="color:#999;margin:8px 0 0;font-size:0.9rem">A week ago your SiteER report found issues costing you revenue every month.</p>
  </div>

  <p style="color:#333;line-height:1.7;font-size:0.95rem">
    Every week those issues go unfixed, visitors keep leaving without calling, booking, or buying. The money doesn't disappear — it goes to the competitor with a faster, cleaner site.
  </p>

  <div style="background:#fff8f8;border:1px solid #ffc7cc;border-radius:12px;padding:20px;margin:24px 0">
    <h3 style="margin:0 0 8px;font-size:1rem;font-weight:700;color:#dc2626">The ER Fix Pack — Starting at $497</h3>
    <ul style="margin:0;padding-left:20px;color:#444;font-size:0.9rem;line-height:1.8">
      <li>Speed + mobile fixes implemented</li>
      <li>CTA and trust signal improvements</li>
      <li>SEO fundamentals cleanup</li>
      <li>Before/after re-scan to prove results</li>
      <li>20+ point grade improvement guarantee</li>
    </ul>
    <p style="margin:16px 0 0;font-size:0.85rem;color:#666"><strong>Money-back guarantee:</strong> If your grade doesn't improve by 20+ points, you pay nothing.</p>
  </div>

  <div style="margin:28px 0;text-align:center">
    <a href="https://siteer.dev/get-quote" style="display:inline-block;background:#dc2626;color:white;padding:14px 28px;border-radius:999px;font-weight:800;text-decoration:none;font-size:0.95rem;margin-right:12px">
      Get a Quote →
    </a>
  </div>

  <p style="text-align:center;margin-top:12px">
    <a href="${reportUrl}" style="color:#dc2626;font-size:0.88rem">Or re-read my report first</a>
  </p>

  <p style="color:#999;font-size:0.75rem;margin-top:24px;border-top:1px solid #f0f0f0;padding-top:16px">SiteER — The Emergency Room for Sick Websites<br><a href="https://siteer.dev/privacy" style="color:#999">Unsubscribe</a></p>
</body>
</html>`;
}
