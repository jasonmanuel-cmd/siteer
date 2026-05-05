import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "How to Fix Slow Mobile Pages in Under an Hour",
    description: "A practical mobile speed checklist for business owners who need a faster page without waiting on a full redesign.",
    alternates: { canonical: "/blog/mobile-page-speed-fixes" },
    openGraph: {
        title: "How to Fix Slow Mobile Pages in Under an Hour",
        description: "A speed-first checklist for faster mobile landing pages.",
        url: "https://siteer.dev/blog/mobile-page-speed-fixes",
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "How to Fix Slow Mobile Pages in Under an Hour", description: "A practical mobile speed checklist for business owners.", image: "https://siteer.dev/og-image.png", datePublished: "2025-04-05", dateModified: "2026-05-01", author: { "@type": "Organization", name: "SiteER", url: "https://siteer.dev" }, publisher: { "@type": "Organization", name: "SiteER", url: "https://siteer.dev" }, isPartOf: { "@type": "Blog", name: "SiteER Resources", url: "https://siteer.dev/blog" } };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "SiteER", item: "https://siteer.dev" }, { "@type": "ListItem", position: 2, name: "Blog", item: "https://siteer.dev/blog" }, { "@type": "ListItem", position: 3, name: "How to Fix Slow Mobile Pages in Under an Hour", item: "https://siteer.dev/blog/mobile-page-speed-fixes" }] };

export default function Page() {
    return (
        <>
            <SiteHeader />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <main className="er-container" style={{ padding: "64px 0 0", maxWidth: 860 }}>
                <article>
                    <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Performance guide</p>
                    <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.0, letterSpacing: "-.055em", marginBottom: 20 }}>How to Fix Slow Mobile Pages in Under an Hour</h1>
                    <p style={{ color: "var(--er-muted)", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: 48, maxWidth: 700 }}>Mobile performance is usually a few repeatable issues: oversized images, too much JavaScript, layout shifts, and a hero section that asks the browser to do too much too early.</p>
                    <section style={{ borderRadius: 24, padding: 28, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", marginBottom: 24 }}>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: 20 }}>Fast wins — do these first</h2>
                        <ol style={{ display: "grid", gap: 14, listStyle: "none", padding: 0, margin: 0 }}>
                            {["Compress the biggest images and convert them to AVIF/WebP.","Delay non-essential scripts until after the first visible paint.","Use a single CTA in the hero and keep the form short.","Remove layout jumps by giving media and cards fixed dimensions.","Keep the page layout column-based on narrow screens."].map((item, i) => (
                                <li key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <span style={{ color: "var(--er-cyan)", fontWeight: 900, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
                                    <span style={{ color: "var(--er-muted)", lineHeight: 1.65 }}>{item}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginBottom: 48 }}>
                        {[["⚡ Image hygiene","The biggest wins often come from shrinking hero media and replacing unnecessary screenshots with text or SVG."],["🧹 Script hygiene","Client-side code should be reserved for the parts of the page that truly need it. Audit every script tag."],["📐 Spacing hygiene","Avoid massive vertical gaps that push conversion elements below the fold on phones."],["📣 CTA hygiene","Make the call to action visible without scrolling or pinching. One strong CTA beats three weak ones."]].map(([title, desc]) => (
                            <section key={title} style={{ borderRadius: 20, padding: 22, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)" }}>
                                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: 10 }}>{title}</h2>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.92rem", lineHeight: 1.65 }}>{desc}</p>
                            </section>
                        ))}
                    </div>
                    <section style={{ borderRadius: 24, padding: 28, background: "linear-gradient(135deg, rgba(255,77,94,.1), rgba(255,177,92,.06))", border: "1px solid rgba(255,77,94,.2)", marginBottom: 48 }}>
                        <h2 style={{ fontSize: "1.15rem", fontWeight: 800, marginBottom: 10 }}>Don’t want to do it yourself?</h2>
                        <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", marginBottom: 20, lineHeight: 1.65 }}>Run a free scan to see exactly which speed issues are on your page. We’ll quantify the revenue impact and fix everything for a flat $497.</p>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "12px 24px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", fontSize: "0.9rem" }}>Test your page →</a>
                            <a href="/get-quote" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "12px 24px", fontWeight: 700, color: "white", fontSize: "0.9rem", background: "rgba(255,255,255,.06)" }}>Ask for a speed fix</a>
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
                            <a style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,.1)", padding: 20, display: "block", background: "rgba(255,255,255,.04)" }} href="/blog/website-not-bringing-customers">
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-muted)", marginBottom: 8 }}>Conversion guide</p>
                                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, lineHeight: 1.4 }}>Why Is My Website Not Bringing In Customers?</h3>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.85rem" }}>Traffic but no calls? Here’s a simple diagnostic sequence.</p>
                            </a>
                        </div>
                    </section>
                </article>
            </main>
            <SiteFooter />
        </>
    );
}
