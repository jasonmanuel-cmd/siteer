import Image from "next/image";

export default function SiteHeader() {
    return (
        <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(18px)", background: "rgba(7,16,24,.72)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div className="er-container">
                <nav aria-label="Main navigation" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
                    <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }} aria-label="SiteER home">
                        <Image src="/siteer-logo.png" alt="SiteER logo" width={280} height={80} priority style={{ width: "auto", height: 42 }} />
                    </a>
                    <div style={{ display: "flex", gap: 28, alignItems: "center", color: "var(--er-muted)", fontSize: "1.05rem", flexWrap: "wrap" }}>
                        <a href="/reports" className="nav-link" style={{ fontWeight: 700 }}>Reports</a>
                        <a href="/pricing" className="nav-link" style={{ fontWeight: 700 }}>Pricing</a>
                        <a href="/blog" className="nav-link" style={{ fontWeight: 700 }}>Blog</a>
                        <a href="/faq" className="nav-link" style={{ fontWeight: 700 }}>FAQ</a>
                    </div>
                    <a href="/#diagnosis" style={{ border: 0, borderRadius: 999, padding: "14px 22px", fontWeight: 800, color: "#19070a", background: "linear-gradient(135deg, #ff4d5e, #ffb15c)", boxShadow: "0 18px 42px rgba(255,77,94,.28)", fontSize: "0.95rem", minHeight: 48, display: "inline-flex", alignItems: "center" }}>
                        <span className="cta-word-dark">Scan My Site Free</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
