import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
    title: "Why Is My Website Not Bringing In Customers?",
    description:
        "A simple diagnostic guide for business owners whose site gets traffic but not enough calls, form fills, or customers.",
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
    description:
        "A simple diagnostic guide for business owners whose site gets traffic but not enough calls, form fills, or customers.",
    image: "https://siteer.dev/og-image.png",
    datePublished: "2025-04-10",
    dateModified: "2025-04-25",
    author: {
        "@type": "Organization",
        name: "SiteER",
        url: "https://siteer.dev",
    },
    publisher: {
        "@type": "Organization",
        name: "SiteER",
        url: "https://siteer.dev",
    },
    isPartOf: {
        "@type": "Blog",
        name: "SiteER Resources",
        url: "https://siteer.dev/blog",
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "SiteER",
            item: "https://siteer.dev",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: "https://siteer.dev/blog",
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "Why Is My Website Not Bringing In Customers?",
            item: "https://siteer.dev/blog/website-not-bringing-customers",
        },
    ],
};

export default function Page() {
    return (
        <SiteChrome>
            <main className="er-page er-page-tight">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />

                <article className="mt-10">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7d88ff]">Conversion guide</p>
                    <h1 className="mt-2 text-4xl font-semibold text-balance text-white md:text-5xl">
                        Why Is My Website Not Bringing In Customers?
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-white/72">
                        When a site gets visits but not customers, the problem is usually not traffic. It is clarity, trust, friction, or the absence of a strong next step.
                    </p>

                    <section className="mt-8 grid gap-4 md:grid-cols-2">
                        {[
                            [
                                "Clarity",
                                "People should know what you do, who it is for, and why it matters in under ten seconds.",
                            ],
                            [
                                "Trust",
                                "Add proof close to the CTA: testimonials, logos, guarantees, or real numbers.",
                            ],
                            [
                                "Friction",
                                "Shorter forms, faster pages, and simpler navigation almost always help.",
                            ],
                            ["Offer strength", "If the offer sounds generic, it will not create urgency."],
                        ].map(([title, desc]) => (
                            <section key={title} className="er-link-card p-5">
                                <h2 className="text-lg font-semibold text-white">{title}</h2>
                                <p className="mt-2 text-sm text-white/68">{desc}</p>
                            </section>
                        ))}
                    </section>

                    <section className="mt-8 er-panel">
                        <h2 className="text-xl font-semibold text-white">A simple diagnostic sequence</h2>
                        <ol className="mt-4 space-y-2 text-sm text-white/68">
                            <li>1. Read the hero out loud. If it is vague, rewrite it.</li>
                            <li>2. Check the first CTA. If it is not obvious, tighten the offer.</li>
                            <li>3. Review the page on a phone. If the page feels crowded, simplify it.</li>
                            <li>4. Make sure there is a next step at every major scroll point.</li>
                        </ol>
                    </section>

                    <section className="mt-8 flex flex-wrap gap-3">
                        <a className="er-button-primary" href="/">
                            Scan the site
                        </a>
                        <a className="er-button-secondary" href="/get-quote">
                            Get help converting
                        </a>
                    </section>
                </article>
            </main>
        </SiteChrome>
    );
}
