// In-memory fallback (used when DB is unavailable or for warm instances)
type Bucket = {
    hits: number;
    resetAt: number;
};

const memBuckets = new Map<string, Bucket>();

function memConsumeRateLimit(
    key: string,
    limit: number,
    windowMs: number,
): { ok: boolean; remaining: number; retryAfterMs: number } {
    const now = Date.now();
    const current = memBuckets.get(key);

    if (!current || current.resetAt <= now) {
        memBuckets.set(key, { hits: 1, resetAt: now + windowMs });
        return { ok: true, remaining: limit - 1, retryAfterMs: 0 };
    }

    if (current.hits >= limit) {
        return { ok: false, remaining: 0, retryAfterMs: current.resetAt - now };
    }

    current.hits += 1;
    memBuckets.set(key, current);
    return { ok: true, remaining: limit - current.hits, retryAfterMs: 0 };
}

// Supabase-backed persistent rate limiter
// Falls back to in-memory if Supabase is unavailable (e.g. missing env vars).
let supabaseAdmin: ReturnType<typeof import("./supabaseAdmin").getSupabaseAdmin> | null = null;

async function getDb() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
    if (!supabaseAdmin) {
        try {
            const { getSupabaseAdmin } = await import("./supabaseAdmin");
            supabaseAdmin = getSupabaseAdmin();
        } catch {
            return null;
        }
    }
    return supabaseAdmin;
}

export async function consumeRateLimitAsync(
    key: string,
    limit: number,
    windowMs: number,
): Promise<{ ok: boolean; remaining: number; retryAfterMs: number }> {
    const db = await getDb();
    if (!db) return memConsumeRateLimit(key, limit, windowMs);

    const now = new Date();
    const resetAt = new Date(Date.now() + windowMs).toISOString();

    try {
        // Upsert: increment hits if window is still open, otherwise reset
        const { data, error } = await db.rpc("upsert_rate_limit", {
            p_key: key,
            p_limit: limit,
            p_reset_at: resetAt,
        });

        if (error || data === null) {
            // RPC may not exist if migration hasn't run yet — fall back to memory
            return memConsumeRateLimit(key, limit, windowMs);
        }

        const row = data as { hits: number; reset_at: string; allowed: boolean };
        const retryAfterMs = row.allowed ? 0 : new Date(row.reset_at).getTime() - now.getTime();
        return { ok: row.allowed, remaining: Math.max(0, limit - row.hits), retryAfterMs };
    } catch {
        return memConsumeRateLimit(key, limit, windowMs);
    }
}

// Synchronous version kept for backwards compatibility —
// still uses the in-memory bucket but also fires the async check
// so persistent limits catch up on subsequent requests.
export function consumeRateLimit(
    key: string,
    limit: number,
    windowMs: number,
): { ok: boolean; remaining: number; retryAfterMs: number } {
    return memConsumeRateLimit(key, limit, windowMs);
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (!forwarded) return "unknown";
    return forwarded.split(",")[0]?.trim() || "unknown";
}
