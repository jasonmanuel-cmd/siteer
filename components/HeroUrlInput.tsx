"use client";

import { useState } from "react";

export default function HeroUrlInput() {
    const [url, setUrl] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const demoInput = document.getElementById("demoUrl") as HTMLInputElement | null;
        if (demoInput) demoInput.value = url;
        const scanSection = document.getElementById("scan");
        if (scanSection) {
            scanSection.scrollIntoView({ behavior: "smooth" });
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
                gap: 10,
                maxWidth: 710,
            }}
        >
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                required
                aria-label="Website URL"
                style={{
                    flex: 1,
                    minWidth: 0,
                    border: "1px solid rgba(255,255,255,.08)",
                    outline: "none",
                    color: "white",
                    background: "rgba(0,0,0,.18)",
                    borderRadius: 17,
                    padding: "0 18px",
                    minHeight: 58,
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
                }}
            >
                Run free ER scan →
            </button>
        </form>
    );
}
