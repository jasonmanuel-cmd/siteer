import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/scan/", "/business-overview/", "/api/"],
            },
            {
                userAgent: ["GPTBot", "Claude-Web", "PerplexityBot", "Googlebot-Extended"],
                allow: ["/", "/blog/", "/pricing", "/faq", "/reports", "/contact"],
                disallow: ["/scan/", "/business-overview/", "/api/"],
            },
        ],
        sitemap: "https://siteer.dev/sitemap.xml",
    };
}
