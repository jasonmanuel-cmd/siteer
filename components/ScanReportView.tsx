"use client";
import { useRef, useState } from "react";
import type { ScanReport } from "@/lib/scanner";

export default function ScanReportView({ initialUrl }: { initialUrl: string }) {
  const [url, setUrl] = useState(initialUrl);
  const [report, setReport] = useState<ScanReport | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (busy.current) return;
    busy.current = true; setLoading(true); setError(""); setReport(null);
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 22_000);
    try {
      const response = await fetch("/api/scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }), signal: controller.signal });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The scan could not finish.");
      setReport(result);
    } catch (reason) { setError(reason instanceof Error && reason.name !== "AbortError" ? reason.message : "The scan timed out. Try again later."); }
    finally { clearTimeout(timer); busy.current = false; setLoading(false); }
  }
  return <>
    <form onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 700 }}>
      <label htmlFor="scan-url">Public website address</label>
      <input id="scan-url" value={url} onChange={e => setUrl(e.target.value)} maxLength={2048} required placeholder="https://your-website.com" style={{ padding: 14, borderRadius: 8, color: "#08131f", minWidth: 0 }} />
      <label><input type="checkbox" required /> I own this website or have permission to check it.</label>
      <button className="er-btn-cta" disabled={loading}>{loading ? "Checking the page…" : "Run free check"}</button>
    </form>
    <p role="status" aria-live="polite" style={{ marginTop: 20 }}>{loading ? "Fetching the public page and checking its HTML. This can take up to 15 seconds." : ""}</p>
    {error && <p role="alert" className="er-card">{error} No report was generated. Check the address and try again.</p>}
    {report && <section aria-label="Website report" style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700 }}>Your HTML report</h2>
      <p style={{ overflowWrap: "anywhere" }}>{report.url}</p>
      <p>Checked {new Date(report.scannedAt).toLocaleString()} · {report.bytes.toLocaleString()} bytes · {report.redirects} redirects</p>
      <p>Server fetch time: {report.fetchMilliseconds} ms. This is not browser load time or a performance score.</p>
      <p style={{ margin: "20px 0" }}>Scope: one HTML page, up to 1 MiB and 3 redirects. JavaScript, images, linked pages and forms are not executed or fetched. This does not test rankings, link health, mobile layout, accessibility compliance, vulnerabilities or message delivery. Features added by JavaScript may be absent from these observations. No overall score is assigned.</p>
      <div style={{ display: "grid", gap: 16 }}>
        {report.findings.map(finding => <article className="er-card" key={finding.name}>
          <h3>{finding.name} <span style={{ color: finding.status === "observed" ? "var(--er-cyan)" : "var(--er-orange)", fontSize: 14 }}>— {finding.status === "observed" ? "Observed" : "Review suggested"}</span></h3>
          <p style={{ marginTop: 10 }}>{finding.evidence}</p><p style={{ color: "var(--er-muted)" }}>{finding.advice}</p>
        </article>)}
      </div>
      <button className="er-btn-cta" style={{ marginTop: 24 }} onClick={() => window.print()}>Print or save report as PDF</button>
    </section>}
  </>;
}
