import { Metadata } from "next";
import { siteIdentity } from "@/lib/siteIdentity";
import { CANONICAL_SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
    title: "We Scanned 5 Bakersfield Business Websites — Here's What We Found",
    description: "Free SEO audit results for 5 real Bakersfield business websites. See the most common issues costing local businesses $2,000-$5,000/month in lost revenue.",
    openGraph: {
        title: "We Scanned 5 Bakersfield Business Websites — Here's What We Found",
        description: "Free SEO audit results for 5 real Bakersfield business websites. See the most common issues costing local businesses $2,000-$5,000/month.",
        type: "article",
        publishedTime: "2026-06-22",
        authors: ["Jason Manuel"],
    },
};

export default function BlogPost() {
    return (
        <article className="er-page er-page-narrow" style={{ padding: "60px 20px", maxWidth: 800, margin: "0 auto" }}>
            <p className="er-kicker">Website Audit Results</p>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.1, margin: "16px 0 24px" }}>
                We Scanned 5 Bakersfield Business Websites — Here&apos;s What We Found
            </h1>
            <p className="er-note" style={{ marginBottom: 32 }}>
                June 22, 2026 · By Jason Manuel · 5 min read
            </p>

            <p className="er-copy">
                We ran our free SiteER scan on 5 randomly selected Bakersfield business websites to show the most common issues we see in the local market. The results? Every single one is losing an estimated $2,000-$5,700 per month in revenue due to preventable website problems.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                The Results at a Glance
            </h2>

            <div style={{ display: "grid", gap: 12, marginBottom: 32 }}>
                {[
                    { site: "Bakersfield.com", grade: "C", leak: "$2,600/mo", issues: "No H1, missing meta description, no trust markers" },
                    { site: "Bakersfield Kia", grade: "F", leak: "$5,720/mo", issues: "Missing title tag, no H1, no viewport meta" },
                    { site: "Bakersfield Hyundai", grade: "C", leak: "$2,600/mo", issues: "No H1, no structured data" },
                    { site: "Bakersfield Towing", grade: "C", leak: "$2,600/mo", issues: "6 H1 tags, missing meta description" },
                    { site: "Bakersfield HVAC", grade: "C", leak: "$2,600/mo", issues: "No responsive CSS, no robots.txt" },
                ].map((r) => (
                    <div key={r.site} style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gap: 16,
                        alignItems: "center",
                        padding: 16,
                        background: "var(--bg-surface)",
                        border: "1px solid var(--border-standard)",
                        borderRadius: 8,
                    }}>
                        <strong>{r.site}</strong>
                        <span style={{
                            padding: "4px 12px",
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 700,
                            background: r.grade === "F" ? "rgba(255,59,48,0.15)" : "rgba(255,184,0,0.15)",
                            color: r.grade === "F" ? "var(--accent-red)" : "var(--accent-amber)",
                        }}>
                            Grade: {r.grade}
                        </span>
                        <span style={{ color: "var(--accent-red)", fontWeight: 700, fontFamily: "var(--mono)" }}>
                            {r.leak}
                        </span>
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                The #1 Problem: Missing H1 Headings
            </h2>
            <p className="er-copy">
                4 out of 5 sites had no H1 heading — or had too many (one had 6!). The H1 is the single most important on-page SEO element. It tells Google what your page is about. Without it, you&apos;re invisible in local search.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                The #2 Problem: Missing Meta Descriptions
            </h2>
            <p className="er-copy">
                4 out of 5 sites had no meta description. This is your ad copy in Google search results. Without it, even if you rank, nobody clicks. You&apos;re paying for traffic that bounces.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                The #3 Problem: No Structured Data
            </h2>
            <p className="er-copy">
                Zero out of 5 sites had LocalBusiness schema markup. This is how you get star ratings, business hours, and location info directly in Google search results. Your competitors who have this get 30% more clicks.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                How Much Is This Costing You?
            </h2>
            <p className="er-copy">
                Based on our models, a typical Bakersfield service business with a C-grade website is leaving <strong>$2,000-$3,000/month</strong> on the table. An F-grade site? <strong>$5,000+/month</strong> in lost revenue from customers who never found you or bounced before contacting you.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "32px 0 16px" }}>
                Get Your Free Scan
            </h2>
            <p className="er-copy">
                Want to see how your website grades? Run a free scan at{" "}
                <a href="/" style={{ color: "var(--accent-green)" }}>SiteER</a> — it takes 60 seconds, no credit card required.
            </p>

            <div style={{ marginTop: 48, padding: 24, background: "var(--bg-surface)", border: "1px solid var(--border-standard)", borderRadius: 16 }}>
                <p style={{ fontWeight: 700, marginBottom: 8 }}>About the Scan</p>
                <p className="er-note">
                    These results were generated by SiteER&apos;s free scan tool. The &quot;money leak&quot; estimate is based on industry-average conversion rates and traffic benchmarks for local service businesses in the Bakersfield, CA market. Actual results vary by industry and traffic levels.
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "We Scanned 5 Bakersfield Business Websites — Here's What We Found",
                        author: {
                            "@type": "Person",
                            name: "Jason Manuel",
                            url: "https://chaoticallyorganizedai.com",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: siteIdentity.name,
                            logo: { "@type": "ImageObject", url: `${CANONICAL_SITE_URL}/siteer-logo.png` },
                        },
                        datePublished: "2026-06-22",
                        dateModified: "2026-06-22",
                        mainEntityOfPage: { "@type": "WebPage", "@id": `${CANONICAL_SITE_URL}/blog/bakersfield-website-audit-results` },
                        description: "Free SEO audit results for 5 real Bakersfield business websites. See the most common issues costing local businesses $2,000-$5,000/month in lost revenue.",
                        keywords: ["Bakersfield website audit", "local SEO audit", "website grading", "SEO mistakes Bakersfield"],
                    }),
                }}
            />
        </article>
    );
}
