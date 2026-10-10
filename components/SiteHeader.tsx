import Image from "next/image";

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(18px)",
        background: "rgba(7,16,24,.72)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div className="er-container">
        <nav
          aria-label="Main navigation"
          style={{
            height: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/siteer-logo.png"
              alt="SiteER"
              width={140}
              height={40}
              priority
            />
          </a>
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            <a
              href="/reports"
              style={{ color: "var(--er-muted)", textDecoration: "none" }}
            >
              Reports
            </a>
            <a
              href="/pricing"
              style={{ color: "var(--er-muted)", textDecoration: "none" }}
            >
              Pricing
            </a>
            <a
              href="/blog"
              style={{ color: "var(--er-muted)", textDecoration: "none" }}
            >
              Blog
            </a>
            <a
              href="/faq"
              style={{ color: "var(--er-muted)", textDecoration: "none" }}
            >
              FAQ
            </a>
          </div>
          <a
            href="/#diagnosis"
            style={{
              background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
              color: "#19070a",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Scan My Site Free
          </a>
        </nav>
      </div>
    </header>
  );
}
