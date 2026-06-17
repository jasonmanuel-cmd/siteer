import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import { quickAuditOffer } from "@/lib/offers";
import { buildGeoMetadata, buildLocalBusinessSchema } from "@/lib/siteIdentity";
import "@/app/globals.css";

const TextSizeToggle = dynamic(() => import("@/components/TextSizeToggle"), { ssr: false });
const localBusinessSchema = buildLocalBusinessSchema();
const geoMetadata = buildGeoMetadata();

export const metadata: Metadata = {
    metadataBase: new URL("https://siteer.dev"),
    title: {
        default: "SiteER — The Emergency Room for Sick Websites",
        template: "%s | SiteER",
    },
    description:
        `Paste any URL and SiteER instantly finds broken performance, mobile, SEO, and trust signals, then guides visitors from a free scan to a ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} or full implementation.`,
    applicationName: "SiteER",
    keywords: [
        "website audit",
        "SEO audit",
        "local SEO Bakersfield",
        "website performance scan",
        "conversion optimization",
        "technical SEO",
        "website trust signals",
        "SiteER",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "https://siteer.dev",
        siteName: "SiteER",
        title: "SiteER — The Emergency Room for Sick Websites",
        description:
            `Run an instant website ER scan with a money-leak estimate, then move into the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} or full implementation.`,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SiteER website diagnostic preview",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "SiteER — The Emergency Room for Sick Websites",
        description:
            `Find high-impact website issues in under 60 seconds, unlock the shareable summary by email, and offer the ${quickAuditOffer.priceLabel} ${quickAuditOffer.name} for the detailed treatment plan.`,
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
    // viewport is handled by the dedicated `viewport` export below
    other: Object.keys(geoMetadata).length > 0 ? geoMetadata : undefined,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Preload critical resources for better Lighthouse score */}
                <link rel="preload" href="/siteer-logo.png" as="image" type="image/png" />
                <link rel="preload" href="/og-image.png" as="image" type="image/png" />
                {/* Preconnect to external domains for faster resource loading */}
                <link rel="preconnect" href="https://coaibakersfield.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body>
                <div className="noise" aria-hidden="true" />
                {children}
                <TextSizeToggle />
                <Analytics />
            </body>
        </html>
    );
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};
