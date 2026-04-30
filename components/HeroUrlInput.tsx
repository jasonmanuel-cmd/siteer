"use client";

import { useState, useEffect } from "react";

function normalizeInputUrl(input: string): string {
    const trimmed = input.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
}

// A/B test variants
const CTA_VARIANTS = [
    { text: "See My Site's Health Score →", trackingId: "v1-health-score" },
    { text: "Diagnose My Site in 60 Seconds →", trackingId: "v2-diagnose" },
    { text: "Start Free Website Scan →", trackingId: "v3-scan" },
];

export default function HeroUrlInput() {
    const [url, setUrl] = useState("");
    const [ctaVariant, setCtaVariant] = useState(CTA_VARIANTS[0]);

    // Initialize A/B test variant
    useEffect(() => {
        const storedVariant = localStorage.getItem("cta_variant");
        if (storedVariant) {
            const variant = CTA_VARIANTS.find((v) => v.trackingId === storedVariant);
            if (variant) setCtaVariant(variant);
        } else {
            // Randomly assign a variant
            const randomVariant = CTA_VARIANTS[Math.floor(Math.random() * CTA_VARIANTS.length)];
            setCtaVariant(randomVariant);
            localStorage.setItem("cta_variant", randomVariant.trackingId);
            // Track in analytics if available
            if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "ab_test", {
                    test_name: "hero_cta_variant",
                    variant: randomVariant.trackingId,
                });
            }
        }
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const normalized = normalizeInputUrl(url);
        const demoInput = document.getElementById("demoUrl") as HTMLInputElement | null;
        if (demoInput) demoInput.value = normalized;
        
        // Track CTA click
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("event", "hero_cta_click", {
                cta_variant: ctaVariant.trackingId,
            });
        }
        
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
                {ctaVariant.text}
            </button>
        </form>
    );
}
