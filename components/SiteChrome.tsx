import Link from "next/link";
import type { ReactNode } from "react";

type SiteChromeProps = {
    children: ReactNode;
};

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
];

export default function SiteChrome({ children }: SiteChromeProps) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(89,108,255,.18),_transparent_34%),radial-gradient(circle_at_right,_rgba(62,226,143,.12),_transparent_30%),linear-gradient(180deg,#071018_0%,#05080d_100%)] text-white">
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071018]/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
                    <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-white">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] text-[#19070a] shadow-[0_16px_36px_rgba(255,77,94,.22)]">
                            +
                        </span>
                        <span>SiteER</span>
                    </Link>
                    <nav className="hidden flex-wrap items-center gap-5 text-sm text-white/70 md:flex" aria-label="Primary navigation">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <Link
                        href="/#diagnosis"
                        className="rounded-full bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-4 py-2 text-sm font-semibold text-[#19070a] shadow-[0_16px_36px_rgba(255,77,94,.22)] transition-transform hover:-translate-y-0.5"
                    >
                        Scan a Site
                    </Link>
                </div>
            </header>

            <main>{children}</main>

            <footer className="border-t border-white/10 bg-[#05080d]">
                <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.5fr_1fr] md:px-8">
                    <div>
                        <div className="text-lg font-semibold tracking-tight text-white">SiteER</div>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                            Fast website diagnostics for speed, mobile usability, SEO, and trust signals. Built for businesses that want practical fixes, not vague advice.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/45 md:px-8">
                    © {new Date().getFullYear()} SiteER · Bakersfield, CA · COAIBAKERSFIELD.COM
                </div>
            </footer>
        </div>
    );
}