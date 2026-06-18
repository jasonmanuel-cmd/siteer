import type { Metadata } from "next";
import { CANONICAL_SITE_URL } from "@/lib/siteConfig";

export const SITE_NAME = "SiteER";
export const SITE_URL = CANONICAL_SITE_URL;
export const SITE_LOCALE = "en_US";
export const SITE_AUTHOR_NAME = "SiteER Editorial Desk";
export const SITE_AUTHOR_URL = `${SITE_URL}/contact`;
export const LAST_UPDATED_ISO = "2026-06-17";
export const LAST_UPDATED_LABEL = "June 17, 2026";

type PageMetadataParams = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
};

type BreadcrumbItem = {
    name: string;
    path: string;
};

type FaqItem = {
    question: string;
    answer: string;
};

export function buildPageMetadata({
    title,
    description,
    path,
    keywords = [],
}: PageMetadataParams): Metadata {
    const pageUrl = `${SITE_URL}${path}`;

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url: pageUrl,
            siteName: SITE_NAME,
            type: "website",
            locale: SITE_LOCALE,
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: `${SITE_NAME} preview`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
            images: ["/og-image.png"],
        },
    };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    };
}

export function buildFaqSchema(faqs: FaqItem[]) {
    return {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function buildWebPageSchema(params: {
    path: string;
    title: string;
    description: string;
}) {
    return {
        "@type": "WebPage",
        "@id": `${SITE_URL}${params.path}#page`,
        url: `${SITE_URL}${params.path}`,
        name: params.title,
        description: params.description,
        inLanguage: "en-US",
        isPartOf: {
            "@id": `${SITE_URL}/#website`,
        },
        about: {
            "@id": `${SITE_URL}/#service`,
        },
        dateModified: LAST_UPDATED_ISO,
        author: {
            "@type": "Person",
            name: SITE_AUTHOR_NAME,
            url: SITE_AUTHOR_URL,
        },
        publisher: {
            "@id": `${SITE_URL}/#org`,
        },
    };
}

export function buildServiceSchema(params: {
    path: string;
    name: string;
    description: string;
    serviceType: string;
}) {
    return {
        "@type": "Service",
        "@id": `${SITE_URL}${params.path}#service`,
        name: params.name,
        description: params.description,
        url: `${SITE_URL}${params.path}`,
        serviceType: params.serviceType,
        areaServed: {
            "@type": "AdministrativeArea",
            name: "California",
        },
        provider: {
            "@id": `${SITE_URL}/#org`,
        },
    };
}

export function buildPageStructuredData(params: {
    path: string;
    title: string;
    description: string;
    breadcrumbs: BreadcrumbItem[];
    faqs?: FaqItem[];
    extras?: Record<string, unknown>[];
}) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            buildWebPageSchema({
                path: params.path,
                title: params.title,
                description: params.description,
            }),
            buildBreadcrumbSchema(params.breadcrumbs),
            ...(params.faqs ? [buildFaqSchema(params.faqs)] : []),
            ...(params.extras ?? []),
        ],
    };
}
