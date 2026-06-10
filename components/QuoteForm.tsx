"use client";

import { useState } from "react";

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
    const [form, setForm] = useState<FormState>(empty);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function set(field: keyof FormState, value: string) {
        setForm((f) => ({ ...f, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");
        try {
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
            setStatus("success");
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : "Submission failed");
            setStatus("error");
        }
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
                    className={inputClass}
                    placeholder="https://yourbusiness.com"
                    value={form.websiteUrl}
                    onChange={(e) => set("websiteUrl", e.target.value)}
                />
            </div>

            {status === "error" && (
                <p className="rounded-xl px-4 py-3 text-sm text-red-400" style={{ border: "1px solid rgba(255,77,94,0.3)", background: "rgba(255,77,94,0.1)" }}>
                    {errorMsg}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                style={{ width: "100%", borderRadius: 12, background: "linear-gradient(135deg,#ff4d5e,#ffb15c)", border: "none", padding: "14px 24px", fontSize: "0.9rem", fontWeight: 700, color: "#1b080a", cursor: "pointer", opacity: status === "submitting" ? 0.6 : 1, letterSpacing: "-0.02em", boxShadow: "0 12px 36px rgba(255,77,94,0.28)" }}
            >
                {status === "submitting" ? "Sending..." : "Request My Fix Quote →"}
            </button>

            <p className="text-center text-xs" style={{ color: "#4b5e6d" }}>
                No obligation. Our team at{" "}
                <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" style={{ color: "#71869a", fontWeight: 600 }}>
                    COAIBAKERSFIELD.COM
                </a>{" "}
                will respond within 1 business day.
            </p>
        </form>
    );
}
