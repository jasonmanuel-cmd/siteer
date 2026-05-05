import type { MetadataRoute } from "next";

const BASE_URL = "https://siteer.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: `${BASE_URL}/`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/pricing`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
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
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
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
}
