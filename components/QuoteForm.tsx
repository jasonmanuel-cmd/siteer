"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analyticsClient";
import { fixPackDepositOffer } from "@/lib/offers";

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    websiteUrl: string;
};

const empty: FormState = {
    firstName: "", lastName: "", email: "",
    phone: "", businessName: "", websiteUrl: "",
};

export default function QuoteForm() {
    const searchParams = useSearchParams();
    const [form, setForm] = useState<FormState>(empty);
    const [status, setStatus] = useState<"idle" | "submitting" | "redirecting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const depositPaid = searchParams.get("deposit") === "paid";
    const paidQuoteId = searchParams.get("quote");

    useEffect(() => {
        if (!depositPaid) return;

        trackEvent("quote_deposit_returned", {
            has_quote_reference: Boolean(paidQuoteId),
            price_cents: fixPackDepositOffer.priceCents,
        });
    }, [depositPaid, paidQuoteId]);

    function set(field: keyof FormState, value: string) {
        setForm((f) => ({ ...f, [field]: value }));
        if (errorMsg) setErrorMsg("");
        if (status === "error") setStatus("idle");
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const payload = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            businessName: form.businessName.trim(),
            websiteUrl: form.websiteUrl.trim(),
        };

        setStatus("submitting");
        setErrorMsg("");
        trackEvent("quote_checkout_started", {
            has_phone: Boolean(payload.phone),
            has_website: Boolean(payload.websiteUrl),
            price_cents: fixPackDepositOffer.priceCents,
        });
        try {
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");

            if (typeof data.checkoutUrl === "string") {
                trackEvent("quote_checkout_redirected", {
                    has_phone: Boolean(payload.phone),
                    has_website: Boolean(payload.websiteUrl),
                    price_cents: fixPackDepositOffer.priceCents,
                });
                setStatus("redirecting");
                window.location.href = data.checkoutUrl;
                return;
            }

            trackEvent("quote_request_submitted", {
                has_phone: Boolean(form.phone.trim()),
                has_website: Boolean(form.websiteUrl.trim()),
            });
            setStatus("success");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Submission failed";
            trackEvent("quote_checkout_failed", {
                reason: message.slice(0, 120),
            });
            setErrorMsg(message);
            setStatus("error");
        }
    }

    if (depositPaid) {
        return (
            <div style={{ borderRadius: 16, border: "1px solid rgba(62,226,143,0.3)", background: "rgba(62,226,143,0.08)", padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✓</div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#eef7ff", marginBottom: 10 }}>Deposit received.</h2>
                <p style={{ color: "#9fb1c3", maxWidth: 460, margin: "0 auto", lineHeight: 1.65, fontSize: "0.95rem" }}>
                    Your {fixPackDepositOffer.priceLabel} ER Fix Pack deposit is in. We have your project request and will follow up within 1 business day with the implementation plan and remaining balance details.
                    {paidQuoteId ? ` Quote reference: ${paidQuoteId}.` : ""}
                </p>
            </div>
        );
    }

    if (status === "redirecting") {
        return (
            <div style={{ borderRadius: 16, border: "1px solid rgba(255,177,92,0.32)", background: "rgba(255,177,92,0.08)", padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>↗</div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#eef7ff", marginBottom: 10 }}>Redirecting to secure checkout…</h2>
                <p style={{ color: "#9fb1c3", maxWidth: 420, margin: "0 auto", lineHeight: 1.65, fontSize: "0.95rem" }}>
                    Your quote request is saved. We’re taking you to Square now for the {fixPackDepositOffer.priceLabel} deposit.
                </p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div style={{ borderRadius: 16, border: "1px solid rgba(62,226,143,0.3)", background: "rgba(62,226,143,0.08)", padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✓</div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#eef7ff", marginBottom: 10 }}>Quote request received.</h2>
                <p style={{ color: "#9fb1c3", maxWidth: 380, margin: "0 auto", lineHeight: 1.65, fontSize: "0.95rem" }}>
                    The team at{" "}
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#ff8792", fontWeight: 700, textDecoration: "none" }}
                    >
                        COAIBAKERSFIELD.COM
                    </a>{" "}
                    will review your site and reach out within 1 business day with a custom fix plan and pricing.
                </p>
            </div>
        );
    }

    const inputClass = "mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#eef7ff] placeholder-[#4b5e6d] focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/20 transition";
    const labelClass = "block text-sm font-medium text-[#9fb1c3]";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="quote-first-name" className={labelClass}>First Name <span className="text-red-500">*</span></label>
                <input
                    id="quote-first-name"
                    required
                    autoComplete="given-name"
                    maxLength={80}
                    className={inputClass}
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="quote-last-name" className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                <input
                    id="quote-last-name"
                    required
                    autoComplete="family-name"
                    maxLength={80}
                    className={inputClass}
                    placeholder="Smith"
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="quote-email" className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input
                    id="quote-email"
                    required
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    className={inputClass}
                    placeholder="jane@yourbusiness.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="quote-phone" className={labelClass}>Phone Number</label>
                <input
                    id="quote-phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    className={inputClass}
                    placeholder="(661) 555-0100"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="quote-business-name" className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                <input
                    id="quote-business-name"
                    required
                    autoComplete="organization"
                    maxLength={120}
                    className={inputClass}
                    placeholder="Acme Co."
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="quote-website-url" className={labelClass}>Website URL</label>
                <input
                    id="quote-website-url"
                    type="url"
                    autoComplete="url"
                    maxLength={2048}
                    className={inputClass}
                    placeholder="https://yourbusiness.com"
                    value={form.websiteUrl}
                    onChange={(e) => set("websiteUrl", e.target.value)}
                />
            </div>

            {status === "error" && (
                <p aria-live="polite" className="rounded-xl px-4 py-3 text-sm text-red-400" style={{ border: "1px solid rgba(255,77,94,0.3)", background: "rgba(255,77,94,0.1)" }}>
                    {errorMsg}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                style={{ width: "100%", borderRadius: 12, background: "linear-gradient(135deg,#ff4d5e,#ffb15c)", border: "none", padding: "14px 24px", fontSize: "0.9rem", fontWeight: 700, color: "#1b080a", cursor: "pointer", opacity: status === "submitting" ? 0.6 : 1, letterSpacing: "-0.02em", boxShadow: "0 12px 36px rgba(255,77,94,0.28)" }}
            >
                {status === "submitting" ? "Saving your quote..." : `Continue to ${fixPackDepositOffer.priceLabel} Deposit →`}
            </button>

            <p className="text-center text-xs" style={{ color: "#4b5e6d" }}>
                Your {fixPackDepositOffer.priceLabel} deposit is applied to the final implementation total. Our team at{" "}
                <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" style={{ color: "#71869a", fontWeight: 600 }}>
                    COAIBAKERSFIELD.COM
                </a>{" "}
                will respond within 1 business day.
            </p>
        </form>
    );
}
