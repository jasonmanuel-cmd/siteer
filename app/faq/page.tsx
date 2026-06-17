import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import FaqAccordion from "@/components/FaqAccordion";
import { quickAuditOffer } from "@/lib/offers";

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
        <SiteChrome>
            <main className="er-page er-page-narrow">
                <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                    <div>
                        <p className="er-kicker">FAQ</p>
                        <h1 className="er-heading mt-3">
                            Questions about SiteER? We&apos;ve got answers.
                        </h1>
                        <p className="er-copy mt-4">
                            This page exists to remove hesitation, not bury you in policy copy. If you want the practical version of how the scan, the report, the {quickAuditOffer.priceLabel} audit, and the Fix Pack work, start here.
                        </p>
                    </div>

                    <aside className="er-panel">
                        <div className="er-kicker">Fast answers</div>
                        <div className="mt-4 grid gap-3">
                            {[
                                "The scan takes about 60 seconds.",
                                "Any public website works, including Wix, Shopify, and Webflow.",
                                "Your report stays private and can be shared with your developer.",
                                `${quickAuditOffer.priceLabel} human review is optional, not forced.`,
                            ].map((item) => (
                                <div key={item} className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-[#d5e0ea]">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>

                <section className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <FaqAccordion />
                    </div>

                    <aside className="grid gap-5">
                        <div className="er-panel">
                            <div className="er-kicker">Start here if you are unsure</div>
                            <h2 className="mt-3 text-2xl font-semibold text-white">Do the free scan first.</h2>
                            <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">
                                It gives you the only answer that matters: is the site mildly off, or is it quietly bleeding money every month?
                            </p>
                            <a className="er-button-primary mt-5 w-full" href="/#diagnosis">
                                Run Free Scan →
                            </a>
                        </div>

                        <div className="er-panel">
                            <div className="er-kicker">Need a human next step?</div>
                            <h2 className="mt-3 text-2xl font-semibold text-white">{quickAuditOffer.name}</h2>
                            <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">
                                If the numbers scare you but you are not ready for the full fix package, buy the {quickAuditOffer.priceLabel} audit from your private report and get plain-English next moves.
                            </p>
                            <a className="er-button-secondary mt-5 w-full" href="/pricing">
                                See pricing
                            </a>
                        </div>
                    </aside>
                </section>

                <section className="mt-12 er-panel-accent">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="er-kicker">Still deciding?</p>
                            <h2 className="mt-3 text-3xl font-semibold text-white">Run the scan, then decide with real numbers.</h2>
                            <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#fff0d7]">
                                Most objections disappear once the owner sees the grade, the leak estimate, and the top symptoms in one screen.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a className="er-button-primary" href="/#diagnosis">Run Free Scan →</a>
                            <a className="er-button-secondary" href="/reports">See what the report looks like</a>
                        </div>
                    </div>
                </section>
            </main>
        </SiteChrome>
    );
}
