import crypto from "crypto";
import { NextResponse } from "next/server";
import { formatSheetTimestamp, syncSheetRow } from "@/lib/googleSheets";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const RESEND_BASE_URL = "https://api.resend.com";
const REPORT_READY_SUBJECT = "Your SiteER report is ready";

type ResendListResponse = {
    has_more?: boolean;
    data?: ResendListEmail[];
};

type ResendListEmail = {
    id: string;
    to?: string[] | null;
    created_at: string;
    subject?: string | null;
};

type ResendEmail = ResendListEmail & {
    html?: string | null;
    text?: string | null;
};

type BackfillCounts = {
    found: number;
    synced: number;
    skipped: number;
};

function safeCompareSecret(left: string, right: string): boolean {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    if (leftBuffer.length !== rightBuffer.length) {
        return false;
    }
    return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function isAuthorizedAdminRequest(request: Request): boolean {
    const configuredSecret = process.env.SUPABASE_REQUEST_SECRET?.trim();
    if (!configuredSecret) {
        return false;
    }

    const headerSecret = request.headers.get("x-siteer-admin-secret")?.trim();
    if (headerSecret && safeCompareSecret(headerSecret, configuredSecret)) {
        return true;
    }

    const bearerToken = request.headers
        .get("authorization")
        ?.replace(/^Bearer\s+/i, "")
        .trim();

    return Boolean(bearerToken && safeCompareSecret(bearerToken, configuredSecret));
}

async function fetchResendJson<T>(path: string): Promise<T> {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    const response = await fetch(`${RESEND_BASE_URL}${path}`, {
        headers: {
            Authorization: `Bearer ${resendKey}`,
        },
        cache: "no-store",
    });

    const payload = await response.json().catch(() => null) as
        | { message?: string; error?: string }
        | T
        | null;

    if (!response.ok) {
        const detail = payload && typeof payload === "object"
            ? ("message" in payload && payload.message)
                || ("error" in payload && payload.error)
            : null;
        throw new Error(detail || `Resend request failed with status ${response.status}`);
    }

    if (!payload) {
        throw new Error("Resend returned an empty response");
    }

    return payload as T;
}

async function listReportReadyEmails(): Promise<ResendListEmail[]> {
    const matches: ResendListEmail[] = [];
    let after: string | null = null;

    for (let page = 0; page < 10; page += 1) {
        const params = new URLSearchParams({ limit: "100" });
        if (after) {
            params.set("after", after);
        }

        const payload = await fetchResendJson<ResendListResponse>(`/emails?${params.toString()}`);
        const rows = payload.data ?? [];

        for (const row of rows) {
            if (row.subject === REPORT_READY_SUBJECT) {
                matches.push(row);
            }
        }

        if (!payload.has_more || rows.length === 0) {
            break;
        }

        after = rows[rows.length - 1]?.id ?? null;
        if (!after) {
            break;
        }
    }

    return matches;
}

function extractReportUrl(email: ResendEmail): string | null {
    const blob = [email.html, email.text].filter((value): value is string => Boolean(value)).join("\n");
    if (!blob) {
        return null;
    }

    const matches = blob.match(/https?:\/\/[^"'\s<]+/g) ?? [];

    for (const candidate of matches) {
        try {
            const url = new URL(candidate.replace(/&amp;/g, "&"));
            if (url.pathname.startsWith("/scan/")) {
                return url.toString();
            }
        } catch {
            continue;
        }
    }

    return null;
}

function extractReportToken(reportUrl: string): string | null {
    try {
        const url = new URL(reportUrl);
        const token = url.pathname.split("/").filter(Boolean).at(-1)?.trim();
        return token || null;
    } catch {
        return null;
    }
}

async function getCutoffIso(): Promise<string> {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: baselineRow, error: baselineError } = await supabaseAdmin
        .from("sheet_sync_events")
        .select("created_at")
        .is("source_key", null)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (baselineError) {
        throw new Error(baselineError.message || "Failed to load sheet cutoff");
    }

    if (baselineRow?.created_at) {
        return baselineRow.created_at;
    }

    const { data: anyRow, error: anyError } = await supabaseAdmin
        .from("sheet_sync_events")
        .select("created_at")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (anyError) {
        throw new Error(anyError.message || "Failed to load fallback sheet cutoff");
    }

    return anyRow?.created_at ?? new Date().toISOString();
}

async function backfillResendLeads(cutoffIso: string, dryRun: boolean): Promise<BackfillCounts> {
    const reportEmails = await listReportReadyEmails();
    const cutoffTime = new Date(cutoffIso).getTime();
    let synced = 0;
    let skipped = 0;
    let found = 0;

    for (const emailRef of reportEmails) {
        const createdTime = new Date(emailRef.created_at).getTime();
        if (!emailRef.created_at || Number.isNaN(createdTime) || createdTime >= cutoffTime) {
            continue;
        }

        found += 1;

        const recipient = emailRef.to?.[0]?.trim().toLowerCase();
        if (!recipient) {
            skipped += 1;
            continue;
        }

        const fullEmail = await fetchResendJson<ResendEmail>(`/emails/${emailRef.id}`);
        const reportUrl = extractReportUrl(fullEmail);
        const reportToken = reportUrl ? extractReportToken(reportUrl) : null;

        if (!reportUrl || !reportToken) {
            skipped += 1;
            continue;
        }

        if (!dryRun) {
            await syncSheetRow({
                sheet: "Leads",
                row: [
                    formatSheetTimestamp(emailRef.created_at),
                    recipient,
                    `report:${reportToken}`,
                    reportUrl,
                ],
                sourceKey: `resend-lead:${emailRef.id}`,
                createdAt: emailRef.created_at,
            });
        }

        synced += 1;
    }

    return { found, synced, skipped };
}

async function backfillQuotes(cutoffIso: string, dryRun: boolean): Promise<BackfillCounts> {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: quotes, error } = await supabaseAdmin
        .from("quotes")
        .select("id,first_name,last_name,email,phone,business_name,website_url,created_at")
        .lt("created_at", cutoffIso)
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error(error.message || "Failed to load historical quotes");
    }

    for (const quote of quotes ?? []) {
        if (!dryRun) {
            await syncSheetRow({
                sheet: "Quotes",
                row: [
                    formatSheetTimestamp(quote.created_at),
                    quote.first_name,
                    quote.last_name,
                    quote.email,
                    quote.phone ?? "",
                    quote.business_name,
                    quote.website_url ?? "",
                ],
                sourceKey: `quote:${quote.id}`,
                createdAt: quote.created_at,
            });
        }
    }

    return {
        found: quotes?.length ?? 0,
        synced: quotes?.length ?? 0,
        skipped: 0,
    };
}

async function backfillPayments(cutoffIso: string, dryRun: boolean): Promise<BackfillCounts> {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: payments, error } = await supabaseAdmin
        .from("payments")
        .select("id,email,report_token,amount_cents,status,created_at")
        .lt("created_at", cutoffIso)
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error(error.message || "Failed to load historical payments");
    }

    for (const payment of payments ?? []) {
        if (!dryRun) {
            await syncSheetRow({
                sheet: "Payments",
                row: [
                    formatSheetTimestamp(payment.created_at),
                    payment.email ?? "",
                    payment.report_token ?? "",
                    (payment.amount_cents / 100).toFixed(2),
                    payment.status,
                ],
                sourceKey: `payment:${payment.id}`,
                createdAt: payment.created_at,
            });
        }
    }

    return {
        found: payments?.length ?? 0,
        synced: payments?.length ?? 0,
        skipped: 0,
    };
}

export async function POST(request: Request) {
    if (!isAuthorizedAdminRequest(request)) {
        return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const dryRun = ["1", "true", "yes"].includes(
            searchParams.get("dryRun")?.toLowerCase() ?? "",
        );
        const cutoffIso = await getCutoffIso();

        const [leads, quotes, payments] = await Promise.all([
            backfillResendLeads(cutoffIso, dryRun),
            backfillQuotes(cutoffIso, dryRun),
            backfillPayments(cutoffIso, dryRun),
        ]);

        return NextResponse.json({
            ok: true,
            dryRun,
            cutoffIso,
            results: {
                leads,
                quotes,
                payments,
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Sheet backfill failed";
        console.error("[/api/admin/backfill-sheets] Error:", message);
        return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
}
