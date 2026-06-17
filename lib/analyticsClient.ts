"use client";

import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
    interface Window {
        gtag?: (command: string, eventName: string, properties?: Record<string, string | number | boolean | null>) => void;
    }
}

export function trackEvent(name: string, properties: AnalyticsPayload = {}): void {
    const sanitized = Object.fromEntries(
        Object.entries(properties).filter(([, value]) => value !== undefined),
    ) as Record<string, string | number | boolean | null>;

    try {
        track(name, sanitized);
    } catch {
        // Ignore analytics transport failures so funnel tracking never blocks UX.
    }

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", name, sanitized);
    }
}
