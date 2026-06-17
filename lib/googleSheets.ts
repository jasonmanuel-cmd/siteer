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
 *
 * function doPost(e) {
 *   try {
 *     const data = JSON.parse(e.postData.contents);
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

function getWebhookUrl(): string | null {
    const value = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
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
    sheet: "Leads" | "Quotes" | "Payments",
    row: (string | number)[],
): Promise<void> {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
        console.warn(`[googleSheets] GOOGLE_SHEETS_WEBHOOK_URL is not set. Skipping ${sheet} row.`);
        return;
    }

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet, row }),
    });
    const responseText = await response.text();
    const payload = parseWebhookPayload(responseText);

    if (!response.ok) {
        throw new Error(
            `Webhook returned HTTP ${response.status}${payload?.error ? `: ${payload.error}` : ""}`,
        );
    }

    if (payload && payload.ok === false) {
        throw new Error(payload.error || "Webhook rejected the sheet row");
    }
}

function timestamp(): string {
    return new Date().toLocaleString("en-US", {
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

export async function logLead(data: {
    email: string;
    scanId: string;
    reportUrl: string;
}): Promise<void> {
    try {
        await sendToSheet("Leads", [timestamp(), data.email, data.scanId, data.reportUrl]);
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
        await sendToSheet("Quotes", [
            timestamp(),
            data.firstName,
            data.lastName,
            data.email,
            data.phone ?? "",
            data.businessName,
            data.websiteUrl ?? "",
        ]);
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
        await sendToSheet("Payments", [
            timestamp(),
            data.email,
            data.reportToken,
            (data.amountCents / 100).toFixed(2),
            data.status,
        ]);
    } catch (err) {
        console.error("[googleSheets.logPayment]", err instanceof Error ? err.message : err);
    }
}
