import crypto from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeRateLimit, getClientIp } from "@/lib/rateLimit";
import { generateCsrfToken } from "@/lib/csrf";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logLead } from "@/lib/googleSheets";
import { queueLeadFollowups, sendLeadReportEmail } from "@/lib/leadFollowups";
import { resolveAppUrl } from "@/lib/appUrl";
import {
    createReportToken,
    isScanUnlockToken,
    isStatelessReportToken,
    isValidStatelessReportToken,
    readScanUnlockToken,
} from "@/lib/reportToken";

export const runtime = "nodejs";

const LeadSchema = z.object({
    email: z.string().email(),
    scanId: z.string().min(1),
});

async function finalizeLeadCapture(params: {
    email: string;
    scanId: string;
    reportToken: string;
    reportUrl: string;
}) {
    await logLead({
        email: params.email,
        scanId: params.scanId,
        reportUrl: params.reportUrl,
    });

    if (!process.env.RESEND_API_KEY) {
        console.warn("[/api/lead] RESEND_API_KEY is not set. Skipping customer email delivery.");
        return;
    }

    try {
        await sendLeadReportEmail({
            email: params.email,
            reportUrl: params.reportUrl,
        });
    } catch (error) {
        console.warn(
            "[/api/lead] Report email failed:",
            error instanceof Error ? error.message : "Unknown email error",
        );
    }

    try {
        await queueLeadFollowups({
            email: params.email,
            reportToken: params.reportToken,
            reportUrl: params.reportUrl,
        });
    } catch (error) {
        console.warn(
            "[/api/lead] Follow-up queue failed:",
            error instanceof Error ? error.message : "Unknown follow-up error",
        );
    }
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
        const body = LeadSchema.parse(await request.json());
        const email = body.email.trim().toLowerCase();
        const appUrl = resolveAppUrl(request);
        const csrfToken = generateCsrfToken();

        if (isScanUnlockToken(body.scanId)) {
            const payload = readScanUnlockToken(body.scanId);
            if (!payload) {
                throw new Error("Invalid scan token");
            }
            const reportToken = createReportToken(payload);
            const reportUrl = `${appUrl}/scan/${reportToken}`;
            await finalizeLeadCapture({
                email,
                scanId: body.scanId,
                reportToken,
                reportUrl,
            });
            return NextResponse.json({
                ok: true,
                reportUrl,
                csrfToken,
            });
        }

        if (isStatelessReportToken(body.scanId)) {
            if (!isValidStatelessReportToken(body.scanId)) {
                throw new Error("Invalid report token");
            }
            const reportUrl = `${appUrl}/scan/${body.scanId}`;
            await finalizeLeadCapture({
                email,
                scanId: body.scanId,
                reportToken: body.scanId,
                reportUrl,
            });
            return NextResponse.json({
                ok: true,
                reportUrl,
                csrfToken,
            });
        }

        const parsedScanId = z.string().uuid().safeParse(body.scanId);
        if (!parsedScanId.success) {
            throw new Error("Invalid scan ID");
        }

        const supabaseAdmin = getSupabaseAdmin();

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

        const token = crypto.randomBytes(16).toString("hex");

        const { data: report, error: reportError } = await supabaseAdmin
            .from("reports")
            .insert({
                scan_id: parsedScanId.data,
                lead_id: lead.id,
                public_token: token,
            })
            .select("public_token")
            .single();

        if (reportError || !report) {
            throw new Error(reportError?.message || "Failed to create report link");
        }

        const reportUrl = `${appUrl}/scan/${report.public_token}`;

        await finalizeLeadCapture({
            email,
            scanId: body.scanId,
            reportToken: report.public_token,
            reportUrl,
        });

        return NextResponse.json({
            ok: true,
            reportUrl,
            csrfToken: csrfToken,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Lead capture failed";
        
        // Sanitize error message to not expose internal implementation
        const sanitizedError = message.includes("Supabase") ||
                               message.includes("connection") ||
                               message.includes("timeout")
            ? "Failed to capture your email. Please try again."
            : message;
        
        console.error("[/api/lead] Error:", message);
        return NextResponse.json({ ok: false, error: sanitizedError }, { status: 400 });
    }
}
