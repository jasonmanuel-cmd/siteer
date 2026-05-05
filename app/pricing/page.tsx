import type { Metadata } from "next";
import Image from "next/image";

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "SiteER", item: "https://siteer.dev" },
        { "@type": "ListItem", position: 2, name: "Pricing", item: "https://siteer.dev/pricing" },
    ],
};

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "No developer? No problem. SiteER's team fixes every issue we find for a flat $497 — or run the free scan yourself and send the report to anyone.",
    alternates: {
        canonical: "/pricing",
    },
    openGraph: {
        title: "Pricing | SiteER",
        description:
            "Compare the free scan, ER Fix Pack, and Deep ER Report options.",
        url: "https://siteer.dev/pricing",
        siteName: "SiteER",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SiteER pricing preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing | SiteER",
        description:
            "Compare the free scan, ER Fix Pack, and Deep ER Report options.",
        images: ["/og-image.png"],
    },
};

export default function PricingPage() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
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
                            <div style={{ display: "flex", gap: 28, alignItems: "center", color: "var(--er-muted)", fontSize: "1.05rem" }}>
                                <a href="/reports" className="nav-link" style={{ fontWeight: 700 }}>Reports</a>
                                <a href="/pricing" className="nav-link" style={{ fontWeight: 700 }}>Pricing</a>
                                <a href="/blog" className="nav-link" style={{ fontWeight: 700 }}>Blog</a>
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

            <section className="mt-10">
                <h1 className="text-4xl font-semibold md:text-5xl text-white">Don&apos;t have a developer? Good — that&apos;s why we&apos;re here.</h1>
                <p className="mt-3 max-w-2xl" style={{ color: "var(--er-muted)" }}>
                    The scan is always free. If you want us to fix everything we find, our team handles it from start to finish — no developer on your end needed. Every fix is verified by Bakersfield&apos;s trusted web team at{" "}
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-400 hover:underline"
                    >
                        coaibakersfield.com
                    </a>
                    .
                </p>
            </section>

            <section className="mt-10 grid gap-5 md:grid-cols-3">
                <article className="card-dark">
                    <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--er-muted)" }}>
                        Free ER Scan
                    </h2>
                    <p className="mt-2 text-3xl font-semibold text-white">$0</p>
                    <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--er-muted)" }}>
                        <li>✓ Grade your site (A-F)</li>
                        <li>✓ Money leak estimate</li>
                        <li>✓ Top issues and treatment plan</li>
                        <li>✓ Shareable report link</li>
                    </ul>
                    <a
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                        href="/"
                    >
                        Start free scan
                    </a>
                </article>

                <article className="relative card-dark" style={{ background: "linear-gradient(180deg,#7c1414,#a82700)", color: "white" }}>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 text-xs font-bold text-red-900">
                        NO DEVELOPER NEEDED
                    </div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100">
                        ER Fix Pack — We Do It For You
                    </h2>
                    <p className="mt-2 text-3xl font-semibold">$497</p>
                    <p className="mt-1 text-xs text-red-100/80">Flat fee. We handle everything.</p>
                    <p className="mt-3 text-sm text-red-100/90">
                        No developer? No problem. We implement every fix from your scan and re-scan to prove results.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-red-100">
                        <li>✓ Speed + mobile fixes — done for you</li>
                        <li>✓ CTA and trust improvements</li>
                        <li>✓ SEO fundamentals cleanup</li>
                        <li>✓ Before/after re-scan proof</li>
                        <li>✓ 20+ point grade improvement guarantee*</li>
                    </ul>
                    <a
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors"
                        href="/get-quote"
                    >
                        Let us fix it →
                    </a>
                </article>

                <article className="card-dark">
                    <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--er-muted)" }}>
                        Deep ER Report
                    </h2>
                    <p className="mt-2 text-3xl font-semibold text-white">$49</p>
                    <p className="mt-2 text-sm" style={{ color: "var(--er-muted)" }}>
                        30–60 minute human review layered on top of your automated scan.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--er-muted)" }}>
                        <li>✓ Manual review by web expert</li>
                        <li>✓ Copy and offer clarity notes</li>
                        <li>✓ Local SEO quick wins</li>
                        <li>✓ PDF report delivered</li>
                    </ul>
                    <a
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                        href="/get-quote"
                    >
                        Get Deep ER Report →
                    </a>
                </article>
            </section>

            <section className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8">
                <div className="flex items-center gap-4">
                    <span style={{ fontSize: "2.5rem" }}>🛡️</span>
                    <div>
                        <h3 className="font-bold text-slate-900">Money-Back Guarantee</h3>
                        <p className="mt-1 text-sm text-slate-700">
                            If we don&apos;t improve your grade by at least 20 points, you don&apos;t pay. No questions asked.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                            Real Results
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                            Before &amp; After: Sites We Fixed
                        </h2>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <article className="rounded-2xl border border-black/10 bg-white p-6">
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900">Joe&apos;s Plumbing</h3>
                                <p className="text-sm text-slate-600">Local service business</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-red-50 p-3">
                                <div className="text-xs text-red-600 font-semibold">BEFORE</div>
                                <div className="mt-2 text-2xl font-bold text-red-700">38</div>
                                <div className="text-xs text-red-600">Grade F</div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-3">
                                <div className="text-xs text-green-600 font-semibold">AFTER</div>
                                <div className="mt-2 text-2xl font-bold text-green-700">82</div>
                                <div className="text-xs text-green-600">Grade A</div>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-700">
                            <strong>Impact:</strong> 40% more qualified calls, leads now booked 2-3 days faster.
                        </p>
                    </article>
                    <article className="rounded-2xl border border-black/10 bg-white p-6">
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900">Williams &amp; Co. Law</h3>
                                <p className="text-sm text-slate-600">Local service business</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-red-50 p-3">
                                <div className="text-xs text-red-600 font-semibold">BEFORE</div>
                                <div className="mt-2 text-2xl font-bold text-red-700">45</div>
                                <div className="text-xs text-red-600">Grade F</div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-3">
                                <div className="text-xs text-green-600 font-semibold">AFTER</div>
                                <div className="mt-2 text-2xl font-bold text-green-700">79</div>
                                <div className="text-xs text-green-600">Grade B+</div>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-700">
                            <strong>Impact:</strong> Mobile usability restored, local SEO authority improved, estimated $1,200/mo revenue recovery.
                        </p>
                    </article>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                            Built by Bakersfield&apos;s trusted web team
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">coaibakersfield.com</h2>
                        <p className="mt-2 max-w-lg text-sm text-slate-600">
                            We don&apos;t just diagnose — we fix, verify, and report back. Every ER Fix Pack includes a 
                            before/after re-scan so you can see the improvement in real numbers. We&apos;ve been optimizing 
                            websites since 2015.
                        </p>
                    </div>
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
                    >
                        Learn more →
                    </a>
                </div>
            </section>

            <section className="mt-12 rounded-2xl border border-black/10 bg-white/90 p-8 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600">
                            Learn &amp; Implement
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            Understand the fixes before we build them
                        </h2>
                    </div>
                    <a
                        className="text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-2"
                        href="/blog"
                    >
                        Read all guides →
                    </a>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02]" href="/blog/local-business-website-mistakes">
                        <div className="text-sm font-semibold text-slate-900">Local business mistakes</div>
                        <p className="mt-1 text-sm text-black/60">What leaks leads on service sites.</p>
                    </a>
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02]" href="/blog/mobile-page-speed-fixes">
                        <div className="text-sm font-semibold text-slate-900">Mobile speed fixes</div>
                        <p className="mt-1 text-sm text-black/60">Fast wins for users on phones.</p>
                    </a>
                    <a className="rounded-xl border border-black/10 p-4 hover:bg-black/[0.02]" href="/blog/website-not-bringing-customers">
                        <div className="text-sm font-semibold text-slate-900">Customer conversion leaks</div>
                        <p className="mt-1 text-sm text-black/60">How to turn visits into calls.</p>
                    </a>
                </div>
            </section>

            <footer className="mt-12 pt-8 text-sm" style={{ borderTop: "1px solid rgba(255,255,255,.1)", color: "var(--er-muted)" }}>
                <p className="mb-4">* Money-back guarantee: If we don&apos;t improve your grade by at least 20 points within the scope of work, you receive a full refund.</p>
                <p>© {new Date().getFullYear()} SiteER — Built by <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="font-medium text-red-400 hover:underline">coaibakersfield.com</a></p>
            </footer>
        </main>
    );
}
