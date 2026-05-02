import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "5 Website Mistakes That Cost Local Businesses the Most",
    description:
        "A practical guide to the five most common website issues that reduce leads for local businesses: mobile UX, trust signals, speed, offer clarity, and weak CTAs.",
    alternates: { canonical: "/blog/local-business-website-mistakes" },
    openGraph: {
        title: "5 Website Mistakes That Cost Local Businesses the Most",
        description:
            "Learn the five most common issues that quietly cost leads and how to fix them quickly.",
        url: "https://siteer.dev/blog/local-business-website-mistakes",
        siteName: "SiteER",
        type: "article",
    },
};

const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "5 Website Mistakes That Cost Local Businesses the Most",
    description: "A practical guide to the five most common website issues that reduce leads for local businesses: mobile UX, trust signals, speed, offer clarity, and weak CTAs.",
    image: "https://siteer.dev/og-image.png",
    datePublished: "2025-04-01",
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
            name: "5 Website Mistakes That Cost Local Businesses the Most",
            item: "https://siteer.dev/blog/local-business-website-mistakes",
        },
    ],
};

export default function Page() {
    return (
        <main className="mx-auto max-w-4xl px-5 py-8 md:px-8 md:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <header className="flex items-center justify-between gap-4">
                <a className="text-sm font-semibold tracking-tight" href="/blog">
                    SiteER <span className="text-black/45">/ Resources</span>
                </a>
                <a className="text-sm text-black/60 hover:text-black" href="/pricing">
                    Pricing
                </a>
            </header>

            <article className="mt-10">
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">Local SEO guide</p>
                <h1 className="mt-2 text-4xl font-semibold text-balance md:text-5xl">
                    5 Website Mistakes That Cost Local Businesses the Most
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-black/65">
                    Most local sites do not fail because of one huge problem. They leak leads through a stack of small issues: weak mobile usability, missing trust proof, slow pages, vague offers, and calls to action that do not tell people what to do next.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {[
                        ["Slow mobile first paint", "People on phones leave before the page becomes usable."],
                        ["No trust proof", "Visitors need reviews, contact details, and clear credibility cues."],
                        ["Vague offers", "If users do not understand the service, they do not convert."],
                        ["Weak CTA hierarchy", "Every page should make the next action obvious."],
                    ].map(([title, desc]) => (
                        <section key={title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-semibold">{title}</h2>
                            <p className="mt-2 text-sm text-black/65">{desc}</p>
                        </section>
                    ))}
                </div>

                <section className="mt-8 rounded-2xl border border-black/10 bg-slate-50 p-6">
                    <h2 className="text-xl font-semibold">What to fix first</h2>
                    <ol className="mt-4 space-y-2 text-sm text-black/65">
                        <li>1. Make the mobile hero simple, short, and easy to act on.</li>
                        <li>2. Add proof near the first CTA: reviews, logos, results, or numbers.</li>
                        <li>3. Cut page weight by removing unnecessary scripts and oversized media.</li>
                        <li>4. Add one clear action per page and repeat it near the footer.</li>
                    </ol>
                </section>

                <section className="mt-8 flex flex-wrap gap-3">
                    <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/">
                        Run a free scan
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/get-quote">
                        Get implementation help
                    </a>
                </section>

                <section className="mt-12 border-t border-black/10 pt-10">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-4">Related Reading</p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <a className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-sm transition-shadow" href="/blog/mobile-page-speed-fixes">
                            <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">Performance guide</p>
                            <h3 className="font-semibold">How to Fix Slow Mobile Pages in Under an Hour</h3>
                            <p className="mt-2 text-sm text-black/60">Fast wins for users on phones — the most impactful changes ranked by effort.</p>
                        </a>
                        <a className="rounded-2xl border border-black/10 bg-white p-5 hover:shadow-sm transition-shadow" href="/blog/website-not-bringing-customers">
                            <p className="text-xs font-bold uppercase tracking-wider text-black/40 mb-2">Conversion guide</p>
                            <h3 className="font-semibold">Why Is My Website Not Bringing In Customers?</h3>
                            <p className="mt-2 text-sm text-black/60">Traffic but no calls? Here's a simple diagnostic sequence.</p>
                        </a>
                    </div>
                </section>
            </article>
        </main>
    );
}
