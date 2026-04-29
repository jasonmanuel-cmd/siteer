import type { Metadata } from "next";
import dynamic from "next/dynamic";
const SplashIntro = dynamic(() => import("@/components/SplashIntro"), { ssr: false, loading: () => null });
const HeroUrlInput = dynamic(() => import("@/components/HeroUrlInput"), { ssr: false, loading: () => null });
const UrlScanForm = dynamic(() => import("@/components/UrlScanForm"), { ssr: false, loading: () => null });
import Image from "next/image";

const BASE_URL = "https://siteer.dev";

const faqEntities = [
    {
        question: "Who is SiteER for?",
        answer: "SiteER is for small business owners, agencies, consultants, and operators who want fast website diagnostics without a long technical audit.",
    },
    {
        question: "What does the email gate do?",
        answer: "The email gate turns an anonymous scan into a lead, generates a unique report link, stores the record, and sends the shareable report URL.",
    },
    {
        question: "How is money leak calculated?",
        answer: "The estimate combines scan score with optional business inputs like monthly visitors, conversion rate, and average order value.",
    },
    {
        question: "What should the brand feel like?",
        answer: "Urgent but trustworthy: medical triage language, red/orange accents, clear scores, and business-impact messaging.",
    },
];

const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${BASE_URL}/#org`,
            name: "SiteER",
            url: BASE_URL,
            logo: `${BASE_URL}/siteer-logo.png`,
            sameAs: ["https://coaibakersfield.com"],
        },
        {
            "@type": "ProfessionalService",
            "@id": `${BASE_URL}/#service`,
            name: "SiteER",
            url: BASE_URL,
            areaServed: [
                { "@type": "City", name: "Bakersfield" },
                { "@type": "AdministrativeArea", name: "California" },
                { "@type": "Country", name: "United States" },
            ],
            geo: {
                "@type": "GeoCoordinates",
                latitude: 35.3733,
                longitude: -119.0187,
            },
            serviceType: ["Website Audit", "SEO Audit", "Performance Optimization"],
            provider: { "@id": `${BASE_URL}/#org` },
        },
        {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            name: "SiteER",
            url: BASE_URL,
            inLanguage: "en-US",
        },
        {
            "@type": "FAQPage",
            "@id": `${BASE_URL}/#faq`,
            mainEntity: faqEntities.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        },
    ],
};

export const metadata: Metadata = {
    title: "Website Audit Tool for SEO, Performance, and Trust Signals",
    description:
        "SiteER gives businesses an instant website ER scan for SEO, speed, mobile, and trust issues with an actionable treatment plan and revenue-leak estimate.",
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return (
        <>
            <SplashIntro />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            {/* ── NAV ── */}
            <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                <div className="er-container">
                    <nav style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }} aria-label="SiteER home">
                            <Image
                                src="/siteer-logo.png"
                                alt="SiteER logo"
                                width={280}
                                height={80}
                                priority
                                style={{ width: "auto", height: 42 }}
                            />
                        </a>
                        <div style={{ display: "flex", gap: 28, alignItems: "center", color: "var(--er-muted)", fontSize: "0.95rem" }}>
                            <a href="#diagnose" className="hover:text-white transition-colors">Diagnostics</a>
                            <a href="/reports" className="hover:text-white transition-colors">Reports</a>
                            <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
                            <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <a href="/pricing" style={{ border: "1px solid rgba(255,255,255,.13)", borderRadius: 999, padding: "13px 19px", fontWeight: 800, color: "white", background: "rgba(255,255,255,.08)", fontSize: "0.9rem" }}>
                                See <span className="cta-word">pricing</span>
                            </a>
                            <a href="#diagnosis" style={{ border: 0, borderRadius: 999, padding: "13px 19px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.9rem" }}>
                                <span className="cta-word-dark">Scan</span> a site
                            </a>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                {/* ── HERO ── */}
                <section style={{ padding: "82px 0 58px" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
                        <div>
                            <div style={{ width: "fit-content", display: "flex", alignItems: "center", gap: 10, color: "#ffd9de", fontWeight: 800, fontSize: "0.88rem", background: "rgba(255,77,94,.12)", border: "1px solid rgba(255,77,94,.22)", borderRadius: 999, padding: "9px 13px", marginBottom: 22 }}>
                                <span className="pulse-dot" style={{ width: 9, height: 9, borderRadius: 99, background: "var(--er-red)" }} />
                                Automated website triage in under 60 seconds
                            </div>
                            <h1 style={{ fontSize: "clamp(3rem, 7vw, 6.45rem)", lineHeight: 0.92, letterSpacing: "-.075em", maxWidth: 850 }}>
                                The <span className="cta-word">emergency room</span> for{" "}
                                <span style={{ background: "linear-gradient(135deg, #ffffff 15%, #ffb6bf 48%, #ffb15c 78%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                                    sick websites.
                                </span>
                            </h1>
                            <p style={{ marginTop: 24, color: "var(--er-muted)", fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", lineHeight: 1.75, maxWidth: 650 }}>
                                Paste any URL and SiteER instantly finds broken performance, mobile, SEO, and trust signals — then translates the damage into a plain-English grade and estimated monthly revenue leak.
                            </p>
                            <HeroUrlInput />
                            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 14, color: "var(--er-muted-2)", fontSize: "0.92rem" }}>
                                {["No install required", "Grade + top issues free", "Shareable full report by email"].map((item) => (
                                    <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Browser mockup */}
                        <div style={{ position: "relative", minHeight: 520, maxWidth: 620, width: "100%", justifySelf: "end" }}>
                            <div style={{ borderRadius: 34, padding: 18, background: "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.055))", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 34px 100px rgba(0,0,0,.42)", overflow: "hidden" }}>
                                <div style={{ borderRadius: 24, overflow: "hidden", background: "#08111a", border: "1px solid rgba(255,255,255,.12)" }}>
                                    <div style={{ height: 48, background: "rgba(255,255,255,.055)", display: "flex", alignItems: "center", gap: 9, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                                        {["#ff6171", "#ffc05f", "#4ee997"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
                                        <span style={{ marginLeft: 10, color: "var(--er-muted-2)", fontSize: "0.84rem", background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 999, padding: "7px 12px" }}>siteer.dev/diagnosis/critical-care</span>
                                    </div>
                                    <div style={{ padding: 22 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                            <div>
                                                <h3 style={{ fontSize: "1.1rem" }}>Website ER Chart</h3>
                                                <p style={{ color: "var(--er-muted)", fontSize: "0.88rem", marginTop: 4 }}>Scan completed 38s ago · 21 checks</p>
                                            </div>
                                            <div style={{ minWidth: 80, height: 80, borderRadius: 22, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(255,77,94,.95), rgba(255,177,92,.95))", color: "#1b080a", fontSize: "3rem", fontWeight: 950, letterSpacing: "-.08em" }}>D</div>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
                                            {[["Speed","42"],["Mobile","58"],["SEO","63"],["Trust","71"]].map(([label, val]) => (
                                                <div key={label} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.09)", borderRadius: 14, padding: 10 }}>
                                                    <span style={{ color: "var(--er-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 800 }}>{label}</span>
                                                    <strong style={{ display: "block", marginTop: 5, fontSize: "1.2rem" }}>{val}</strong>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: "grid", gap: 9 }}>
                                            {[["Speed",42],["Mobile",58],["SEO",63],["Trust",71]].map(([label, val]) => (
                                                <div key={label as string} style={{ display: "grid", gridTemplateColumns: "60px 1fr 36px", alignItems: "center", gap: 10, color: "var(--er-muted)", fontSize: "0.85rem" }}>
                                                    <span>{label}</span>
                                                    <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                                                        <div style={{ height: "100%", borderRadius: 999, background: (val as number) >= 70 ? "linear-gradient(90deg, var(--er-green), var(--er-cyan))" : (val as number) >= 55 ? "linear-gradient(90deg, var(--er-orange), #ffe081)" : "linear-gradient(90deg, var(--er-red), var(--er-orange))", width: `${val}%` }} />
                                                    </div>
                                                    <span>{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ position: "absolute", bottom: 46, left: -32, width: 228, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Estimated money leak</span>
                                <strong style={{ color: "#ffcad0", fontSize: "2.15rem", letterSpacing: "-.06em" }}>$4,820/mo</strong>
                            </div>
                            <div style={{ position: "absolute", top: 86, right: -22, width: 210, borderRadius: 22, padding: 16, background: "rgba(9,20,31,.86)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 70px rgba(0,0,0,.36)" }}>
                                <span style={{ display: "block", color: "var(--er-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: ".09em", fontWeight: 850, marginBottom: 7 }}>Critical symptoms</span>
                                <strong>7 issues need attention</strong>
                                <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.08)", overflow: "hidden", marginTop: 12 }}>
                                    <div style={{ width: "74%", height: "100%", background: "linear-gradient(90deg, var(--er-red), var(--er-orange))", borderRadius: 999 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FEATURES ── */}
                <section id="diagnose" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>The diagnostic engine</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em", maxWidth: 780 }}>
                                    Everything a business owner needs to know, without the technical fog.
                                </h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                SiteER fetches the page, runs 20+ automated checks, weights every issue by severity, and turns website problems into an action plan.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { icon: "⚡", color: "rgba(255,77,94,.13)", textColor: "#ff8792", title: "Speed triage", desc: "Flags oversized pages, missing compression, unoptimized images, and lazy-loading gaps that slow visitors down." },
                                { icon: "📱", color: "rgba(110,231,255,.12)", textColor: "var(--er-cyan)", title: "Mobile health", desc: "Checks viewport setup, readable font sizes, and touch target problems that make mobile users bounce." },
                                { icon: "🔎", color: "rgba(183,140,255,.13)", textColor: "var(--er-purple)", title: "SEO vitals", desc: "Reviews H1 usage, title length, meta descriptions, Open Graph tags, robots.txt, and sitemap signals." },
                                { icon: "🛡", color: "rgba(62,226,143,.12)", textColor: "var(--er-green)", title: "Trust signals", desc: "Surfaces HTTPS, security header, and contact information gaps that make customers hesitate." },
                            ].map((card) => (
                                <article key={card.title} style={{ borderRadius: 24, padding: 24, background: "var(--er-card)", border: "1px solid var(--er-stroke)", boxShadow: "0 20px 60px rgba(0,0,0,.16)", minHeight: 250, transition: "transform .2s ease, background .2s ease" }}
                                    className="hover:-translate-y-1">
                                    <div style={{ width: 48, height: 48, display: "grid", placeItems: "center", borderRadius: 17, marginBottom: 18, background: card.color, color: card.textColor, fontSize: "1.35rem" }}>{card.icon}</div>
                                    <h3 style={{ fontSize: "1.22rem", letterSpacing: "-.03em", marginBottom: 10 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.96rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SCAN DEMO ── */}
                <section id="diagnosis" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Try the flow</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Run a real <span className="cta-word">ER scan</span>.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                This is the live product: URL in, triage checks, teaser report, then an email gate for the full shareable report.
                            </p>
                        </div>
                        <UrlScanForm />
                    </div>
                </section>

                {/* ── WORKFLOW ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ marginBottom: 34 }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>How it works</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Built for instant diagnosis and lead capture.</h2>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, counterReset: "workflow" }}>
                            {[
                                { title: "Fetch", desc: "Downloads the page HTML with a 12-second timeout, bot user-agent, and redirect following." },
                                { title: "Analyze", desc: "Parses the HTML to inspect speed, mobile, SEO, trust, and technical signals across 20+ checks." },
                                { title: "Score", desc: "Weights each issue by severity and category to create an A–F grade customers understand instantly." },
                                { title: "Convert", desc: "Shows a free teaser first, then gates the full permanent report behind email capture." },
                            ].map((card, i) => (
                                <article key={card.title} style={{ position: "relative", borderRadius: 24, padding: 24, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)", minHeight: 210 }}>
                                    <div style={{ display: "inline-flex", marginBottom: 28, color: "#071018", background: "linear-gradient(135deg, var(--er-cyan), var(--er-green))", borderRadius: 999, padding: "6px 10px", fontSize: "0.78rem", fontWeight: 950 }}>
                                        0{i + 1}
                                    </div>
                                    <h3 style={{ fontSize: "1.14rem", marginBottom: 9 }}>{card.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.94rem" }}>{card.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── NEXT STEPS ── */}
                <section style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Next steps</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>The other pages live behind the diagnosis.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                Use the homepage to start the scan, then move to the reports, pricing, and FAQ pages only when the user is ready.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                            {[
                                { title: "Reports", desc: "See what the shareable report includes after the scan.", href: "/reports" },
                                { title: "Pricing", desc: "Compare free diagnosis, implementation, and manual review.", href: "/pricing" },
                                { title: "FAQ", desc: "Answer common questions without distracting from the funnel.", href: "/faq" },
                                { title: "Blog", desc: "Read the content cluster that supports the homepage.", href: "/blog" },
                            ].map((item) => (
                                <article key={item.title} style={{ borderRadius: 24, padding: 22, background: "rgba(255,255,255,.065)", border: "1px solid rgba(255,255,255,.13)" }}>
                                    <h3 style={{ fontSize: "1.1rem", letterSpacing: "-.03em", marginBottom: 10 }}>{item.title}</h3>
                                    <p style={{ color: "var(--er-muted)", lineHeight: 1.65, fontSize: "0.95rem" }}>{item.desc}</p>
                                    <a href={item.href} className="mt-4 inline-flex text-sm font-semibold text-white underline decoration-red-300 underline-offset-4">
                                        Open page
                                    </a>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 0", color: "var(--er-muted-2)" }}>
                <div className="er-container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                    <a href="/" aria-label="SiteER home" style={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/siteer-logo.png"
                            alt="SiteER logo"
                            width={180}
                            height={50}
                            style={{ width: "auto", height: 30 }}
                        />
                    </a>
                    <div>© {new Date().getFullYear()} SiteER. The emergency room for sick websites.</div>
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                        <a href="#diagnosis" className="hover:text-white transition-colors">Diagnostics</a>
                        <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Agreement</a>
                        <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Powered by COAIBAKERSFIELD.COM</a>
                        <a href="mailto:hello@siteer.dev" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
