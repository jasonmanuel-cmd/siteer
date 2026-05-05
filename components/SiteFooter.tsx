import Image from "next/image";

export default function SiteFooter() {
    return (
        <footer style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "28px 0", color: "var(--er-muted-2)", marginTop: 80 }}>
            <div className="er-container" style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                <a href="/" aria-label="SiteER home" style={{ display: "flex", alignItems: "center" }}>
                    <Image src="/siteer-logo.png" alt="SiteER logo" width={180} height={50} style={{ width: "auto", height: 30 }} />
                </a>
                <nav aria-label="Footer navigation" style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
                    <a href="/#diagnosis" className="hover:text-white transition-colors">Free scan</a>
                    <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
                    <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                    <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                    <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                </nav>
                <div style={{ fontSize: "0.85rem", textAlign: "right" }}>
                    © {new Date().getFullYear()} SiteER · Built by{" "}
                    <a href="https://coaibakersfield.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">coaibakersfield.com</a>
                </div>
            </div>
        </footer>
    );
}
