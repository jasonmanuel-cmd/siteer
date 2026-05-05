import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Why Is My Website Not Bringing In Customers?",
    description: "A simple diagnostic guide for business owners whose site gets traffic but not enough calls, form fills, or customers.",
    alternates: { canonical: "/blog/website-not-bringing-customers" },
    openGraph: {
        title: "Why Is My Website Not Bringing In Customers?",
        description: "A customer-conversion diagnostic framework for local and service businesses.",
        url: "https://siteer.dev/blog/website-not-bringing-customers",
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Why Is My Website Not Bringing In Customers?",
    description: "A simple diagnostic guide for business owners whose site gets traffic but not enough calls, form fills, or customers.",
    image: "https://siteer.dev/og-image.png",
    datePublished: "2025-04-10",
    dateModified: "2026-05-01",
    author: { "@type": "Organization", name: "SiteER", url: "https://siteer.dev" },
    publisher: { "@type": "Organization", name: "SiteER", url: "https://siteer.dev" },
    isPartOf: { "@type": "Blog", name: "SiteER Resources", url: "https://siteer.dev/blog" },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "SiteER", item: "https://siteer.dev" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://siteer.dev/blog" },
        { "@type": "ListItem", position: 3, name: "Why Is My Website Not Bringing In Customers?", item: "https://siteer.dev/blog/website-not-bringing-customers" },
    ],
};

export default function Page() {
    return (
        <>
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <main className="er-container" style={{ padding: "64px 0 0", maxWidth: 860 }}>
                <article>
                    <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Conversion guide</p>
                    <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.0, letterSpacing: "-.055em", marginBottom: 20 }}>
                        Why Is My Website Not Bringing In Customers?
                    </h1>
                    <p style={{ color: "var(--er-muted)", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: 48, maxWidth: 700 }}>
                        When a site gets visits but not customers, the problem is usually not traffic. It is clarity, trust, friction, or the absence of a strong next step. Here's how to diagnose it in under 10 minutes.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginBottom: 40 }}>
                        {[
                            ["🎯 Clarity", "People should know what you do, who it's for, and why it matters in under ten seconds. If they can't, they leave.", "var(--er-cyan)"],
                            ["⭐ Trust", "Add proof close to the CTA: testimonials, logos, guarantees, or real numbers. Without proof, even interested visitors hesitate.", "var(--er-green)"],
                            ["🚪 Friction", "Shorter forms, faster pages, and simpler navigation almost always help. Each extra step loses 10–20% of people.", "var(--er-orange)"],
                            ["💬 Offer strength", "If the offer sounds generic, it won't create urgency. Specific beats vague every time.", "var(--er-red)"],
                        ].map(([title, desc, color]) => (
                            <section key={title as string} style={{ borderRadius: 20, padding: 22, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: 10, color: color as string }}>{title}</h2>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.92rem", lineHeight: 1.65 }}>{desc}</p>
                            </section>
                        ))}
                    </div>

                    <section style={{ borderRadius: 24, padding: 28, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", marginBottom: 40 }}>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 20 }}>A simple diagnostic sequence</h2>
                        <ol style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                            {[
                                "Read the hero out loud. If it's vague, rewrite it to answer: what, who, why in one sentence.",
                                "Check the first CTA. If it's not obvious and specific, tighten the offer.",
                                "Review the page on a phone. If it feels crowded or slow, simplify and compress.",
                                "Make sure there's a next step at every major scroll point — not just at the top.",
                            ].map((item, i) => (
                                <li key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                                    <span style={{ color: "var(--er-muted)", lineHeight: 1.65 }}>{item}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section style={{ borderRadius: 24, padding: 28, background: "linear-gradient(135deg, rgba(255,77,94,.1), rgba(255,177,92,.06))", border: "1px solid rgba(255,77,94,.2)", marginBottom: 48 }}>
                        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 10 }}>Get an instant diagnosis — free</h2>
                        <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 20, lineHeight: 1.65 }}>SiteER scans your site and shows exactly where visitors are dropping off — and how much it's costing you per month. No developer needed.</p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "12px 24px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", fontSize: "0.9rem" }}>Scan the site →</a>
                            <a href="/get-quote" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "12px 24px", fontWeight: 700, color: "white", fontSize: "0.9rem", background: "rgba(255,255,255,.06)" }}>Get help converting</a>
                        </div>
                    </section>

                    <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 40 }}>
                        <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.72rem", fontWeight: 700, marginBottom: 20 }}>Related Reading</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                            <a style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.1)", padding: 20, display: "block", background: "rgba(255,255,255,.04)" }} href="/blog/local-business-website-mistakes">
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 8 }}>Local SEO guide</p>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.4 }}>5 Website Mistakes That Cost Local Businesses the Most</h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.85rem" }}>The common issues that quietly drain leads and revenue.</p>
                            </a>
                            <a style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.1)", padding: 20, display: "block", background: "rgba(255,255,255,.04)" }} href="/blog/mobile-page-speed-fixes">
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 8 }}>Performance guide</p>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.4 }}>How to Fix Slow Mobile Pages in Under an Hour</h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.85rem" }}>Fast wins for users on phones — highest-impact changes first.</p>
                            </a>
                        </div>
                    </section>
                </article>
            </main>
            <SiteFooter />
        </>
    );
}
