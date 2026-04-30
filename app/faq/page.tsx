import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
    title: "FAQ",
    description:
        "Answers to common questions about the SiteER diagnosis funnel, report delivery, pricing, and implementation.",
    alternates: {
        canonical: "/faq",
    },
    openGraph: {
        title: "FAQ | SiteER",
        description:
            "Answers to common questions about the diagnosis funnel and reports.",
        url: "https://siteer.dev/faq",
        siteName: "SiteER",
        type: "website",
    },
};

export default function FaqPage() {
    return (
        <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <a className="text-sm font-semibold tracking-tight" href="/#diagnosis">
                    SiteER <span className="text-black/45">/ FAQ</span>
                </a>
                <div className="flex flex-wrap items-center gap-4 text-sm text-black/60">
                    <a className="hover:text-black" href="/pricing">
                        Pricing
                    </a>
                    <a className="hover:text-black" href="/#diagnosis">
                        Run diagnosis
                    </a>
                </div>
            </header>

            <section className="mt-10 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">Questions</p>
                <h1 className="mt-2 text-4xl font-bold text-balance md:text-5xl">
                    Questions about SiteER? We've got answers.
                </h1>
                <p className="mt-4 text-lg text-black/65">
                    Find practical details about how the scan works, what you'll get, and what's next.
                </p>
            </section>

            <section className="mt-10">
                <FaqAccordion />
            </section>

            <section className="mt-12 grid gap-4 rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-semibold">Need the next step?</h2>
                    <p className="mt-2 text-sm text-black/65">
                        Run a scan on the homepage, then unlock the report with your email.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                    <a className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white" href="/#diagnosis">
                        Run a diagnosis
                    </a>
                    <a className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-black/5" href="/pricing">
                        View pricing
                    </a>
                </div>
            </section>
        </main>
    );
}
