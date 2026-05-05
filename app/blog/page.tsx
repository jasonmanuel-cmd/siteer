import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

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
        <SiteChrome>
            <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
                <section className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ffb15c]">Resources</p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Practical fixes for speed, SEO, and conversion</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                        Short, useful guides for business owners who want more calls from the same traffic. Each article focuses on one problem, one diagnosis path, and one set of fixes.
                    </p>
                </section>

                <div className="mt-10 grid gap-4">
                    {posts.map((post) => (
                        <article
                            key={post.title}
                            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_60px_rgba(0,0,0,.22)] backdrop-blur"
                        >
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7d88ff]">Guide</p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{post.title}</h2>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68">{post.summary}</p>
                            <a
                                className="mt-5 inline-flex text-sm font-semibold text-[#ffb15c] underline decoration-[#ffb15c]/40 underline-offset-4"
                                href={post.href}
                            >
                                Read the guide
                            </a>
                        </article>
                    ))}
                </div>

                <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                    <h2 className="text-xl font-semibold tracking-tight text-white">Related actions</h2>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <a className="rounded-full border border-white/12 bg-white px-4 py-2 font-semibold text-[#090d12] transition-colors hover:bg-[#ffb15c]" href="/">
                            Run a free scan
                        </a>
                        <a className="rounded-full border border-white/12 bg-white px-4 py-2 font-semibold text-[#090d12] transition-colors hover:bg-[#ffb15c]" href="/pricing">
                            Review pricing
                        </a>
                        <a className="rounded-full border border-white/12 bg-white px-4 py-2 font-semibold text-[#090d12] transition-colors hover:bg-[#ffb15c]" href="/contact">
                            Contact Jason
                        </a>
                    </div>
                </section>
            </main>
        </SiteChrome>
    );
}
