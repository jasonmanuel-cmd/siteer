"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="er-container flex min-h-screen items-center py-24">
            <section className="max-w-xl rounded-[28px] border border-white/12 bg-white/6 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-red-400">
                    Something broke
                </div>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                    We hit a server or rendering issue.
                </h1>
                <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--er-muted)]">
                    Try loading the page again. If the issue persists, return home and retry the scan flow.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-full bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-5 py-3 text-sm font-semibold text-[#19070a]"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                    >
                        Back home
                    </Link>
                </div>
            </section>
        </main>
    );
}