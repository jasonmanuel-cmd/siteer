"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    let cleaned = url.trim();
    if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
      cleaned = "https://" + cleaned;
    }
    try {
      const encoded = encodeURIComponent(cleaned);
      router.push(`/scan?url=${encoded}`);
    } catch {
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your website URL..."
          required
          style={{
            flex: 1,
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
      <p
        style={{
          textAlign: "center",
          color: "var(--er-muted-2)",
          fontSize: 13,
        }}
      >
        No credit card needed · Results in 60 seconds
      </p>
    </form>
  );
}
