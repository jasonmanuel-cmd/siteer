import { quickAuditOffer } from "@/lib/offers";

export const siteFaqs = [
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
        a: "No problem. SiteER audits the front-end performance, SEO structure, and trust signals that matter to visitors regardless of how the site was built.",
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
        a: "It's directional. We combine your site grade with optional inputs like monthly visitors, conversion rate, and average order value to estimate potential revenue loss.",
    },
    {
        q: "Can I see a sample report?",
        a: "Yes. Visit the Reports page to see what is included in the free and paid report layers. Real scanning happens after you run a diagnosis on the homepage.",
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
        a: "Yes. If we do not improve your grade by at least 20 points with the ER Fix Pack, you receive a full refund.",
    },
    {
        q: `What's the difference between the ${quickAuditOffer.name} and ER Fix Pack?`,
        a: `${quickAuditOffer.name} (${quickAuditOffer.priceLabel}) is a manual review with a short written action plan based on your scan. ER Fix Pack ($497) is the done-for-you implementation path where SiteER actually applies the fixes and re-scans the site.`,
    },
] as const;
