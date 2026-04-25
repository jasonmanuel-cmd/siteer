export default function PricingPage() {
    return (
        <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <a className="text-sm font-semibold tracking-tight" href="/">
                    SiteER <span className="text-black/45">/ Pricing</span>
                </a>
                <a className="text-sm text-black/60 hover:text-black" href="/">
                    Run a scan
                </a>
            </header>

            <section className="mt-10">
                <h1 className="text-4xl font-semibold md:text-5xl">Stop the bleeding.</h1>
                <p className="mt-3 max-w-2xl text-black/65">
                    SiteER diagnosis is free. Pay only when you want implementation, deeper review,
                    or ongoing monitoring. All fixes are handled by the team at{" "}
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-red-600 hover:underline"
                    >
                        COAIBAKERSFIELD.COM
                    </a>.
                </p>
            </section>

            <section className="mt-10 grid gap-5 md:grid-cols-3">
                {/* Free */}
                <article className="rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-black/55">
                        Free ER Scan
                    </h2>
                    <p className="mt-2 text-3xl font-semibold">$0</p>
                    <ul className="mt-4 space-y-2 text-sm text-black/65">
                        <li>Grade your site (A-F)</li>
                        <li>Money leak estimate</li>
                        <li>Top issues and treatment plan</li>
                        <li>Shareable report link</li>
                    </ul>
                    <a
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white"
                        href="/"
                    >
                        Start free scan
                    </a>
                </article>

                {/* Fix Pack */}
                <article className="rounded-2xl border border-red-300 bg-gradient-to-b from-red-700 to-red-800 p-6 text-white shadow-[0_18px_45px_-22px_rgba(153,27,27,0.75)]">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-red-100">
                        ER Fix Pack
                    </h2>
                    <p className="mt-2 text-3xl font-semibold">$450–$1,500</p>
                    <p className="mt-2 text-sm text-red-100/90">
                        The{" "}
                        <a
                            href="https://coaibakersfield.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline decoration-red-300"
                        >
                            COAIBAKERSFIELD.COM
                        </a>{" "}
                        team implements your highest-impact fixes and re-scans to prove results.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-red-100">
                        <li>Speed + mobile fixes</li>
                        <li>CTA and trust improvements</li>
                        <li>SEO fundamentals cleanup</li>
                        <li>Before/after change summary</li>
                    </ul>
                    <a
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors"
                        href="/get-quote"
                    >
                        Get a quote
                    </a>
                </article>

                {/* Deep ER Report */}
                <article className="rounded-2xl border border-black/10 bg-white/90 p-6 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-black/55">
                        Deep ER Report
                    </h2>
                    <p className="mt-2 text-3xl font-semibold">$49</p>
                    <p className="mt-2 text-sm text-black/65">
                        Human review by{" "}
                        <a
                            href="https://coaibakersfield.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-red-600 hover:underline"
                        >
                            COAIBAKERSFIELD.COM
                        </a>{" "}
                        layered on top of your automated scan.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-black/65">
                        <li>30-60 minute manual review</li>
                        <li>Copy and offer clarity notes</li>
                        <li>Local SEO quick wins</li>
                        <li>PDF report delivered</li>
                    </ul>
                    <p className="mt-6 text-xs text-black/50">
                        Run a free scan first, then purchase the Deep ER Report from your results page.
                    </p>
                    <a
                        className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5 transition-colors"
                        href="/"
                    >
                        Scan your site first →
                    </a>
                </article>
            </section>

            {/* COAIBAKERSFIELD banner */}
            <section className="mt-12 rounded-2xl border border-slate-100 bg-slate-50 p-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-red-600">Implemented by</div>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">COAIBAKERSFIELD.COM</h2>
                        <p className="mt-2 max-w-lg text-sm text-slate-600">
                            AI-powered web solutions based in Bakersfield, CA. We don't just diagnose — we fix,
                            verify, and report back. Every ER Fix Pack comes with a before/after re-scan so you
                            can see the improvement in real numbers.
                        </p>
                    </div>
                    <a
                        href="https://coaibakersfield.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                    >
                        Visit COAIBAKERSFIELD.COM →
                    </a>
                </div>
            </section>

            <footer className="mt-12 border-t border-slate-100 pt-8 text-xs text-slate-400">
                © {new Date().getFullYear()} SiteER — Fixes implemented by{" "}
                <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-500 hover:text-red-600">
                    COAIBAKERSFIELD.COM
                </a>
            </footer>
        </main>
    );
}
