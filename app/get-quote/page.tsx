import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SiteChrome from "@/components/SiteChrome";
import PageSignalBar from "@/components/PageSignalBar";
import { quickAuditOffer } from "@/lib/offers";
import { fixPackDepositOffer } from "@/lib/offers";
import {
    buildPageMetadata,
    buildPageStructuredData,
    buildServiceSchema,
} from "@/lib/siteSeo";
const QuoteForm = dynamic(() => import("@/components/QuoteForm"), { ssr: false, loading: () => null });

export const metadata: Metadata = buildPageMetadata({
    title: "Get a Fix Quote",
    description:
        `Request a SiteER implementation quote, pay the ${fixPackDepositOffer.priceLabel} deposit, and move directly into a Bakersfield-built website fix plan.`,
    path: "/get-quote",
    keywords: [
        "website fix quote",
        "Bakersfield web design quote",
        "website seo fix quote",
        "SiteER implementation",
    ],
});

const quoteFaqs = [
    {
        question: "Who should use the implementation quote form?",
        answer: "Use the quote form when you already know you want SiteER to do the work rather than handing the report to someone else.",
    },
    {
        question: "What happens after the $200 deposit?",
        answer: "The deposit reserves the work, gets applied to the final total, and triggers a follow-up with scope, scheduling, and the remaining balance.",
    },
    {
        question: "What if I only want advice and not implementation?",
        answer: "Run the free scan and unlock the $20 Quick ER Audit instead of booking the full implementation path.",
    },
] as const;

const structuredData = buildPageStructuredData({
    path: "/get-quote",
    title: "Get a SiteER Fix Quote",
    description: "Implementation quote and deposit path for local businesses that want SiteER to fix website speed, mobile, SEO, and trust issues.",
    breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Get a Fix Quote", path: "/get-quote" },
    ],
    faqs: quoteFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
    extras: [
        buildServiceSchema({
            path: "/get-quote",
            name: "SiteER ER Fix Pack",
            description: "Website repair and implementation service for local business sites that need speed, SEO, trust, and mobile fixes.",
            serviceType: "Website repair service",
        }),
    ],
});

export default function GetQuotePage() {
    return (
        <SiteChrome>
            <main className="er-page er-page-narrow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
                <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                    <div>
                        <p className="er-kicker">Implementation</p>
                        <h1 className="er-heading mt-3">
                            Need it fixed for you? Book the ER Fix Pack.
                        </h1>
                        <p className="er-copy mt-4">
                            No developer, no time, or no desire to manage the cleanup yourself? The SiteER team handles the highest-impact fixes, then re-scans the site to prove the improvement in real numbers.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="er-chip">{fixPackDepositOffer.priceLabel} deposit reserves the work</span>
                            <span className="er-chip">Deposit applied to the final total</span>
                            <span className="er-chip">20+ point grade guarantee</span>
                        </div>
                    </div>

                    <aside className="er-panel-accent">
                        <div className="er-kicker">What happens next</div>
                        <div className="mt-4 grid gap-4">
                            {[
                                ["1", "Submit the form", "Tell us who you are and which site needs treatment."],
                                ["2", `Pay the ${fixPackDepositOffer.priceLabel} deposit`, "We redirect you to secure Square checkout immediately after the form saves."],
                                ["3", "Get contacted within 1 business day", "You receive the implementation plan, scheduling details, and the remaining balance outline."],
                            ].map(([step, title, text]) => (
                                <div key={step} className="rounded-[20px] border border-white/12 bg-white/[0.05] p-4">
                                    <div className="text-xs font-black tracking-[0.18em] text-[#fff0d7]">STEP {step}</div>
                                    <h2 className="mt-2 text-lg font-semibold text-white">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-[#d6e2ee]">{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-[#fff0d7]">
                            Not ready for the full implementation? Run the free scan and unlock the {quickAuditOffer.priceLabel} {quickAuditOffer.name} from your report instead.
                        </p>
                        <a className="er-button-secondary mt-5 w-full" href="/#diagnosis">
                            Run free scan for the {quickAuditOffer.priceLabel} path
                        </a>
                    </aside>
                </section>

                <PageSignalBar
                    primaryCtaHref="/#diagnosis"
                    primaryCtaLabel="Run scan first"
                    secondaryCtaHref="/pricing"
                    secondaryCtaLabel="Compare paths"
                />

                <section className="mt-10 er-panel">
                    <div className="mb-6">
                        <p className="er-kicker">Reserve the work</p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            {fixPackDepositOffer.priceLabel} deposit today, applied to your final ER Fix Pack total.
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-[#c8d5e1]">
                            After you submit, you will be redirected to Square for the implementation deposit. The deposit is not extra. It is credited toward the project and secures the next slot.
                        </p>
                    </div>
                    <QuoteForm />
                </section>

                <section className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        ["Best fit", "You want the fixes done for you and do not want to manage screenshots, developer tasks, or back-and-forth prioritization."],
                        ["Maybe not yet", `If you still need to see the damage first, run the free scan and use the ${quickAuditOffer.priceLabel} audit as the lower-risk step.`],
                        ["What you get", "A direct handoff into scope, schedule, and the implementation plan after the deposit is paid."],
                    ].map(([title, text]) => (
                        <article key={title} className="er-link-card">
                            <h2 className="text-lg font-semibold text-white">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-[#c8d5e1]">{text}</p>
                        </article>
                    ))}
                </section>
            </main>
        </SiteChrome>
    );
}
