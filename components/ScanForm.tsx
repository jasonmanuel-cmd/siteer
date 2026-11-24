"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { websiteAddress } from "@/lib/plans";

export default function ScanForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const website = websiteAddress(url);
    if (!website) {
      setError("Enter a valid website address, such as example.com.");
      return;
    }
    setError("");
    router.push(`/get-quote?plan=free&url=${encodeURIComponent(website)}`);
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
        className="flex flex-col sm:flex-row"
        style={{
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
          aria-label="Website address"
          autoComplete="url"
          inputMode="url"
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
          style={{
            background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
            color: "#19070a",
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 22px",
            whiteSpace: "nowrap",
            transition: "opacity 0.15s",
          }}
        >
          Request My Free Scan →
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
        Manual review by email · No credit card needed
      </p>
    </form>
  );
}
