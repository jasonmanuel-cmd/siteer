import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { localGrowthPages, siteerCaseStudy } from "@/lib/localContent";

type SiteChromeProps = {
    children: ReactNode;
};

const navLinks = [
    { href: "/reports", label: "Reports" },
    { href: "/pricing", label: "Pricing" },
    { href: "/bakersfield-website-audit", label: "Bakersfield" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
];

const footerLinks = [
    { href: "/#diagnosis", label: "Run a free scan" },
    { href: "/reports", label: "Reports" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/bakersfield-website-audit", label: "Bakersfield audits" },
    ...localGrowthPages.map((page) => ({ href: page.href, label: page.label })),
    { href: siteerCaseStudy.href, label: siteerCaseStudy.label },
    { href: "/blog", label: "Blog" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
];

export default function SiteChrome({ children }: SiteChromeProps) {
    return (
        <div className="min-h-screen text-white">
            <div className="er-topline">
                <div className="er-container er-topline-inner">
                    <span>Bakersfield-built website triage for local businesses that need more calls, forms, and booked jobs.</span>
                    <div className="er-topline-links">
                        <a href="tel:6615694244">Call 661-569-4244</a>
                        <Link href="/get-quote">Book implementation</Link>
                    </div>
                </div>
            </div>
            <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div className="er-container">
                    <div style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-white" aria-label="SiteER home">
                        <Image
                            src="/siteer-logo.png"
                            alt="SiteER logo"
                            width={280}
                            height={80}
                            priority
                            style={{ width: "auto", height: 42 }}
                        />
                        </Link>
                        <nav className="hidden items-center gap-8 text-[1.05rem] text-[color:var(--er-muted)] md:flex" aria-label="Primary navigation">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="nav-link font-bold">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <details className="er-mobile-nav md:hidden">
                            <summary aria-label="Open navigation menu">
                                Menu
                            </summary>
                            <div className="er-mobile-nav-panel">
                                {navLinks.map((link) => (
                                    <Link key={link.href} href={link.href} className="er-mobile-nav-link">
                                        {link.label}
                                    </Link>
                                ))}
                                <Link href="/get-quote" className="er-mobile-nav-link">
                                    Implementation
                                </Link>
                                <a href="tel:6615694244" className="er-mobile-nav-link">
                                    Call Jason
                                </a>
                            </div>
                        </details>
                        <Link
                            href="/#diagnosis"
                            className="inline-flex min-h-[48px] items-center rounded-full bg-[linear-gradient(135deg,#ff4d5e,#ffb15c)] px-5 py-3 text-sm font-extrabold text-[#19070a] shadow-[0_18px_42px_rgba(255,77,94,.28)] max-md:hidden"
                        >
                            <span className="cta-word-dark">Run Free Scan →</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div>{children}</div>

            <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 0", color: "var(--er-muted-2)" }}>
                <div className="er-container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/" aria-label="SiteER home" style={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/siteer-logo.png"
                            alt="SiteER logo"
                            width={180}
                            height={50}
                            style={{ width: "auto", height: 30 }}
                        />
                    </Link>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                        {footerLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div style={{ fontSize: "0.85rem", textAlign: "right", lineHeight: 1.5 }}>
                        <div>© {new Date().getFullYear()} SiteER — The emergency room for sick websites.</div>
                        <div>
                            Built by{" "}
                            <a
                                href="https://coaibakersfield.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors underline"
                            >
                                Chaotically Organized AI
                            </a>
                            {" "}· Bakersfield, CA
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
