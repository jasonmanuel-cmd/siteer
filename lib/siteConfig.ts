export const CANONICAL_SITE_URL = "https://www.siteer.dev";

export function normalizeSiteUrl(url: string): string {
    const trimmed = url.trim().replace(/\/+$/, "");
    if (!trimmed) {
        return CANONICAL_SITE_URL;
    }

    try {
        const parsed = new URL(trimmed);
        if (parsed.hostname === "siteer.dev") {
            parsed.hostname = "www.siteer.dev";
        }

        return parsed.toString().replace(/\/+$/, "");
    } catch {
        return trimmed;
    }
}

export function resolveSiteUrl(url?: string | null): string {
    return normalizeSiteUrl(url?.trim() || CANONICAL_SITE_URL);
}
