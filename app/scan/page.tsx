import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScanReportView from "@/components/ScanReportView";

export const metadata: Metadata = { title: "Free website check", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default async function ScanPage({ searchParams }: { searchParams: Promise<{ url?: string }> }) {
  const params = await searchParams;
  return <><SiteHeader /><main className="er-container" style={{ paddingTop: 64, paddingBottom: 64, minHeight: "70vh" }}>
    <h1 style={{ fontSize: 32, fontWeight: 800 }}>Check your website</h1>
    <p style={{ margin: "20px 0", color: "var(--er-muted)" }}>A free check of one public HTML page. Scan only a website you own or have permission to check. Do not enter private links or secrets.</p>
    <ScanReportView initialUrl={typeof params.url === "string" ? params.url.slice(0,2048) : ""} />
  </main><SiteFooter /></>;
}
