import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/siteSeo";

export const metadata: Metadata = {
    title: "How to Fix Slow Mobile Pages in Under an Hour",
    description:
        "A practical mobile speed checklist for business owners who need a faster page without waiting on a full redesign.",
    alternates: { canonical: "/blog/mobile-page-speed-fixes" },
    openGraph: {
        title: "How to Fix Slow Mobile Pages in Under an Hour",
        description: "A speed-first checklist for faster mobile landing pages.",
        url: `${SITE_URL}/blog/mobile-page-speed-fixes`,
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Fix Slow Mobile Pages in Under an Hour",
    description: "A practical mobile speed checklist for business owners who need a faster page without waiting on a full redesign.",
    image: `${SITE_URL}/og-image.png`,
    datePublished: "2025-04-05",
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
            name: "How to Fix Slow Mobile Pages in Under an Hour",
            item: `${SITE_URL}/blog/mobile-page-speed-fixes`,
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
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7d88ff]">Performance guide</p>
                <h1 className="mt-2 text-4xl font-semibold text-balance text-white md:text-5xl">
                    How to Fix Slow Mobile Pages in Under an Hour
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-white/72">
                    Mobile performance is usually a few repeatable issues: oversized images, too much JavaScript, layout shifts, and a hero section that asks the browser to do too much too early.
                </p>

                <section className="mt-8 er-panel">
                    <h2 className="text-xl font-semibold text-white">Fast wins</h2>
                    <ul className="mt-4 space-y-2 text-sm text-white/68">
                        <li>1. Compress the biggest images and convert them to AVIF/WebP.</li>
                        <li>2. Delay non-essential scripts until after the first visible paint.</li>
                        <li>3. Use a single CTA in the hero and keep the form short.</li>
                        <li>4. Remove layout jumps by giving media and cards fixed dimensions.</li>
                        <li>5. Keep the page layout column-based on narrow screens.</li>
                    </ul>
                </section>

                <section className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                        ["Image hygiene", "The biggest wins often come from shrinking hero media and replacing unnecessary screenshots."],
                        ["Script hygiene", "Client-side code should be reserved for the parts of the page that truly need it."],
                        ["Spacing hygiene", "Avoid massive vertical gaps that push conversion elements below the fold on phones."],
                        ["CTA hygiene", "Make the call to action visible without scrolling or pinching."],
                    ].map(([title, desc]) => (
                        <section key={title} className="er-link-card p-5">
                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                            <p className="mt-2 text-sm text-white/68">{desc}</p>
                        </section>
                    ))}
                </section>

                <section className="mt-8 flex flex-wrap gap-3">
                        <a className="er-button-primary" href="/">
                            Test your page
                    </a>
                        <a className="er-button-secondary" href="/contact">
                            Ask for a speed fix
                    </a>
                </section>
            </article>
        </main>
        </SiteChrome>
    );
}
