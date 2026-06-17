import { quickAuditOffer } from "@/lib/offers";
import { sendResendEmail } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export type LeadFollowupStage = "report_ready" | "nudge_1" | "nudge_2" | "nudge_3";

const LEAD_FOLLOWUP_STAGES = ["report_ready", "nudge_1", "nudge_2", "nudge_3"] as const;

type FollowupDefinition = {
    stage: Exclude<LeadFollowupStage, "report_ready">;
    delayDays: number;
};

const FOLLOWUP_SEQUENCE: FollowupDefinition[] = [
    { stage: "nudge_1", delayDays: 1 },
    { stage: "nudge_2", delayDays: 3 },
    { stage: "nudge_3", delayDays: 7 },
];

export function isLeadFollowupStage(value: string): value is LeadFollowupStage {
    return LEAD_FOLLOWUP_STAGES.includes(value as LeadFollowupStage);
}

const FOLLOWUP_COPY: Record<
    LeadFollowupStage,
    { subject: string; eyebrow: string; heading: string; body: string; closing: string }
> = {
    report_ready: {
        subject: "Your SiteER report is ready",
        eyebrow: "SiteER Report Ready",
        heading: "Your website report is ready to review",
        body: "Open your private report to see the speed, SEO, trust, and conversion issues that may be costing you calls, forms, and booked jobs.",
        closing: `If you want a human action plan after that, the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} is waiting inside the report.`,
    },
    nudge_1: {
        subject: "Your SiteER report is still waiting",
        eyebrow: "Friendly Reminder",
        heading: "Your report is ready whenever you are",
        body: "Most local business sites leak leads through slow mobile pages, weak trust signals, and unclear next steps. Your report shows where that is happening on your site.",
        closing: `Open the report and, if you want us to turn it into a fix list, unlock the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} inside the report.`,
    },
    nudge_2: {
        subject: "See where your website is leaking leads",
        eyebrow: "Second Follow-up",
        heading: "Your report can show what is holding the site back",
        body: "If you have not looked yet, your report is still live. It gives you the exact areas where performance, SEO, and trust problems may be dragging down conversions.",
        closing: `When you are ready for the next step, the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} adds a short human review and action plan.`,
    },
    nudge_3: {
        subject: "Last reminder about your SiteER report",
        eyebrow: "Final Reminder",
        heading: "Last automated reminder for your report",
        body: "Your private report link is still active. This is the final automated follow-up from SiteER, so if you want the scan details or the human audit upgrade, now is the time to open it.",
        closing: "If you already handled this, you can ignore this message.",
    },
};

function addDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function buildLeadFollowupEmail(stage: LeadFollowupStage, reportUrl: string): {
    subject: string;
    html: string;
} {
    const copy = FOLLOWUP_COPY[stage];
    const safeReportUrl = escapeHtml(reportUrl);

    return {
        subject: copy.subject,
        html: `
            <div style="margin:0;padding:24px 12px;background:#08111f;font-family:Arial,sans-serif;color:#d7e7f6">
                <div style="max-width:560px;margin:0 auto;background:#0f1b2f;border:1px solid rgba(110,231,255,0.14);border-radius:18px;overflow:hidden">
                    <div style="padding:28px 28px 18px;background:linear-gradient(135deg,#08111f 0%,#10213c 70%,#153460 100%)">
                        <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6ee7ff;font-weight:700;margin-bottom:10px">${copy.eyebrow}</div>
                        <h1 style="margin:0;color:#f8fbff;font-size:28px;line-height:1.15">${copy.heading}</h1>
                    </div>
                    <div style="padding:26px 28px 30px">
                        <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#d7e7f6">${copy.body}</p>
                        <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#a9bfd6">${copy.closing}</p>
                        <a href="${safeReportUrl}" style="display:inline-block;background:linear-gradient(135deg,#6ee7ff,#3ee28f);color:#07131f;text-decoration:none;font-weight:800;font-size:14px;padding:14px 22px;border-radius:999px">
                            Open My Report
                        </a>
                        <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#7f96b0">
                            If the button does not work, open this link:<br />
                            <a href="${safeReportUrl}" style="color:#6ee7ff;word-break:break-all">${safeReportUrl}</a>
                        </p>
                    </div>
                </div>
            </div>
        `,
    };
}

export async function sendLeadFollowupEmail(params: {
    email: string;
    reportUrl: string;
    stage: LeadFollowupStage;
}): Promise<string> {
    const { html, subject } = buildLeadFollowupEmail(params.stage, params.reportUrl);

    return sendResendEmail({
        to: [params.email],
        subject,
        html,
    });
}

export async function sendLeadReportEmail(params: {
    email: string;
    reportUrl: string;
}): Promise<string> {
    return sendLeadFollowupEmail({
        email: params.email,
        reportUrl: params.reportUrl,
        stage: "report_ready",
    });
}

export async function queueLeadFollowups(params: {
    email: string;
    reportToken: string;
    reportUrl: string;
}): Promise<void> {
    const supabaseAdmin = getSupabaseAdmin();
    const queuedAt = new Date();

    const { error } = await supabaseAdmin.from("lead_followups").upsert(
        FOLLOWUP_SEQUENCE.map(({ stage, delayDays }) => ({
            lead_email: params.email,
            report_token: params.reportToken,
            report_url: params.reportUrl,
            stage,
            send_at: addDays(queuedAt, delayDays).toISOString(),
            status: "queued",
        })),
        {
            onConflict: "lead_email,report_token,stage",
            ignoreDuplicates: true,
        },
    );

    if (error) {
        throw new Error(error.message || "Failed to queue lead follow-ups");
    }
}

export async function hasCompletedLeadPayment(reportToken: string): Promise<boolean> {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
        .from("payments")
        .select("id")
        .eq("report_token", reportToken)
        .eq("status", "completed")
        .limit(1)
        .maybeSingle();

    if (error) {
        throw new Error(error.message || "Failed to check payment status");
    }

    return Boolean(data?.id);
}

export async function markLeadFollowupsConverted(reportToken: string): Promise<void> {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
        .from("lead_followups")
        .update({
            status: "skipped_converted",
            last_error: null,
        })
        .eq("report_token", reportToken)
        .in("status", ["queued", "processing"]);

    if (error) {
        throw new Error(error.message || "Failed to stop queued lead follow-ups");
    }
}
