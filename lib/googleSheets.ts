import type { Database, Json } from "@/lib/database.types";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Google Sheets integration via Apps Script webhook.
 * No service account keys, no OAuth, no Google Cloud credentials needed.
 *
 * ─── ONE-TIME SETUP (5 minutes) ─────────────────────────────
 *
 * STEP 1 — Open your Google Sheet:
 *   https://docs.google.com/spreadsheets/d/1h71PdqX-XdZC8QusvkfoUvqObWinCmj6oZLeMMZN564/edit
 *
 * STEP 2 — Open Apps Script:
 *   Extensions → Apps Script
 *
 * STEP 3 — Delete any existing code and paste in the entire script
 *   from the comment block at the bottom of this file.
 *
 * STEP 4 — Deploy:
 *   Click "Deploy" → "New Deployment"
 *   Type: Web App
 *   Execute as: Me
 *   Who has access: Anyone
 *   → Deploy → Copy the Web App URL
 *
 * STEP 5 — Add to your env vars (.env.local AND Vercel dashboard):
 *   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *   GOOGLE_SHEETS_WEBHOOK_SECRET=generate-a-long-random-secret
 *
 * That's it. No JSON files, no service accounts, no credentials in code.
 * ─────────────────────────────────────────────────────────────
 *
 * ═══ APPS SCRIPT CODE TO PASTE ══════════════════════════════
 *
 * const SHEET_HEADERS = {
 *   Leads:    ['Timestamp', 'Email', 'Scan ID', 'Report URL'],
 *   Quotes:   ['Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Business', 'Website URL'],
 *   Payments: ['Timestamp', 'Email', 'Report Token', 'Amount (USD)', 'Status'],
 * };
 * const WEBHOOK_SECRET = 'paste-the-same-secret-you-set-in-vercel';
 *
 * function doPost(e) {
 *   try {
 *     const data = JSON.parse(e.postData.contents);
 *     if (WEBHOOK_SECRET && data.secret !== WEBHOOK_SECRET) {
 *       throw new Error('Unauthorized');
 *     }
 *     const ss = SpreadsheetApp.getActiveSpreadsheet();
 *     const sheetName = data.sheet;
 *     let sheet = ss.getSheetByName(sheetName);
 *     if (!sheet) {
 *       sheet = ss.insertSheet(sheetName);
 *       const headers = SHEET_HEADERS[sheetName];
 *       if (headers) sheet.appendRow(headers);
 *     }
 *     sheet.appendRow(data.row);
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ ok: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (err) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * function doGet() {
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ ok: true, status: 'SiteER webhook active' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * ═════════════════════════════════════════════════════════════
 */

export type SheetName = "Leads" | "Quotes" | "Payments";

type SheetRow = (string | number)[];
type SheetEventStatus = "queued" | "processing" | "sent";

type QueueResult = {
    id: string;
    status: SheetEventStatus;
    attemptCount: number;
    alreadySent?: boolean;
};

type SheetSyncOptions = {
    sourceKey?: string;
    createdAt?: string;
};

type SheetSyncEventInsert = Database["public"]["Tables"]["sheet_sync_events"]["Insert"];

function getWebhookUrl(): string | null {
    const value = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim().replace(/^"+|"+$/g, "");
    return value ? value : null;
}

function getWebhookSecret(): string | null {
    const value = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim().replace(/^"+|"+$/g, "");
    return value ? value : null;
}

function parseWebhookPayload(body: string): { ok?: boolean; error?: string } | null {
    if (!body.trim()) return null;
    try {
        return JSON.parse(body) as { ok?: boolean; error?: string };
    } catch {
        return null;
    }
}

async function sendToSheet(
    sheet: SheetName,
    row: SheetRow,
): Promise<void> {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
        throw new Error(`GOOGLE_SHEETS_WEBHOOK_URL is not set for ${sheet}`);
    }
    const webhookSecret = getWebhookSecret();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    let responseText = "";
    let payload: { ok?: boolean; error?: string } | null = null;
    let response: Response;

    try {
        response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Cache-Control": "no-store",
            },
            body: JSON.stringify({
                sheet,
                row,
                ...(webhookSecret ? { secret: webhookSecret } : {}),
            }),
            redirect: "follow",
            signal: controller.signal,
        });
        responseText = await response.text();
        payload = parseWebhookPayload(responseText);
    } finally {
        clearTimeout(timeout);
    }

    if (!response.ok) {
        throw new Error(
            `Webhook returned HTTP ${response.status}${payload?.error ? `: ${payload.error}` : ""}`,
        );
    }

    if (!payload || payload.ok !== true) {
        const compactBody = responseText.replace(/\s+/g, " ").slice(0, 180);
        throw new Error(
            `Webhook did not confirm success for ${sheet}${compactBody ? `: ${compactBody}` : ""}`,
        );
    }
}

async function queueSheetEvent(
    sheet: SheetName,
    row: SheetRow,
    options: SheetSyncOptions = {},
): Promise<QueueResult | null> {
    try {
        const supabaseAdmin = getSupabaseAdmin();

        if (options.sourceKey) {
            const { data: existing, error: existingError } = await supabaseAdmin
                .from("sheet_sync_events")
                .select("id,status,attempt_count")
                .eq("source_key", options.sourceKey)
                .maybeSingle();

            if (existingError) {
                throw new Error(existingError.message || "Failed to look up existing sheet event");
            }

            if (existing) {
                return {
                    id: existing.id,
                    status: existing.status as SheetEventStatus,
                    attemptCount: existing.attempt_count,
                    alreadySent: existing.status === "sent",
                };
            }
        }

        const insertPayload: SheetSyncEventInsert = {
            sheet,
            row: row as Json,
            status: "queued",
        };

        if (options.sourceKey) {
            insertPayload.source_key = options.sourceKey;
        }

        if (options.createdAt) {
            insertPayload.created_at = options.createdAt;
        }

        const { data, error } = await supabaseAdmin
            .from("sheet_sync_events")
            .insert(insertPayload)
            .select("id,status,attempt_count")
            .single();

        if (error) {
            throw new Error(error.message || "Failed to queue sheet event");
        }

        return {
            id: data.id,
            status: data.status as SheetEventStatus,
            attemptCount: data.attempt_count,
            alreadySent: false,
        };
    } catch (error) {
        console.warn(
            "[googleSheets.queueSheetEvent]",
            error instanceof Error ? error.message : error,
        );
        return null;
    }
}

async function updateSheetEvent(
    id: string,
    updates: {
        status: SheetEventStatus;
        attemptCount?: number;
        lastError?: string | null;
        sentAt?: string | null;
    },
): Promise<void> {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const payload: Record<string, string | number | null> = {
            status: updates.status,
        };

        if (typeof updates.attemptCount === "number") payload.attempt_count = updates.attemptCount;
        if ("lastError" in updates) payload.last_error = updates.lastError ?? null;
        if ("sentAt" in updates) payload.sent_at = updates.sentAt ?? null;

        const { error } = await supabaseAdmin
            .from("sheet_sync_events")
            .update(payload)
            .eq("id", id);

        if (error) {
            throw new Error(error.message || "Failed to update sheet event");
        }
    } catch (error) {
        console.warn(
            "[googleSheets.updateSheetEvent]",
            error instanceof Error ? error.message : error,
        );
    }
}

async function deliverSheetRow(
    sheet: SheetName,
    row: SheetRow,
    options: SheetSyncOptions = {},
): Promise<void> {
    const queued = await queueSheetEvent(sheet, row, options);

    if (queued?.alreadySent) {
        return;
    }

    try {
        await sendToSheet(sheet, row);
        if (queued) {
            await updateSheetEvent(queued.id, {
                status: "sent",
                attemptCount: queued.attemptCount + 1,
                lastError: null,
                sentAt: new Date().toISOString(),
            });
        }
    } catch (error) {
        if (queued) {
            await updateSheetEvent(queued.id, {
                status: "queued",
                attemptCount: queued.attemptCount + 1,
                lastError: error instanceof Error ? error.message.slice(0, 500) : "Unknown sheet delivery error",
            });
        }
        throw error;
    }
}

export function formatSheetTimestamp(input: string | Date = new Date()): string {
    const candidate = input instanceof Date ? input : new Date(input);
    const safeDate = Number.isNaN(candidate.getTime()) ? new Date() : candidate;

    return safeDate.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

// ── Public API ───────────────────────────────────────────────

export async function syncSheetRow(params: {
    sheet: SheetName;
    row: SheetRow;
    sourceKey?: string;
    createdAt?: string;
}): Promise<void> {
    await deliverSheetRow(params.sheet, params.row, {
        sourceKey: params.sourceKey,
        createdAt: params.createdAt,
    });
}

export async function logLead(data: {
    email: string;
    scanId: string;
    reportUrl: string;
}): Promise<void> {
    try {
        await syncSheetRow({
            sheet: "Leads",
            row: [formatSheetTimestamp(), data.email, data.scanId, data.reportUrl],
        });
    } catch (err) {
        console.error("[googleSheets.logLead]", err instanceof Error ? err.message : err);
    }
}

export async function logQuote(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    businessName: string;
    websiteUrl?: string;
}): Promise<void> {
    try {
        await syncSheetRow({
            sheet: "Quotes",
            row: [
                formatSheetTimestamp(),
                data.firstName,
                data.lastName,
                data.email,
                data.phone ?? "",
                data.businessName,
                data.websiteUrl ?? "",
            ],
        });
    } catch (err) {
        console.error("[googleSheets.logQuote]", err instanceof Error ? err.message : err);
    }
}

export async function logPayment(data: {
    email: string;
    reportToken: string;
    amountCents: number;
    status: string;
}): Promise<void> {
    try {
        await syncSheetRow({
            sheet: "Payments",
            row: [
                formatSheetTimestamp(),
                data.email,
                data.reportToken,
                (data.amountCents / 100).toFixed(2),
                data.status,
            ],
        });
    } catch (err) {
        console.error("[googleSheets.logPayment]", err instanceof Error ? err.message : err);
    }
}

export async function flushQueuedSheetEvents(limit = 30): Promise<{
    processed: number;
    sent: number;
    failed: number;
}> {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data: queuedRows, error } = await supabaseAdmin
            .from("sheet_sync_events")
            .select("id,sheet,row,attempt_count")
            .eq("status", "queued")
            .order("created_at", { ascending: true })
            .limit(limit);

        if (error) {
            throw new Error(error.message || "Failed to load queued sheet events");
        }

        let processed = 0;
        let sent = 0;
        let failed = 0;

        for (const row of queuedRows ?? []) {
            const { data: claimed, error: claimError } = await supabaseAdmin
                .from("sheet_sync_events")
                .update({
                    status: "processing",
                    last_error: null,
                })
                .eq("id", row.id)
                .eq("status", "queued")
                .select("id,sheet,row,attempt_count")
                .maybeSingle();

            if (claimError || !claimed) {
                failed += 1;
                continue;
            }

            processed += 1;

            try {
                const rowValues = Array.isArray(claimed.row) ? claimed.row : [];
                await sendToSheet(claimed.sheet as SheetName, rowValues as (string | number)[]);
                await updateSheetEvent(claimed.id, {
                    status: "sent",
                    attemptCount: claimed.attempt_count + 1,
                    lastError: null,
                    sentAt: new Date().toISOString(),
                });
                sent += 1;
            } catch (queueError) {
                failed += 1;
                await updateSheetEvent(claimed.id, {
                    status: "queued",
                    attemptCount: claimed.attempt_count + 1,
                    lastError: queueError instanceof Error
                        ? queueError.message.slice(0, 500)
                        : "Unknown queued sheet delivery error",
                });
            }
        }

        return { processed, sent, failed };
    } catch (error) {
        console.error("[googleSheets.flushQueuedSheetEvents]", error instanceof Error ? error.message : error);
        return { processed: 0, sent: 0, failed: 1 };
    }
}
