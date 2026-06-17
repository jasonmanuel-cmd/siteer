import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type Bucket = {
    hits: number;
    resetAt: number;
};

type RateLimitResult = {
    ok: boolean;
    remaining: number;
    retryAfterMs: number;
};

const buckets = new Map<string, Bucket>();
let didWarnPersistentFallback = false;

function consumeMemoryRateLimit(
    key: string,
    limit: number,
    windowMs: number,
): RateLimitResult {
    const now = Date.now();
    const current = buckets.get(key);

    if (!current || current.resetAt <= now) {
        buckets.set(key, { hits: 1, resetAt: now + windowMs });
        return { ok: true, remaining: limit - 1, retryAfterMs: 0 };
    }

    if (current.hits >= limit) {
        return { ok: false, remaining: 0, retryAfterMs: current.resetAt - now };
    }

    current.hits += 1;
    buckets.set(key, current);
    return { ok: true, remaining: limit - current.hits, retryAfterMs: 0 };
}

export async function consumeRateLimit(
    key: string,
    limit: number,
    windowMs: number,
): Promise<RateLimitResult> {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin.rpc("consume_rate_limit", {
            p_key: key,
            p_limit: limit,
            p_window_ms: windowMs,
        });

        if (error) {
            throw new Error(error.message);
        }

        const row = Array.isArray(data) ? data[0] : data;
        if (!row) {
            throw new Error("Missing consume_rate_limit result");
        }

        return {
            ok: Boolean(row.ok),
            remaining: Math.max(0, Number(row.remaining ?? 0)),
            retryAfterMs: Math.max(0, Number(row.retry_after_ms ?? 0)),
        };
    } catch (error) {
        if (!didWarnPersistentFallback) {
            didWarnPersistentFallback = true;
            console.warn(
                "[rateLimit] Persistent limiter unavailable. Falling back to in-memory buckets:",
                error instanceof Error ? error.message : "Unknown rate limit error",
            );
        }

        return consumeMemoryRateLimit(key, limit, windowMs);
    }
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (!forwarded) return "unknown";

    return forwarded.split(",")[0]?.trim() || "unknown";
}
