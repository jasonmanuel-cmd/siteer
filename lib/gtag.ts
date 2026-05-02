export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>,
): void {
    if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;
    window.gtag("event", eventName, params);
}
