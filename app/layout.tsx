import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://siteer.dev"),
    title: {
        default: "SiteER — The Emergency Room for Sick Websites",
        template: "%s | SiteER",
    },
    description:
        "Paste any URL and SiteER instantly finds broken performance, mobile, SEO, and trust signals — then translates the damage into a plain-English grade and estimated monthly revenue leak.",
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
            "Run an instant website ER scan for performance, mobile, SEO, and trust issues with a business-impact score and money-leak estimate.",
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
            "Find high-impact website issues in under 60 seconds and turn them into an actionable treatment plan.",
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
    other: {
        "geo.region": "US-CA",
        "geo.placename": "Bakersfield",
        "geo.position": "35.3733;-119.0187",
        ICBM: "35.3733, -119.0187",
    },
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://siteer.dev",
    name: "SiteER",
    description: "Instant website diagnostics for local businesses — performance, SEO, mobile, and trust signal analysis.",
    url: "https://siteer.dev",
    telephone: "+1-661-555-0100",
    areaServed: [
        {
            "@type": "City",
            name: "Bakersfield",
            addressRegion: "CA",
            addressCountry: "US",
        },
        {
            "@type": "State",
            name: "California",
            addressCountry: "US",
        },
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: "Bakersfield",
        addressRegion: "CA",
        postalCode: "93301",
        addressCountry: "US",
    },
    image: "https://siteer.dev/og-image.png",
    priceRange: "$$",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
            </head>
            <body>
                <div className="noise" aria-hidden="true" />
                {children}
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
