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

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Who is SiteER for?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Local business owners, contractors, and service companies who are losing leads from a slow or broken website. Perfect for anyone who wants a fast diagnosis without reading a technical audit.",
            },
        },
        {
            "@type": "Question",
            name: "How long does a scan take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Under 60 seconds. We fetch your page, run 20+ automated checks, calculate your grade, and estimate your monthly revenue leak in real-time.",
            },
        },
        {
            "@type": "Question",
            name: "Will this work with Shopify, Wix, or Webflow?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. SiteER scans any publicly accessible website, regardless of platform. The fixes may differ by builder, but the diagnosis is universally applicable.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need developer skills to understand the report?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "No. We translate technical issues into plain English. Every issue comes with a clear priority level and practical next steps a non-technical person can understand.",
            },
        },
        {
            "@type": "Question",
            name: "What's included in the ER Fix Pack exactly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Speed optimization, mobile fixes, CTA improvements, SEO fundamentals cleanup, and trust signal enhancements. We re-scan after completion to prove the improvements in your grade.",
            },
        },
        {
            "@type": "Question",
            name: "How accurate is the money leak estimate?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "It's directional. We combine your site grade with optional inputs (monthly visitors, conversion rate, average order value) to estimate potential revenue loss. Use it to justify the investment in fixes.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a money-back guarantee?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. If we don't improve your grade by at least 20 points with the ER Fix Pack, you receive a full refund.",
            },
        },
        {
            "@type": "Question",
            name: "What's the difference between the Deep ER Report and ER Fix Pack?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Deep ER Report ($49): Manual review with written recommendations. ER Fix Pack ($497): We actually implement the fixes and re-scan to prove results.",
            },
        },
    ],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "SiteER", item: "https://siteer.dev" },
        { "@type": "ListItem", position: 2, name: "FAQ", item: "https://siteer.dev/faq" },
    ],
};

export default function FaqPage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

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
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">Common Questions</p>
                <h1 className="mt-2 text-4xl font-bold text-balance md:text-5xl">
                    &ldquo;Do I need a developer?&rdquo; No. Here&apos;s why.
                </h1>
                <p className="mt-4 text-lg text-black/65">
                    Most of our customers don't have a developer on staff — that's the point. We scan it, we find it, we fix it.
                </p>
            </section>

            <section className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                <div className="flex flex-wrap gap-6">
                    {[
                        { q: "Do I need to be technical?", a: "Not at all. The report is in plain English. Every issue has a priority level and a clear description anyone can understand." },
                        { q: "What if I don't have a developer?", a: "That's what we're here for. Our team handles every fix for a flat $497 — speed, mobile, SEO, trust signals. You don't touch a line of code." },
                        { q: "How long does the fix take?", a: "Most sites are fully fixed within 3–5 business days. You'll get a before/after re-scan when we're done." },
                    ].map((item) => (
                        <div key={item.q} style={{ flex: "1 1 220px" }}>
                            <div className="text-sm font-bold text-slate-900">{item.q}</div>
                            <p className="mt-1 text-sm text-slate-600">{item.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-10">
                <FaqAccordion />
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-semibold">Ready to find out what&apos;s broken?</h2>
                    <p style={{ marginTop: 8, color: 'var(--er-muted)', fontSize: '0.95rem' }}>
                        Scan is free. If you want us to fix it, we handle everything for a flat fee.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                    <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/#diagnosis">
                        Run a free scan
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/get-quote">
                        Let us fix it — $497
                    </a>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-black/10 bg-white/80 p-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-red-600 mb-4">Related Reading</h2>
                <div className="grid gap-3 md:grid-cols-3">
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02] transition-colors" href="/blog/local-business-website-mistakes">
                        <div className="text-sm font-semibold">5 Website Mistakes That Cost the Most</div>
                        <p className="mt-1 text-sm text-black/60">What quietly leaks leads on service sites.</p>
                    </a>
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02] transition-colors" href="/blog/mobile-page-speed-fixes">
                        <div className="text-sm font-semibold">Fix Slow Mobile Pages in Under an Hour</div>
                        <p className="mt-1 text-sm text-black/60">Fast wins for mobile visitors.</p>
                    </a>
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02] transition-colors" href="/blog/website-not-bringing-customers">
                        <div className="text-sm font-semibold">Why Your Site Isn't Bringing Customers</div>
                        <p className="mt-1 text-sm text-black/60">How to turn visits into calls.</p>
                    </a>
                </div>
            </section>
        </main>
    );
}
