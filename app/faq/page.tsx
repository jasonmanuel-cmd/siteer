import type { Metadata } from "next";
import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
    title: "FAQ",
    description:
        "Answers to common questions about the SiteER diagnosis funnel, report delivery, pricing, and implementation.",
    alternates: {
        canonical: "/faq",
    },
    openGraph: {
        title: "FAQ | SiteER",
        description:
            "Answers to common questions about the diagnosis funnel and reports.",
        url: "https://siteer.dev/faq",
        siteName: "SiteER",
        type: "website",
    },
};

export default function FaqPage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
                <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                    <div className="er-container">
                        <nav style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                            <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }} aria-label="SiteER home">
                                <Image
                                    src="/siteer-logo.png"
                                    alt="SiteER logo"
                                    width={280}
                                    height={80}
                                    priority
                                    style={{ width: "auto", height: 42 }}
                                />
                            </a>
                            <div style={{ display: "flex", gap: 32, alignItems: "center", color: "var(--er-muted)", fontSize: "1.05rem" }}>
                                <a href="/reports" className="nav-link" style={{ fontWeight: 700 }}>Reports</a>
                                <a href="/pricing" className="nav-link" style={{ fontWeight: 700 }}>Pricing</a>
                                <a href="/faq" className="nav-link" style={{ fontWeight: 700 }}>FAQ</a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "14px 22px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.95rem", minHeight: 48 }}>
                                    <span className="cta-word-dark">Scan a Site</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </header>

            <section className="mt-10 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">Questions</p>
                <h1 className="mt-2 text-4xl font-bold text-balance md:text-5xl">
                    Questions about SiteER? We've got answers.
                </h1>
                <p className="mt-4 text-lg text-black/65">
                    Find practical details about how the scan works, what you'll get, and what's next.
                </p>
            </section>

            <section className="mt-10">
                <FaqAccordion />
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-semibold">Need the next step?</h2>
                    <p style={{ marginTop: 8, color: 'var(--er-muted)', fontSize: '0.95rem' }}>
                        Run a scan on the homepage, then unlock the report with your email.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                    <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/#diagnosis">
                        Run a diagnosis
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/pricing">
                        View pricing
                    </a>
                </div>
            </section>
        </main>
    );
}
