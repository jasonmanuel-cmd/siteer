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
            <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
                <div className="text-4xl">✓</div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Quote request received.</h2>
                <p className="mt-3 text-slate-600 max-w-md mx-auto">
                    The team at{" "}
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        COAIBAKERSFIELD.COM
                    </a>{" "}
                    will review your site and reach out within 1 business day with a custom fix plan and pricing.
                </p>
            </div>
        );
    }

    const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 transition";
    const labelClass = "block text-sm font-medium text-slate-700";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                    <input
                        required
                        className={inputClass}
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={(e) => set("firstName", e.target.value)}
                    />
                </div>
                <div>
                    <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                    <input
                        required
                        className={inputClass}
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={(e) => set("lastName", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="jane@yourbusiness.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Phone Number</label>
                <input
                    type="tel"
                    className={inputClass}
                    placeholder="(661) 555-0100"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Business Name <span className="text-red-500">*</span></label>
                <input
                    required
                    className={inputClass}
                    placeholder="Acme Co."
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                />
            </div>

            <div>
                <label className={labelClass}>Website URL</label>
                <input
                    type="url"
                    className={inputClass}
                    placeholder="https://yourbusiness.com"
                    value={form.websiteUrl}
                    onChange={(e) => set("websiteUrl", e.target.value)}
                />
            </div>

            {status === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                </p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 hover:bg-red-700 disabled:opacity-60 transition-colors"
            >
                {status === "submitting" ? "Sending..." : "Request My Fix Quote →"}
            </button>

            <p className="text-center text-xs text-slate-400">
                No obligation. Our team at{" "}
                <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-500 hover:text-red-600">
                    COAIBAKERSFIELD.COM
                </a>{" "}
                will respond within 1 business day.
            </p>
        </form>
    );
}
