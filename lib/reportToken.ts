import crypto from "crypto";
import { brotliCompressSync, brotliDecompressSync, constants as zlibConstants } from "zlib";

export type ReportIssue = {
    id?: string;
    severity: string;
    category: string;
    description: string;
    recommendation: string;
};

export type ReportScan = {
    id: string;
    created_at: string;
    overall_grade: string;
    speed_score: number;
    mobile_score: number;
    seo_score: number;
    trust_score: number;
    est_monthly_loss_low: number;
    est_monthly_loss_high: number;
    est_loss_pct: number;
    est_monthly_visitors: number;
    metrics?: Record<string, unknown>;
};

export type StatelessReportPayload = {
    version: 1;
    scan: ReportScan;
    issues: ReportIssue[];
};

const REPORT_TOKEN_PREFIX = "st1";
const SCAN_UNLOCK_PREFIX = "su1";
const PAYMENT_CONFIRM_PREFIX = "pc1";

function getSecret(): string {
    return (
        process.env.REPORT_TOKEN_SECRET ||
        process.env.SQUARE_ACCESS_TOKEN ||
        process.env.RESEND_API_KEY ||
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        "siteer-dev-token-secret"
    );
}

function toBase64Url(value: Buffer): string {
    return value
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Buffer {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
    return Buffer.from(`${normalized}${padding}`, "base64");
}

function sign(encodedPayload: string): string {
    return toBase64Url(
        crypto.createHmac("sha256", getSecret()).update(encodedPayload).digest(),
    );
}

export function isStatelessReportToken(token: string): boolean {
    return token.startsWith(`${REPORT_TOKEN_PREFIX}.`);
}

export function isValidStatelessReportToken(token: string): boolean {
    return readReportToken(token) !== null;
}

function encodePayload(prefix: string, payload: StatelessReportPayload): string {
    const json = Buffer.from(JSON.stringify(payload), "utf8");
    const compressed = brotliCompressSync(json, {
        params: {
            [zlibConstants.BROTLI_PARAM_QUALITY]: 5,
        },
    });
    const encodedPayload = toBase64Url(compressed);
    const signature = sign(encodedPayload);
    return `${prefix}.${encodedPayload}.${signature}`;
}

function decodePayload(prefix: string, token: string): StatelessReportPayload | null {
    const [tokenPrefix, encodedPayload, signature] = token.split(".");
    if (tokenPrefix !== prefix || !encodedPayload || !signature) return null;

    const expected = sign(encodedPayload);
    const provided = Buffer.from(signature, "utf8");
    const current = Buffer.from(expected, "utf8");

    if (provided.length !== current.length) return null;
    if (!crypto.timingSafeEqual(provided, current)) return null;

    try {
        const decompressed = brotliDecompressSync(fromBase64Url(encodedPayload));
        const parsed = JSON.parse(decompressed.toString("utf8")) as StatelessReportPayload;

        if (parsed?.version !== 1 || !parsed.scan || !Array.isArray(parsed.issues)) {
            return null;
        }

        return parsed;
    } catch {
        return null;
    }
}

export function createScanUnlockToken(payload: StatelessReportPayload): string {
    return encodePayload(SCAN_UNLOCK_PREFIX, payload);
}

export function isScanUnlockToken(token: string): boolean {
    return token.startsWith(`${SCAN_UNLOCK_PREFIX}.`);
}

export function readScanUnlockToken(token: string): StatelessReportPayload | null {
    if (!isScanUnlockToken(token)) return null;
    return decodePayload(SCAN_UNLOCK_PREFIX, token);
}

export function createReportToken(payload: StatelessReportPayload): string {
    return encodePayload(REPORT_TOKEN_PREFIX, payload);
}

export function readReportToken(token: string): StatelessReportPayload | null {
    if (!isStatelessReportToken(token)) return null;
    return decodePayload(REPORT_TOKEN_PREFIX, token);
}

export function createPaymentConfirmToken(reportToken: string, email: string): string {
    const nonce = toBase64Url(crypto.randomBytes(12));
    const signature = sign(`${PAYMENT_CONFIRM_PREFIX}|${reportToken}|${email}|${nonce}`);
    return `${PAYMENT_CONFIRM_PREFIX}.${nonce}.${signature}`;
}

export function verifyPaymentConfirmToken(
    token: string,
    reportToken: string,
    email: string,
): boolean {
    const [prefix, nonce, signature] = token.split(".");
    if (prefix !== PAYMENT_CONFIRM_PREFIX || !nonce || !signature) return false;

    const expected = sign(`${PAYMENT_CONFIRM_PREFIX}|${reportToken}|${email}|${nonce}`);
    const provided = Buffer.from(signature, "utf8");
    const current = Buffer.from(expected, "utf8");

    if (provided.length !== current.length) return false;
    return crypto.timingSafeEqual(provided, current);
}
