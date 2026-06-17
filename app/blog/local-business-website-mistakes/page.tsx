import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/siteSeo";

export const metadata: Metadata = {
    title: "5 Website Mistakes That Cost Local Businesses the Most",
    description:
        "A practical guide to the five most common website issues that reduce leads for local businesses: mobile UX, trust signals, speed, offer clarity, and weak CTAs.",
    alternates: { canonical: "/blog/local-business-website-mistakes" },
    openGraph: {
        title: "5 Website Mistakes That Cost Local Businesses the Most",
        description:
            "Learn the five most common issues that quietly cost leads and how to fix them quickly.",
        url: `${SITE_URL}/blog/local-business-website-mistakes`,
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "5 Website Mistakes That Cost Local Businesses the Most",
    description: "A practical guide to the five most common website issues that reduce leads for local businesses: mobile UX, trust signals, speed, offer clarity, and weak CTAs.",
    image: `${SITE_URL}/og-image.png`,
    datePublished: "2025-04-01",
    dateModified: "2025-04-25",
    author: {
        "@type": "Organization",
        name: "SiteER",
        url: SITE_URL,
    },
    publisher: {
        "@type": "Organization",
        name: "SiteER",
        url: SITE_URL,
    },
    isPartOf: {
        "@type": "Blog",
        name: "SiteER Resources",
        url: `${SITE_URL}/blog`,
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
            item: SITE_URL,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: `${SITE_URL}/blog`,
        },
        {
            "@type": "ListItem",
            position: 3,
            name: "5 Website Mistakes That Cost Local Businesses the Most",
            item: `${SITE_URL}/blog/local-business-website-mistakes`,
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
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb15c]">Local SEO guide</p>
                    <h1 className="mt-2 text-4xl font-semibold text-balance text-white md:text-5xl">
                        5 Website Mistakes That Cost Local Businesses the Most
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-white/72">
                        Most local sites do not fail because of one huge problem. They leak leads through a stack of small issues: weak mobile usability, missing trust proof, slow pages, vague offers, and calls to action that do not tell people what to do next.
                    </p>

                    <section className="mt-8 grid gap-4 md:grid-cols-2">
                        {[
                            ["Slow mobile first paint", "People on phones leave before the page becomes usable."],
                            ["No trust proof", "Visitors need reviews, contact details, and clear credibility cues."],
                            ["Vague offers", "If users do not understand the service, they do not convert."],
                            ["Weak CTAs", "Make actions explicit and repeat them near the footer."],
                        ].map(([title, desc]) => (
                            <section key={title} className="er-link-card p-5">
                                <h2 className="text-lg font-semibold text-white">{title}</h2>
                                <p className="mt-2 text-sm text-white/68">{desc}</p>
                            </section>
                        ))}
                    </section>

                    <section className="mt-8 er-panel">
                        <h2 className="text-xl font-semibold text-white">What to fix first</h2>
                        <ol className="mt-4 space-y-2 text-sm text-white/68">
                            <li>1. Make the mobile hero simple, short, and easy to act on.</li>
                            <li>2. Add proof near the first CTA: reviews, logos, results, or numbers.</li>
                            <li>3. Cut page weight by removing unnecessary scripts and oversized media.</li>
                            <li>4. Add one clear action per page and repeat it near the footer.</li>
                        </ol>
                    </section>

                    <section className="mt-8 flex flex-wrap gap-3">
                        <a className="er-button-primary" href="/">
                            Run a free scan
                        </a>
                        <a className="er-button-secondary" href="/contact">
                            Ask for help
                        </a>
                        <a className="er-button-secondary" href="/get-quote">
                            Get implementation help
                        </a>
                    </section>

                    <section className="mt-12 border-t border-white/10 pt-10">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffb15c] mb-4">Related Reading</p>
                    </section>
                </article>
            </main>
        </SiteChrome>
    );
}
