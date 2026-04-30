"use client";

import { useState, useEffect } from "react";

export default function LiveScanCounter() {
    const [scanCount, setScanCount] = useState(12000);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Increment counter every 8-15 seconds with animation
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setScanCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
                setIsAnimating(false);
            }, 300);
        }, 8000 + Math.random() * 7000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                background: "rgba(255,77,94,.12)",
                border: "1px solid rgba(255,77,94,.22)",
                borderRadius: 999,
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#ffd9de",
            }}
        >
            <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: 99, background: "var(--er-red)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
            <span style={{ transition: "opacity 300ms ease", opacity: isAnimating ? 0.5 : 1 }}>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatNumber(scanCount)}</span> scans running live
            </span>
        </div>
    );
}
