"use client";

import { useEffect } from "react";

export default function PaidAccessWatcher({
    reportToken,
    enabled,
}: {
    reportToken: string;
    enabled: boolean;
}) {
    useEffect(() => {
        const storageKey = `siteer:paid-access-refresh:${reportToken}`;

        if (!enabled) {
            window.sessionStorage.removeItem(storageKey);
            return;
        }

        const attempts = Number(window.sessionStorage.getItem(storageKey) ?? "0");
        if (attempts >= 5) {
            return;
        }

        const timeout = window.setTimeout(() => {
            window.sessionStorage.setItem(storageKey, String(attempts + 1));
            window.location.reload();
        }, 4000);

        return () => window.clearTimeout(timeout);
    }, [enabled, reportToken]);

    return null;
}
