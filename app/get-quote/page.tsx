import QuoteForm from "@/components/QuoteForm";

export const metadata = { title: "Get a Fix Quote — SiteER" };

export default function GetQuotePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white px-5 py-8 md:px-8 md:py-12">
            <header className="mx-auto max-w-2xl flex flex-wrap items-center justify-between gap-4">
                <a className="group flex items-center gap-2 text-sm font-semibold tracking-tight" href="/">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-200">
                        <span className="text-lg font-bold">+</span>
                    </div>
                    SiteER
                </a>
                <a className="text-sm text-black/50 hover:text-red-600 transition-colors" href="/pricing">
                    Pricing
                </a>
            </header>

            <section className="mx-auto mt-12 max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-red-200 bg-white px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-red-600 shadow-sm">
                    ER Fix Pack — Starting at $450
                </div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                    Let's fix what's costing you money.
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                    The team at{" "}
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        COAIBAKERSFIELD.COM
                    </a>{" "}
                    implements your highest-impact fixes and re-scans your site to prove the improvement.
                    Fill out the form below and we'll send a custom quote within 1 business day.
                </p>

                <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        Speed + mobile fixes
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        CTA and trust improvements
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        Before/after re-scan included
                    </span>
                </div>
            </section>

            <section className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
                <QuoteForm />
            </section>

            <footer className="mx-auto mt-12 max-w-2xl border-t border-slate-100 pt-6 text-xs text-slate-400">
                <p>
                    SiteER diagnostics powered by{" "}
                    <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-500 hover:text-red-600">
                        COAIBAKERSFIELD.COM
                    </a>
                    {" "}— AI-powered web solutions in Bakersfield, CA.
                </p>
            </footer>
        </main>
    );
}
