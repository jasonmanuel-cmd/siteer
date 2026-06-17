const DEFAULT_APP_URL = "https://siteer.dev";

export function resolveAppUrl(request?: Request): string {
    const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (configured) {
        return configured.replace(/\/+$/, "");
    }

    if (request) {
        try {
            return new URL(request.url).origin;
        } catch {
            // Ignore malformed request URLs and fall back to the canonical domain.
        }
    }

    return DEFAULT_APP_URL;
}
