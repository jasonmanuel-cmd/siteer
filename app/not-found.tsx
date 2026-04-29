import Link from "next/link";

export default function NotFound() {
    return (
        <main className="er-container flex min-h-screen items-center py-24">
            <section className="max-w-xl">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                    404 Not Found
                </div>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                    This page is not in critical condition. It just does not exist.
                </h1>
                <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--er-muted)]">
                    Return to the homepage to run a scan, review pricing, or request a fix quote.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/"
                        className="rounded-full bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-5 py-3 text-sm font-semibold text-[#19070a]"
                    >
                        Go home
                    </Link>
                    <Link
                        href="/pricing"
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                        View pricing
                    </Link>
                </div>
            </section>
        </main>
    );
}