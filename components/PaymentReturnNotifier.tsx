"use client";

import { useEffect } from "react";

export default function PaymentReturnNotifier({
    reportToken,
    email,
    confirmToken,
}: {
    reportToken: string;
    email: string;
    confirmToken: string;
}) {
    useEffect(() => {
        if (!reportToken || !email || !confirmToken) return;

        const storageKey = `siteer-payment-confirm:${confirmToken}`;
        if (window.sessionStorage.getItem(storageKey) === "sent") return;

        window.sessionStorage.setItem(storageKey, "sent");

        void (async () => {
            try {
                const response = await fetch("/api/payment-confirm", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        reportToken,
                        email,
                        confirmToken,
                    }),
                });

                if (!response.ok) {
                    window.sessionStorage.removeItem(storageKey);
                }
            } catch {
                window.sessionStorage.removeItem(storageKey);
            }
        })();
    }, [confirmToken, email, reportToken]);

    return null;
}
