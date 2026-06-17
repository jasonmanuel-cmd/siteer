"use client";

import { useState } from "react";
import { siteFaqs } from "@/lib/siteFaqs";

export default function FaqAccordion() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {siteFaqs.map((faq, i) => (
                <div
                    key={faq.q}
                    style={{
                        border: "1px solid rgba(255,255,255,.13)",
                        background: "linear-gradient(180deg, rgba(255,255,255,.085), rgba(255,255,255,.045))",
                        borderRadius: 22,
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(0,0,0,.18)",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(open === i ? null : i)}
                        style={{
                            width: "100%",
                            padding: "20px",
                            border: 0,
                            background: "transparent",
                            color: "var(--er-text)",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 20,
                            textAlign: "left",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        <span>{faq.q}</span>
                        <span
                            style={{
                                color: "var(--er-red)",
                                fontSize: "1.25rem",
                                transition: "transform .2s ease",
                                transform: open === i ? "rotate(45deg)" : "none",
                                flexShrink: 0,
                            }}
                        >
                            +
                        </span>
                    </button>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateRows: open === i ? "1fr" : "0fr",
                            transition: "grid-template-rows .25s ease",
                        }}
                    >
                        <div style={{ overflow: "hidden" }}>
                            <p
                                style={{
                                    color: "#c8d5e1",
                                    lineHeight: 1.7,
                                    padding: "0 20px 20px",
                                    fontSize: "0.95rem",
                                }}
                            >
                                {faq.a}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
