"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analyticsClient";
import { quickAuditOffer } from "@/lib/offers";
import { PAYMENT_RETURN_STORAGE_KEY, type PaymentReturnState } from "@/lib/paymentReturn";

export default function BuyReportButton({ reportToken }: { reportToken: string }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    async function handlePurchase(e: React.FormEvent) {
        e.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();
        setLoading(true);
        setError("");
        trackEvent("audit_checkout_started", {
            product: "quick_er_audit",
            price_cents: quickAuditOffer.priceCents,
        });
        try {
            const res = await fetch("/api/square", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ reportToken, email: normalizedEmail }),
            });
            const data = await res.json() as {
                checkoutUrl?: string;
                buyerEmail?: string;
                confirmToken?: string;
                error?: string;
            };
            if (!res.ok || !data.checkoutUrl) throw new Error(data.error || "Payment setup failed");
            if (!data.buyerEmail || !data.confirmToken) {
                throw new Error("Payment return details were missing. Please try again.");
            }

            const returnState: PaymentReturnState = {
                reportToken,
                email: data.buyerEmail,
                confirmToken: data.confirmToken,
            };
            window.sessionStorage.setItem(
                PAYMENT_RETURN_STORAGE_KEY,
                JSON.stringify(returnState),
            );
            window.location.href = data.checkoutUrl;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Payment setup failed";
            trackEvent("audit_checkout_failed", {
                reason: message.slice(0, 120),
            });
            setError(message);
            setLoading(false);
        }
    }

    if (!open) {
        return (
            <button
                onClick={() => {
                    trackEvent("audit_offer_opened", {
                        product: "quick_er_audit",
                        price_cents: quickAuditOffer.priceCents,
                    });
                    setOpen(true);
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
                Buy {quickAuditOffer.name} — {quickAuditOffer.priceLabel}
            </button>
        );
    }

    return (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Buy {quickAuditOffer.name} — {quickAuditOffer.priceLabel}</p>
            <p className="mt-1 text-xs text-slate-500">{quickAuditOffer.description} Handled by <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="font-medium text-red-600 hover:underline">COAIBAKERSFIELD.COM</a>.</p>
            <form onSubmit={handlePurchase} className="mt-3 flex flex-col gap-2">
                <input
                    required
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
                />
                {error && <p aria-live="polite" className="text-xs text-red-600">{error}</p>}
                {error ? (
                    <p className="text-xs text-slate-600">
                        Need the audit now?{" "}
                        <a href="/get-quote" className="font-medium text-red-600 hover:underline">
                            Request it here
                        </a>
                        {" "}and we can follow up manually.
                    </p>
                ) : null}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading || !email.trim()}
                        className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                    >
                        {loading ? "Redirecting..." : "Pay with Square →"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
