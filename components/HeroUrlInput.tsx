"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analyticsClient";

function normalizeInputUrl(input: string): string {
    const trimmed = input.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

export default function HeroUrlInput() {
    const [url, setUrl] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const normalized = normalizeInputUrl(url);
        const demoInput = document.getElementById("demoUrl") as HTMLInputElement | null;
        if (demoInput) {
            demoInput.value = normalized;
            demoInput.dispatchEvent(new Event("input", { bubbles: true }));
        }
        
        trackEvent("hero_cta_click", {
            cta_variant: "run-free-scan",
            cta_label: "Run Free Scan",
        });
        
        const diagnosisSection = document.getElementById("diagnosis");
        if (diagnosisSection) {
            diagnosisSection.scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
            const demoForm = document.getElementById("demoForm") as HTMLFormElement | null;
            if (demoForm) demoForm.requestSubmit();
        }, 600);
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginTop: 34,
                padding: 12,
                borderRadius: 24,
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.14)",
                boxShadow: "0 24px 80px rgba(0,0,0,.38)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "stretch",
                gap: 10,
                maxWidth: 710,
            }}
        >
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={(e) => setUrl(normalizeInputUrl(e.target.value))}
                placeholder="yourlocalplumber.com"
                required
                aria-label="Website URL"
                style={{
                    flex: 1,
                    minWidth: 0,
                    border: "1px solid rgba(255,255,255,.08)",
                    outline: "none",
                    color: "#111111",
                    background: "rgba(255,255,255,.92)",
                    borderRadius: 17,
                    padding: "0 18px",
                    minHeight: 58,
                    width: "100%",
                }}
            />
            <button
                type="submit"
                style={{
                    border: 0,
                    cursor: "pointer",
                    borderRadius: 999,
                    padding: "13px 19px",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    color: "#19070a",
                    background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                    boxShadow: "0 18px 42px rgba(255,77,94,.28)",
                    whiteSpace: "nowrap",
                    minHeight: 58,
                    flex: "0 0 210px",
                }}
            >
                Run Free Scan →
            </button>
        </form>
    );
}
