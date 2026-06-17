import { CANONICAL_SITE_URL, normalizeSiteUrl } from "@/lib/siteConfig";

const DEFAULT_APP_URL = CANONICAL_SITE_URL;

export function resolveAppUrl(request?: Request): string {
    const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (configured) {
        return normalizeSiteUrl(configured);
    }

    if (request) {
        try {
            return normalizeSiteUrl(new URL(request.url).origin);
        } catch {
            // Ignore malformed request URLs and fall back to the canonical domain.
        }
    }

    return DEFAULT_APP_URL;
}
