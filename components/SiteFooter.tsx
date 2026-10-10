import Image from "next/image";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,.08)",
        padding: "28px 0",
        marginTop: 80,
        color: "var(--er-muted-2)",
        fontSize: 14,
      }}
    >
      <div
        className="er-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/siteer-logo.png" alt="SiteER" width={100} height={28} />
        </a>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {(
            [
              ["/#diagnosis", "Free Scan"],
              ["/pricing", "Pricing"],
              ["/blog", "Blog"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/terms", "Terms"],
              ["/privacy", "Privacy"],
            ] as [string, string][]
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ color: "var(--er-muted-2)", textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div>© {year} SiteER · coaibakersfield.com</div>
      </div>
    </footer>
  );
}
