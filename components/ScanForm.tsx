"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setError("");
    let cleaned = url.trim();
    if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
      cleaned = "https://" + cleaned;
    }
    try {
      const target = new URL(cleaned);
      if (!["http:", "https:"].includes(target.protocol) || target.username || target.password || target.search || target.hash || target.port) {
        throw new Error("Use a public HTTP or HTTPS address without passwords, query parameters or fragments.");
      }
      setLoading(true);
      const encoded = encodeURIComponent(cleaned);
      router.push(`/scan?url=${encoded}`);
    } catch {
      setError("Use a public HTTP or HTTPS address without passwords, query parameters or fragments.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.15)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          aria-label="Public website address"
          maxLength={2048}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your website URL..."
          required
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: 16,
            padding: "14px 18px",
            fontFamily: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
            color: "#19070a",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 22px",
            whiteSpace: "nowrap",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "Scanning…" : "Get My Free Scan →"}
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
      <p
        style={{
          textAlign: "center",
          color: "var(--er-muted-2)",
          fontSize: 13,
        }}
      >
        No credit card needed · One public HTML page
      </p>
    </form>
  );
}
