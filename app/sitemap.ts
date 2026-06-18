import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL } from "@/lib/siteConfig";

const BASE_URL = CANONICAL_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const corePages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/reports`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/faq`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/bakersfield-website-audit`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/bakersfield-local-seo`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/bakersfield-website-speed-fix`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/bakersfield-conversion-help`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.75,
        },
        {
            url: `${BASE_URL}/get-quote`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/blog/local-business-website-mistakes`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
        },
        {
            url: `${BASE_URL}/blog/mobile-page-speed-fixes`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
        },
        {
            url: `${BASE_URL}/blog/website-not-bringing-customers`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/case-studies/bakersfield-contractor-website-repair`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.65,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.4,
        },
    ];

    return corePages;
}
