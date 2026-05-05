import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Blog — Website Tips for Local Business Owners",
    description: "Practical guides on website speed, SEO, mobile usability, and conversion for local business owners who want more leads from the same traffic.",
    alternates: { canonical: "/blog" },
    openGraph: {
        title: "Blog | SiteER",
        description: "Practical guides for fixing website speed, SEO, trust, and conversion issues.",
        url: "https://siteer.dev/blog",
        siteName: "SiteER",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SiteER blog" }],
    },
};

const posts = [
    {
        href: "/blog/local-business-website-mistakes",
        category: "Local SEO guide",
        title: "5 Website Mistakes That Cost Local Businesses the Most",
        summary: "How weak mobile UX, missing trust proof, and broken CTAs quietly cut lead volume — and what to fix first.",
    },
    {
        href: "/blog/mobile-page-speed-fixes",
        category: "Performance guide",
        title: "How to Fix Slow Mobile Pages in Under an Hour",
        summary: "A practical speed-first checklist for business owners and small teams. Highest-impact changes ranked by effort.",
    },
    {
        href: "/blog/website-not-bringing-customers",
        category: "Conversion guide",
        title: "Why Is My Website Not Bringing In Customers?",
        summary: "A non-technical diagnostic framework to spot and fix conversion leaks fast — even if you don’t have a developer.",
    },
];

export default function BlogPage() {
    return (
        <>
            <SiteHeader />
            <main className="er-container" style={{ padding: "64px 0 0" }}>
                <section style={{ maxWidth: 720, marginBottom: 56 }}>
                    <p style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Resources</p>
                    <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 0.96, letterSpacing: "-.065em", marginBottom: 20 }}>
                        Website tips for business owners, not developers.
                    </h1>
                    <p style={{ color: "var(--er-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
                        Plain-English guides on speed, SEO, mobile usability, and conversion — written for people who run a business, not people who build websites.
                    </p>
                </section>
                <div style={{ display: "grid", gap: 18 }}>
                    {posts.map((post) => (
                        <article key={post.href} style={{ borderRadius: 24, padding: 28, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
                            <div>
                                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--er-red)", marginBottom: 10 }}>{post.category}</p>
                                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-.025em", marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h2>
                                <p style={{ color: "var(--er-muted)", fontSize: "0.95rem", lineHeight: 1.65 }}>{post.summary}</p>
                            </div>
                            <a href={post.href} style={{ whiteSpace: "nowrap", border: 0, borderRadius: 999, padding: "12px 22px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", fontSize: "0.88rem", display: "inline-flex", alignItems: "center" }}>
                                Read →
                            </a>
                        </article>
                    ))}
                </div>
                <section style={{ marginTop: 64, borderRadius: 24, padding: 32, background: "linear-gradient(135deg, rgba(255,77,94,.1), rgba(255,177,92,.06))", border: "1px solid rgba(255,77,94,.2)" }}>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 12 }}>Want us to fix it instead of just reading about it?</h2>
                    <p style={{ color: "var(--er-muted)", marginBottom: 24, lineHeight: 1.65 }}>Run a free scan and see exactly what’s broken on your site — then let our team fix it for a flat $497.</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "14px 28px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.95rem" }}>Run a free scan →</a>
                        <a href="/pricing" style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: "14px 28px", fontWeight: 700, color: "white", fontSize: "0.95rem", background: "rgba(255,255,255,.06)" }}>See Fix Pack pricing</a>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </>
    );
}
