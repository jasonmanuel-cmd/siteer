"use client";

import { useState, useEffect } from "react";

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse is leaving from top of window
            if (e.clientY <= 0 && !isVisible && !localStorage.getItem("exitIntentDismissed")) {
                setIsVisible(true);
                setIsAnimating(true);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }, [isVisible]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            localStorage.setItem("exitIntentDismissed", "true");
        }, 300);
    };

    const handleCtaClick = () => {
        localStorage.setItem("exitIntentDismissed", "true");
        const diagnosis = document.getElementById("diagnosis");
        if (diagnosis) {
            diagnosis.scrollIntoView({ behavior: "smooth" });
            setIsAnimating(false);
            setTimeout(() => setIsVisible(false), 300);
        }
    };

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                opacity: isAnimating ? 1 : 0,
                transition: "opacity 300ms ease",
                backdropFilter: "blur(4px)",
            }}
            onClick={handleClose}
        >
            <div
                style={{
                    borderRadius: 28,
                    background: "linear-gradient(135deg, rgba(20,10,15,.95), rgba(15,8,12,.95))",
                    border: "1px solid rgba(255,77,94,.25)",
                    padding: 40,
                    maxWidth: 420,
                    textAlign: "center",
                    boxShadow: "0 25px 100px rgba(0,0,0,.7)",
                    transform: isAnimating ? "scale(1)" : "scale(0.95)",
                    transition: "transform 300ms ease",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>⚠️</div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>
                    Wait! Don't leave yet.
                </h2>
                <p style={{ color: "var(--er-muted)", marginBottom: 24, fontSize: "0.95rem", lineHeight: 1.6 }}>
                    Get a free scan of your website in under 60 seconds. See your grade, money leak estimate, and actionable fixes — no credit card required.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                    <button
                        onClick={handleCtaClick}
                        style={{
                            borderRadius: 999,
                            padding: "13px 22px",
                            fontWeight: 800,
                            border: 0,
                            cursor: "pointer",
                            color: "#19070a",
                            background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                            boxShadow: "0 18px 42px rgba(255,77,94,.28)",
                            fontSize: "0.95rem",
                            flex: 1,
                            minWidth: 140,
                        }}
                    >
                        Get Free Scan →
                    </button>
                    <button
                        onClick={handleClose}
                        style={{
                            borderRadius: 999,
                            padding: "13px 22px",
                            fontWeight: 800,
                            border: "1px solid rgba(255,255,255,.13)",
                            cursor: "pointer",
                            color: "var(--er-muted)",
                            background: "transparent",
                            fontSize: "0.95rem",
                            minWidth: 100,
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
