"use client";

import { useState } from "react";

export default function LiveChatButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => setIsOpen(false), 300);
        }
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={handleToggle}
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(255,77,94,.35)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    zIndex: 998,
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                    transform: isOpen ? "scale(0.9)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(255,77,94,.45)";
                    (e.target as HTMLButtonElement).style.transform = !isOpen ? "scale(1.08)" : "scale(0.9)";
                }}
                onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(255,77,94,.35)";
                    (e.target as HTMLButtonElement).style.transform = !isOpen ? "scale(1)" : "scale(0.9)";
                }}
                aria-label="Open chat"
            >
                💬
            </button>

            {/* Chat panel */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 86,
                        right: 20,
                        width: 360,
                        maxWidth: "calc(100vw - 40px)",
                        borderRadius: 16,
                        background: "linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,255,255,.92))",
                        border: "1px solid rgba(0,0,0,.1)",
                        boxShadow: "0 12px 48px rgba(0,0,0,.15)",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 998,
                        opacity: isAnimating ? 1 : 0,
                        transform: isAnimating ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 300ms ease, transform 300ms ease",
                        pointerEvents: isAnimating ? "auto" : "none",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                            color: "#19070a",
                            padding: 16,
                            borderRadius: "16px 16px 0 0",
                            fontWeight: 800,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span>Questions? We're here to help! 👋</span>
                        <button
                            onClick={handleToggle}
                            style={{
                                background: "rgba(25,7,10,.1)",
                                border: "none",
                                color: "#19070a",
                                cursor: "pointer",
                                borderRadius: "50%",
                                width: 28,
                                height: 28,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.1rem",
                                fontWeight: 800,
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 16, flex: 1, minHeight: 120 }}>
                        <p style={{ color: "#333", fontSize: "0.9rem", marginBottom: 12 }}>
                            Hi there! Have questions about SiteER? We typically respond within 2 hours.
                        </p>
                        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                            <a
                                href="mailto:hello@siteer.dev"
                                style={{
                                    padding: "10px 12px",
                                    background: "rgba(255,77,94,.08)",
                                    border: "1px solid rgba(255,77,94,.2)",
                                    borderRadius: 8,
                                    color: "#ff4d5e",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                📧 Email us
                            </a>
                            <a
                                href="/#diagnosis"
                                onClick={handleToggle}
                                style={{
                                    padding: "10px 12px",
                                    background: "linear-gradient(135deg, #ff4d5e, #ffb15c)",
                                    border: "none",
                                    borderRadius: 8,
                                    color: "#19070a",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                🚀 Try Free Scan
                            </a>
                            <a
                                href="/faq"
                                style={{
                                    padding: "10px 12px",
                                    background: "rgba(0,0,0,.05)",
                                    border: "1px solid rgba(0,0,0,.1)",
                                    borderRadius: 8,
                                    color: "#333",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                ❓ Read FAQ
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            padding: 12,
                            borderTop: "1px solid rgba(0,0,0,.08)",
                            fontSize: "0.75rem",
                            color: "#999",
                            textAlign: "center",
                        }}
                    >
                        Response time: ~2 hours
                    </div>
                </div>
            )}
        </>
    );
}
