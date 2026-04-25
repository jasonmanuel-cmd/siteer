import HeroUrlInput from "@/components/HeroUrlInput";
import UrlScanForm from "@/components/UrlScanForm";
import FaqAccordion from "@/components/FaqAccordion";
import SplashIntro from "@/components/SplashIntro";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <SplashIntro />
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
                            <a href="#report" className="hover:text-white transition-colors">Report</a>
                            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <a href="#pricing" style={{ border: "1px solid rgba(255,255,255,.13)", borderRadius: 999, padding: "13px 19px", fontWeight: 800, color: "white", background: "rgba(255,255,255,.08)", fontSize: "0.9rem" }}>
                                See <span className="cta-word">pricing</span>
                            </a>
                            <a href="#scan" style={{ border: 0, borderRadius: 999, padding: "13px 19px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.9rem" }}>
                                <span className="cta-word-dark">Scan</span> a site
                            </a>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                {/* ── HERO ── */}
                <section style={{ padding: "82px 0 58px" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: "1.02fr .98fr", gap: 48, alignItems: "center" }}>
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
                        <div style={{ position: "relative", minHeight: 520 }}>
                            <div style={{ borderRadius: 34, padding: 18, background: "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.055))", border: "1px solid rgba(255,255,255,.18)", boxShadow: "0 34px 100px rgba(0,0,0,.42)", overflow: "hidden" }}>
                                <div style={{ borderRadius: 24, overflow: "hidden", background: "#08111a", border: "1px solid rgba(255,255,255,.12)" }}>
                                    <div style={{ height: 48, background: "rgba(255,255,255,.055)", display: "flex", alignItems: "center", gap: 9, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
                                        {["#ff6171", "#ffc05f", "#4ee997"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
                                        <span style={{ marginLeft: 10, color: "var(--er-muted-2)", fontSize: "0.84rem", background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 999, padding: "7px 12px" }}>siteer.app/scan/critical-care</span>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
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
                <section id="scan" style={{ padding: "82px 0" }}>
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
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, counterReset: "workflow" }}>
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

                {/* ── REPORT SECTION ── */}
                <section id="report" style={{ padding: "82px 0", background: "linear-gradient(180deg, transparent, rgba(255,255,255,.035), transparent)" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: ".82fr 1.18fr", gap: 28, alignItems: "center" }}>
                        <div>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>The report page</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>A shareable treatment plan, not a vague audit.</h2>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, fontSize: "1.04rem", marginTop: 18 }}>
                                Every scan gets a permanent report URL with the overall grade, category scores, revenue leak, and prioritized recommendations.
                            </p>
                            <ul style={{ marginTop: 24, display: "grid", gap: 13, listStyle: "none" }}>
                                {[
                                    ["Overall grade:", "A simple A–F score that creates urgency."],
                                    ["Category bars:", "Speed, mobile, SEO, and trust visualized at a glance."],
                                    ["Money leak:", "Revenue loss estimate using your visitors, conversion rate, and AOV."],
                                    ["Treatment plan:", "Every issue paired with a practical recommendation."],
                                ].map(([label, desc]) => (
                                    <li key={label} style={{ display: "flex", gap: 12, color: "var(--er-muted)", lineHeight: 1.55 }}>
                                        <span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span>
                                        <span><strong style={{ color: "white" }}>{label}</strong> {desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ borderRadius: 32, padding: 18, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 24px 80px rgba(0,0,0,.38)" }}>
                            <div style={{ display: "grid", gap: 12, padding: 20, background: "#08111a", borderRadius: 24, border: "1px solid rgba(255,255,255,.1)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.25rem" }}>Complete Treatment Plan</h3>
                                        <p style={{ color: "var(--er-muted)", fontSize: "0.88rem" }}>Prioritized by estimated business impact</p>
                                    </div>
                                    <div style={{ width: 78, height: 78, borderRadius: 22, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(255,77,94,.95), rgba(255,177,92,.95))", color: "#1b080a", fontSize: "2.9rem", fontWeight: 950, letterSpacing: "-.08em" }}>D</div>
                                </div>
                                {[
                                    { pill: "High", pillColor: "rgba(255,77,94,.15)", pillText: "#ff8792", title: "Enable compression headers", desc: "Configure gzip or Brotli to reduce transfer size and speed up first load.", cat: "Speed" },
                                    { pill: "High", pillColor: "rgba(255,77,94,.15)", pillText: "#ff8792", title: "Add a clear meta description", desc: "Write a concise search snippet to improve organic click-through rate.", cat: "SEO" },
                                    { pill: "Medium", pillColor: "rgba(255,177,92,.14)", pillText: "#ffc983", title: "Increase mobile touch targets", desc: "Make buttons and navigation easier to tap on small screens.", cat: "Mobile" },
                                    { pill: "Low", pillColor: "rgba(110,231,255,.12)", pillText: "var(--er-cyan)", title: "Add Open Graph image", desc: "Improve how pages appear when shared on social platforms.", cat: "SEO" },
                                ].map((row) => (
                                    <div key={row.title} style={{ display: "grid", gridTemplateColumns: "88px 1fr auto", gap: 14, alignItems: "center", padding: 14, borderRadius: 18, background: "rgba(255,255,255,.055)", border: "1px solid rgba(255,255,255,.075)" }}>
                                        <span style={{ borderRadius: 999, padding: "7px 9px", textAlign: "center", fontSize: "0.72rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: ".06em", background: row.pillColor, color: row.pillText }}>{row.pill}</span>
                                        <div>
                                            <div style={{ marginBottom: 3, fontSize: "0.95rem" }}>{row.title}</div>
                                            <div style={{ color: "var(--er-muted)", fontSize: "0.84rem" }}>{row.desc}</div>
                                        </div>
                                        <span style={{ color: "var(--er-muted)", fontSize: "0.84rem" }}>{row.cat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PRICING ── */}
                <section id="pricing" style={{ padding: "82px 0" }}>
                    <div className="er-container">
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 30, marginBottom: 34, flexWrap: "wrap" }}>
                            <div>
                                <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Pricing</div>
                                <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}><span className="cta-word">Start free</span>. Pay when you want expert help.</h2>
                            </div>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, maxWidth: 455, fontSize: "1.04rem" }}>
                                The automated ER scan captures demand. Paid tiers convert the highest-intent leads into manual reviews and implementation work.
                            </p>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "stretch" }}>
                            {/* Free */}
                            <article style={{ borderRadius: 30, padding: 28, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 20px 70px rgba(0,0,0,.18)", display: "flex", flexDirection: "column" }}>
                                <div style={{ width: "fit-content", borderRadius: 999, padding: "7px 10px", background: "rgba(255,77,94,.14)", color: "#ffb6be", fontSize: "0.76rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Free scan</div>
                                <h3 style={{ fontSize: "1.45rem", letterSpacing: "-.04em", marginBottom: 9 }}>Free ER Scan</h3>
                                <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>The automated diagnostic report every business can run in seconds.</p>
                                <div style={{ fontSize: "3.3rem", fontWeight: 950, letterSpacing: "-.075em", margin: "18px 0 10px" }}>$0</div>
                                <ul style={{ listStyle: "none", display: "grid", gap: 12, margin: "0 0 24px", color: "var(--er-muted)", flex: 1 }}>
                                    {["Instant A–F grade", "Top issues teaser", "Estimated revenue leak", "Email-gated report link"].map((f) => (
                                        <li key={f} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="#scan" style={{ borderRadius: 999, padding: "13px 19px", fontWeight: 800, textAlign: "center", color: "white", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.13)", display: "block" }}>Run free scan</a>
                            </article>

                            {/* Fix Pack — featured */}
                            <article style={{ borderRadius: 30, padding: 28, background: "radial-gradient(circle at 50% 0%, rgba(255,77,94,.18), transparent 38%), rgba(255,255,255,.09)", border: "1px solid rgba(255,77,94,.32)", boxShadow: "0 20px 70px rgba(0,0,0,.18)", display: "flex", flexDirection: "column", transform: "scale(1.025)" }}>
                                <div style={{ width: "fit-content", borderRadius: 999, padding: "7px 10px", background: "rgba(255,77,94,.14)", color: "#ffb6be", fontSize: "0.76rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Most urgent</div>
                                <h3 style={{ fontSize: "1.45rem", letterSpacing: "-.04em", marginBottom: 9 }}>ER Fix Pack</h3>
                                <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                                    You identify what is broken, then a specialist implements the fixes.
                                </p>
                                <div style={{ fontSize: "3.3rem", fontWeight: 950, letterSpacing: "-.075em", margin: "18px 0 10px" }}>$450–$1,500</div>
                                <ul style={{ listStyle: "none", display: "grid", gap: 12, margin: "0 0 24px", color: "var(--er-muted)", flex: 1 }}>
                                    {["Fix high-impact scan issues", "Speed, SEO, mobile, and trust improvements", "Before/after rescan included", "Best for business-critical sites"].map((f) => (
                                        <li key={f} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="mailto:hello@siteer.app?subject=ER%20Fix%20Pack%20Inquiry" style={{ borderRadius: 999, padding: "13px 19px", fontWeight: 800, textAlign: "center", color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", display: "block" }}>Request fix pack</a>
                            </article>

                            {/* Deep Report */}
                            <article style={{ borderRadius: 30, padding: 28, background: "rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 20px 70px rgba(0,0,0,.18)", display: "flex", flexDirection: "column" }}>
                                <div style={{ width: "fit-content", borderRadius: 999, padding: "7px 10px", background: "rgba(255,77,94,.14)", color: "#ffb6be", fontSize: "0.76rem", fontWeight: 950, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 18 }}>Human review</div>
                                <h3 style={{ fontSize: "1.45rem", letterSpacing: "-.04em", marginBottom: 9 }}>Deep ER Report</h3>
                                <p style={{ color: "var(--er-muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>A manual expert review layered on top of your automated scan.</p>
                                <div style={{ fontSize: "3.3rem", fontWeight: 950, letterSpacing: "-.075em", margin: "18px 0 10px" }}>$49</div>
                                <ul style={{ listStyle: "none", display: "grid", gap: 12, margin: "0 0 24px", color: "var(--er-muted)", flex: 1 }}>
                                    {["Human-written recommendations", "Prioritized action plan", "Conversion and UX notes", "PDF report delivered by email"].map((f) => (
                                        <li key={f} style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--er-green)", fontWeight: 900 }}>✓</span> {f}</li>
                                    ))}
                                </ul>
                                <a href="mailto:hello@siteer.app?subject=Deep%20ER%20Report%20Inquiry" style={{ borderRadius: 999, padding: "13px 19px", fontWeight: 800, textAlign: "center", color: "white", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.13)", display: "block" }}>Order report</a>
                            </article>
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section id="faq" style={{ padding: "82px 0" }}>
                    <div className="er-container" style={{ display: "grid", gridTemplateColumns: ".75fr 1.25fr", gap: 28 }}>
                        <div>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 12 }}>Questions</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em" }}>Built like a SaaS, sold like a service wedge.</h2>
                            <p style={{ color: "var(--er-muted)", lineHeight: 1.7, fontSize: "1.04rem", marginTop: 18 }}>
                                SiteER works best as a lead-generation product that gives immediate value and creates urgency for paid fixes.
                            </p>
                        </div>
                        <FaqAccordion />
                    </div>
                </section>

                {/* ── CTA ── */}
                <section style={{ padding: "46px 0 88px" }}>
                    <div className="er-container">
                        <div style={{ textAlign: "center", borderRadius: 38, padding: "58px 28px", background: "radial-gradient(circle at 20% 0%, rgba(255,77,94,.25), transparent 35%), radial-gradient(circle at 80% 70%, rgba(110,231,255,.12), transparent 32%), rgba(255,255,255,.075)", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 24px 80px rgba(0,0,0,.38)" }}>
                            <div style={{ color: "var(--er-red)", textTransform: "uppercase", letterSpacing: ".13em", fontSize: "0.78rem", fontWeight: 950, marginBottom: 18 }}>Ready for intake?</div>
                            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.05rem)", lineHeight: 0.98, letterSpacing: "-.065em", margin: "0 auto" }}>Give every website a fast diagnosis and a reason to act.</h2>
                            <p style={{ color: "var(--er-muted)", maxWidth: 620, margin: "18px auto 28px", lineHeight: 1.7, fontSize: "1.08rem" }}>
                                SiteER should feel like an instant, credible, high-urgency diagnostic tool: simple enough for owners, specific enough to justify paid fixes.
                            </p>
                            <a href="#scan" style={{ border: 0, cursor: "pointer", borderRadius: 999, padding: "15px 28px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "1rem", display: "inline-block" }}>
                                <span className="cta-word-dark">Run</span> a free ER scan →
                            </a>
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
                        <a href="#diagnose" className="hover:text-white transition-colors">Diagnostics</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="/privacy" className="hover:text-white transition-colors">Privacy Agreement</a>
                        <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Powered by COAIBAKERSFIELD.COM</a>
                        <a href="mailto:hello@siteer.app" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
}
