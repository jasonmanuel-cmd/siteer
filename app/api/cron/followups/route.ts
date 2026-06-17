import { NextResponse } from "next/server";
import {
    hasCompletedLeadPayment,
    isLeadFollowupStage,
    markLeadFollowupsConverted,
    sendLeadFollowupEmail,
} from "@/lib/leadFollowups";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const BATCH_SIZE = 25;
const RETRY_DELAY_MS = 6 * 60 * 60 * 1000;

function isAuthorizedCronRequest(request: Request): boolean {
    const configuredSecret = process.env.CRON_SECRET?.trim();
    if (configuredSecret) {
        return request.headers.get("authorization") === `Bearer ${configuredSecret}`;
    }

    if (process.env.NODE_ENV !== "production") {
        return true;
    }

    return request.headers.get("user-agent") === "vercel-cron/1.0";
}

export async function GET(request: Request) {
    if (!isAuthorizedCronRequest(request)) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabaseAdmin = getSupabaseAdmin();
        const nowIso = new Date().toISOString();

        const { data: dueRows, error: fetchError } = await supabaseAdmin
            .from("lead_followups")
            .select("id,lead_email,report_token,report_url,stage,attempt_count,send_at")
            .eq("status", "queued")
            .lte("send_at", nowIso)
            .order("send_at", { ascending: true })
            .limit(BATCH_SIZE);

        if (fetchError) {
            throw new Error(fetchError.message || "Failed to load due follow-ups");
        }

        let processed = 0;
        let sent = 0;
        let skipped = 0;
        let failed = 0;

        for (const row of dueRows ?? []) {
            const { data: claimed, error: claimError } = await supabaseAdmin
                .from("lead_followups")
                .update({
                    status: "processing",
                    last_error: null,
                })
                .eq("id", row.id)
                .eq("status", "queued")
                .select("id,lead_email,report_token,report_url,stage,attempt_count")
                .maybeSingle();

            if (claimError) {
                failed += 1;
                console.error("[/api/cron/followups] Claim failed:", claimError.message);
                continue;
            }

            if (!claimed) {
                continue;
            }

            processed += 1;

            try {
                if (!isLeadFollowupStage(claimed.stage)) {
                    throw new Error(`Unsupported follow-up stage: ${claimed.stage}`);
                }

                const alreadyConverted = await hasCompletedLeadPayment(claimed.report_token);
                if (alreadyConverted) {
                    await markLeadFollowupsConverted(claimed.report_token);
                    skipped += 1;
                    continue;
                }

                await sendLeadFollowupEmail({
                    email: claimed.lead_email,
                    reportUrl: claimed.report_url,
                    stage: claimed.stage,
                });

                const { error: sentError } = await supabaseAdmin
                    .from("lead_followups")
                    .update({
                        status: "sent",
                        sent_at: new Date().toISOString(),
                        attempt_count: claimed.attempt_count + 1,
                        last_error: null,
                    })
                    .eq("id", claimed.id);

                if (sentError) {
                    throw new Error(sentError.message || "Failed to finalize follow-up delivery");
                }

                sent += 1;
            } catch (error) {
                failed += 1;
                const message = error instanceof Error ? error.message : "Unknown follow-up error";

                const { error: retryError } = await supabaseAdmin
                    .from("lead_followups")
                    .update({
                        status: "queued",
                        send_at: new Date(Date.now() + RETRY_DELAY_MS).toISOString(),
                        attempt_count: claimed.attempt_count + 1,
                        last_error: message.slice(0, 500),
                    })
                    .eq("id", claimed.id);

                if (retryError) {
                    console.error("[/api/cron/followups] Retry scheduling failed:", retryError.message);
                }

                console.error("[/api/cron/followups] Delivery failed:", message);
            }
        }

        return NextResponse.json({
            ok: true,
            due: dueRows?.length ?? 0,
            processed,
            sent,
            skipped,
            failed,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Follow-up cron failed";
        console.error("[/api/cron/followups] Error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
