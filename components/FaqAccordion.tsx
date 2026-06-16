"use client";

import { useState } from "react";
import { quickAuditOffer } from "@/lib/offers";

const faqs = [
    {
        q: "Who is SiteER for?",
        a: "Local business owners, contractors, and service companies who are losing leads from a slow or broken website. Perfect for anyone who wants a fast diagnosis without reading a technical audit.",
    },
    {
        q: "How long does a scan take?",
        a: "Under 60 seconds. We fetch your page, run 20+ automated checks, calculate your grade, and estimate your monthly revenue leak in real-time.",
    },
    {
        q: "Will this work with Shopify, Wix, or Webflow?",
        a: "Yes. SiteER scans any publicly accessible website, regardless of platform. The fixes may differ by builder, but the diagnosis is universally applicable.",
    },
    {
        q: "What if my site uses a page builder?",
        a: "No problem. SiteER audits the front-end performance, SEO structure, and trust signals that matter to visitors—regardless of how the site was built.",
    },
    {
        q: "Do I need developer skills to understand the report?",
        a: "No. We translate technical issues into plain English. Every issue comes with a clear priority level and practical next steps a non-technical person can understand.",
    },
    {
        q: "What's included in the ER Fix Pack exactly?",
        a: "Speed optimization, mobile fixes, CTA improvements, SEO fundamentals cleanup, and trust signal enhancements. We re-scan after completion to prove the improvements in your grade.",
    },
    {
        q: "How accurate is the money leak estimate?",
        a: "It's directional. We combine your site grade with optional inputs (monthly visitors, conversion rate, average order value) to estimate potential revenue loss. Use it to justify the investment in fixes.",
    },
    {
        q: "Can I see a sample report?",
        a: "Yes—visit the Reports page to see what's included in the free and paid reports. Real scanning happens after you run a diagnosis on the homepage.",
    },
    {
        q: "What does the email gate do?",
        a: "The email gate turns an anonymous scan into a lead, generates a unique report token, stores the record, and sends you the shareable report link.",
    },
    {
        q: "How is money leak calculated?",
        a: "The estimate combines your scan grade with optional business inputs like monthly visitors, conversion rate, and average order value to project monthly revenue impact.",
    },
    {
        q: "Is there a money-back guarantee?",
        a: "Yes. If we don't improve your grade by at least 20 points with the ER Fix Pack, you receive a full refund.",
    },
    {
        q: `What's the difference between the ${quickAuditOffer.name} and ER Fix Pack?`,
        a: `${quickAuditOffer.name} (${quickAuditOffer.priceLabel}): Manual review with a short written action plan based on your scan. ER Fix Pack ($497): We actually implement the fixes and re-scan to prove results.`,
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
                            maxHeight: open === i ? 250 : 0,
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
