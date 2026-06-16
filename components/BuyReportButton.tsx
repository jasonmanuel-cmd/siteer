"use client";

import { useState } from "react";
import { quickAuditOffer } from "@/lib/offers";

export default function BuyReportButton({ reportToken }: { reportToken: string }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    async function handlePurchase(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/square", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ reportToken, email }),
            });
            const data = await res.json();
            if (!res.ok || !data.checkoutUrl) throw new Error(data.error || "Payment setup failed");
            window.location.href = data.checkoutUrl;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Payment setup failed");
            setLoading(false);
        }
    }

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
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
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none"
                />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
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
