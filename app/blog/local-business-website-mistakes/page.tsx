import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "5 Website Mistakes That Cost Local Businesses the Most",
    description: "A practical guide to the five most common website issues that reduce leads for local businesses: mobile UX, trust signals, speed, offer clarity, and weak CTAs.",
    alternates: { canonical: "/blog/local-business-website-mistakes" },
    openGraph: {
        title: "5 Website Mistakes That Cost Local Businesses the Most",
        description: "Learn the five most common issues that quietly cost leads and how to fix them quickly.",
        url: "https://siteer.dev/blog/local-business-website-mistakes",
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "5 Website Mistakes That Cost Local Businesses the Most",
    description: "A practical guide to the five most common website issues that reduce leads for local businesses.",
    image: "https://siteer.dev/og-image.png",
    datePublished: "2025-04-01",
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
        { "@type": "ListItem", position: 3, name: "5 Website Mistakes That Cost Local Businesses the Most", item: "https://siteer.dev/blog/local-business-website-mistakes" },
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
                    <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Local SEO guide</p>
                    <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.0, letterSpacing: "-.055em", marginBottom: 20 }}>
                        5 Website Mistakes That Cost Local Businesses the Most
                    </h1>
                    <p style={{ color: "var(--er-muted)", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: 48, maxWidth: 700 }}>
                        Most local sites don't fail because of one huge problem. They leak leads through a stack of small issues: weak mobile usability, missing trust proof, slow pages, vague offers, and calls to action that don't tell people what to do next.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginBottom: 40 }}>
                        {[
                            ["📱 Slow mobile first paint", "People on phones leave before the page becomes usable. Every second of delay costs 7% of conversions.", "var(--er-red)"],
                            ["⭐ No trust proof", "Visitors need reviews, contact details, and clear credibility cues near the top of the page — not buried in the footer.", "var(--er-orange)"],
                            ["❓ Vague offers", "If users don't understand the service, who it's for, and what happens next in ten seconds — they won't convert.", "var(--er-cyan)"],
                            ["📣 Weak CTA hierarchy", "Every page should make the next action obvious. One clear CTA beats three competing ones every time.", "var(--er-green)"],
                        ].map(([title, desc, color]) => (
                            <section key={title as string} style={{ borderRadius: 20, padding: 22, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: 10, color: color as string }}>{title}</h2>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.92rem", lineHeight: 1.65 }}>{desc}</p>
                            </section>
                        ))}
                    </div>

                    <section style={{ borderRadius: 24, padding: 28, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", marginBottom: 40 }}>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 20 }}>What to fix first</h2>
                        <ol style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                            {[
                                "Make the mobile hero simple, short, and easy to act on.",
                                "Add proof near the first CTA: reviews, logos, real numbers, or results.",
                                "Cut page weight by removing unnecessary scripts and oversized media.",
                                "Add one clear action per page and repeat it near the footer.",
                            ].map((item, i) => (
                                <li key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <span style={{ color: "var(--er-green)", fontWeight: 900, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                                    <span style={{ color: "var(--er-muted)", lineHeight: 1.65 }}>{item}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section style={{ borderRadius: 24, padding: 28, background: "linear-gradient(135deg, rgba(255,77,94,.1), rgba(255,177,92,.06))", border: "1px solid rgba(255,77,94,.2)", marginBottom: 48 }}>
                        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 10 }}>Find every issue in 60 seconds — free</h2>
                        <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 20, lineHeight: 1.65 }}>SiteER scans your site for all of these mistakes and grades each one by revenue impact. No developer needed — we find it and fix it for you.</p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "12px 24px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", fontSize: "0.9rem" }}>Run a free scan →</a>
                            <a href="/get-quote" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "12px 24px", fontWeight: 700, color: "white", fontSize: "0.9rem", background: "rgba(255,255,255,.06)" }}>Get implementation help</a>
                        </div>
                    </section>

                    <section style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 40 }}>
                        <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.72rem", fontWeight: 700, marginBottom: 20 }}>Related Reading</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                            <a style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.1)", padding: 20, display: "block", background: "rgba(255,255,255,.04)" }} href="/blog/mobile-page-speed-fixes">
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 8 }}>Performance guide</p>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.4 }}>How to Fix Slow Mobile Pages in Under an Hour</h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.85rem" }}>Fast wins for users on phones — highest-impact changes first.</p>
                            </a>
                            <a style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.1)", padding: 20, display: "block", background: "rgba(255,255,255,.04)" }} href="/blog/website-not-bringing-customers">
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 8 }}>Conversion guide</p>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.4 }}>Why Is My Website Not Bringing In Customers?</h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.85rem" }}>Traffic but no calls? Here's a simple diagnostic sequence.</p>
                            </a>
                        </div>
                    </section>
                </article>
            </main>
            <SiteFooter />
        </>
    );
}
