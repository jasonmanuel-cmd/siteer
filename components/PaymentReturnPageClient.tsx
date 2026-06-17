"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analyticsClient";
import { PAYMENT_RETURN_STORAGE_KEY, type PaymentReturnState } from "@/lib/paymentReturn";

type ReturnStatus = "loading" | "missing" | "redirecting";

function readReturnState(): PaymentReturnState | null {
    const raw = window.sessionStorage.getItem(PAYMENT_RETURN_STORAGE_KEY);
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw) as Partial<PaymentReturnState>;
        if (!parsed.reportToken || !parsed.email || !parsed.confirmToken) {
            return null;
        }

        return {
            reportToken: parsed.reportToken,
            email: parsed.email,
            confirmToken: parsed.confirmToken,
        };
    } catch {
        return null;
    }
}

export default function PaymentReturnPageClient() {
    const [status, setStatus] = useState<ReturnStatus>("loading");

    useEffect(() => {
        const returnState = readReturnState();
        if (!returnState) {
            trackEvent("audit_payment_return_missing");
            setStatus("missing");
            return;
        }

        const params = new URLSearchParams({
            paid: "true",
            buyer: returnState.email,
            confirm: returnState.confirmToken,
        });
        const destination = `/scan/${encodeURIComponent(returnState.reportToken)}?${params.toString()}`;

        window.sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
        trackEvent("audit_payment_return_started");
        setStatus("redirecting");
        window.location.replace(destination);
    }, []);

    return (
        <main className="light-page mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-5 py-12">
            <div className="w-full rounded-3xl border border-black/10 bg-white/95 p-8 text-center shadow-sm">
                <h1 className="text-3xl font-semibold text-slate-900">
                    {status === "missing" ? "Payment return needs one more step" : "Finishing your paid report"}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    {status === "missing"
                        ? "We could not find your report session in this browser tab. Open the original report again and retry the payment flow, or contact us if the charge already went through."
                        : "Please wait while we send you back to your report."}
                </p>
                <a
                    href="/"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                    Back to SiteER
                </a>
            </div>
        </main>
    );
}
