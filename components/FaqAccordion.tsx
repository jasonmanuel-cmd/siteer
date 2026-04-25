"use client";

import { useState } from "react";

const faqs = [
    {
        q: "Who is SiteER for?",
        a: "Small business owners, agencies, consultants, and operators who need a fast way to find website problems without reading a technical audit.",
    },
    {
        q: "What does the email gate do?",
        a: "It turns an anonymous scan into a lead, generates a unique report token, stores the record, and sends the shareable report link by email.",
    },
    {
        q: "How is money leak calculated?",
        a: "The estimate combines the scan grade with optional business inputs like monthly visitors, conversion rate, and average order value.",
    },
    {
        q: "What should the brand feel like?",
        a: "Urgent but trustworthy: medical triage language, red/orange accents, dark technical UI, clear scores, and simple business impact messaging.",
    },
];

export default function FaqAccordion() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <div
                    key={i}
                    style={{
                        border: "1px solid rgba(255,255,255,.13)",
                        background: "rgba(255,255,255,.065)",
                        borderRadius: 22,
                        overflow: "hidden",
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
                            fontSize: "0.95rem",
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
                            maxHeight: open === i ? 200 : 0,
                            overflow: "hidden",
                            transition: "max-height .25s ease",
                        }}
                    >
                        <p
                            style={{
                                color: "var(--er-muted)",
                                lineHeight: 1.65,
                                padding: "0 20px 20px",
                                fontSize: "0.95rem",
                            }}
                        >
                            {faq.a}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
