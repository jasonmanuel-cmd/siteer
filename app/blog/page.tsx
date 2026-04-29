import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resources",
    description:
        "SiteER resources and guides for improving website speed, SEO performance, trust signals, and conversion results.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Resources | SiteER",
        description:
            "Practical guides for fixing website speed, SEO, trust, and conversion issues.",
        url: "https://siteer.dev/blog",
        siteName: "SiteER",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SiteER resources preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Resources | SiteER",
        description:
            "Practical guides for fixing website speed, SEO, trust, and conversion issues.",
        images: ["/og-image.png"],
    },
};

const posts = [
    {
        href: "/blog/local-business-website-mistakes",
        title: "5 Website Mistakes That Cost Local Businesses the Most",
        summary:
            "How weak mobile UX, missing trust proof, and broken CTAs quietly cut lead volume.",
    },
    {
        href: "/blog/mobile-page-speed-fixes",
        title: "How to Fix Slow Mobile Pages in Under an Hour",
        summary:
            "A practical speed-first checklist for business owners and small teams.",
    },
    {
        href: "/blog/website-not-bringing-customers",
        title: "Why Is My Website Not Bringing In Customers?",
        summary:
            "A non-technical diagnostic framework to spot and fix conversion leaks fast.",
    },
];

export default function BlogPage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
            <header className="flex items-center justify-between gap-4">
                <a className="text-sm font-semibold tracking-tight" href="/">
                    SiteER <span className="text-black/45">/ Resources</span>
                </a>
                <div className="flex items-center gap-4">
                    <a className="text-sm text-black/60 hover:text-black" href="/pricing">
                        Pricing
                    </a>
                    <a className="text-sm text-black/60 hover:text-black" href="/">
                        Free scan
                    </a>
                </div>
            </header>

            <h1 className="mt-10 text-4xl font-semibold">Resources</h1>
            <p className="mt-2 max-w-2xl text-black/65">
                Content for business owners who want more leads from the same traffic.
            </p>

            <div className="mt-8 space-y-4">
                {posts.map((post) => (
                    <article
                        key={post.title}
                        className="rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="mt-2 text-sm text-black/65">{post.summary}</p>
                        <a
                            className="mt-4 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-2"
                            href={post.href}
                        >
                            Read the guide
                        </a>
                    </article>
                ))}
            </div>

            <section className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <h2 className="text-xl font-semibold">Related actions</h2>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <a className="rounded-full border border-black/10 bg-white px-4 py-2 font-semibold text-black hover:bg-black/5" href="/">
                        Run a free scan
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-4 py-2 font-semibold text-black hover:bg-black/5" href="/pricing">
                        Review pricing
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-4 py-2 font-semibold text-black hover:bg-black/5" href="/get-quote">
                        Get a quote
                    </a>
                </div>
            </section>
        </main>
    );
}
