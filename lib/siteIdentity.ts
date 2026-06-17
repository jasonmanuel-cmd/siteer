import { resolveSiteUrl } from "@/lib/siteConfig";

function readEnv(name: string): string | null {
    const value = process.env[name]?.trim();
    return value ? value : null;
}

function readNumberEnv(name: string): number | null {
    const value = readEnv(name);
    if (!value) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function withDefinedValues<T extends Record<string, unknown>>(value: T): T {
    return Object.fromEntries(
        Object.entries(value).filter(([, entryValue]) => entryValue !== null && entryValue !== undefined && entryValue !== ""),
    ) as T;
}

function readListEnv(name: string): string[] {
    const value = readEnv(name);
    if (!value) return [];

    return value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean);
}

export const siteIdentity = {
    name: readEnv("LOCAL_BUSINESS_NAME") ?? "SiteER",
    url: resolveSiteUrl(readEnv("NEXT_PUBLIC_APP_URL")),
    email: readEnv("CONTACT_EMAIL"),
    phone: readEnv("LOCAL_BUSINESS_PHONE"),
    city: readEnv("LOCAL_BUSINESS_CITY") ?? "Bakersfield",
    region: readEnv("LOCAL_BUSINESS_REGION") ?? "CA",
    postalCode: readEnv("LOCAL_BUSINESS_POSTAL_CODE"),
    country: readEnv("LOCAL_BUSINESS_COUNTRY") ?? "US",
    streetAddress: readEnv("LOCAL_BUSINESS_STREET"),
    latitude: readNumberEnv("LOCAL_BUSINESS_LATITUDE"),
    longitude: readNumberEnv("LOCAL_BUSINESS_LONGITUDE"),
    sameAs: readListEnv("LOCAL_BUSINESS_SAME_AS"),
};

export function buildLocalBusinessSchema(): Record<string, unknown> {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteIdentity.url}/#localbusiness`,
        name: siteIdentity.name,
        description:
            "Instant website diagnostics for local businesses - performance, SEO, mobile, and trust signal analysis.",
        url: siteIdentity.url,
        image: `${siteIdentity.url.replace(/\/$/, "")}/og-image.png`,
        priceRange: "$$",
        parentOrganization: {
            "@id": `${siteIdentity.url}/#org`,
        },
        areaServed: [
            withDefinedValues({
                "@type": "City",
                name: siteIdentity.city,
                addressRegion: siteIdentity.region,
                addressCountry: siteIdentity.country,
            }),
            withDefinedValues({
                "@type": "State",
                name: siteIdentity.region,
                addressCountry: siteIdentity.country,
            }),
        ],
    };

    if (siteIdentity.phone) {
        schema.telephone = siteIdentity.phone;
    }

    if (siteIdentity.email) {
        schema.email = siteIdentity.email;
    }

    schema.sameAs = siteIdentity.sameAs.length > 0 ? siteIdentity.sameAs : ["https://coaibakersfield.com"];

    const address = withDefinedValues({
        "@type": "PostalAddress",
        streetAddress: siteIdentity.streetAddress,
        addressLocality: siteIdentity.city,
        addressRegion: siteIdentity.region,
        postalCode: siteIdentity.postalCode,
        addressCountry: siteIdentity.country,
    });

    if (Object.keys(address).length > 1) {
        schema.address = address;
    }

    if (typeof siteIdentity.latitude === "number" && typeof siteIdentity.longitude === "number") {
        schema.geo = {
            "@type": "GeoCoordinates",
            latitude: siteIdentity.latitude,
            longitude: siteIdentity.longitude,
        };
    }

    return schema;
}

export function buildSiteGraphSchema(): Record<string, unknown> {
    const contactPoint =
        siteIdentity.email || siteIdentity.phone
            ? withDefinedValues({
                "@type": "ContactPoint",
                contactType: "customer support",
                email: siteIdentity.email,
                telephone: siteIdentity.phone,
                areaServed: siteIdentity.country,
                availableLanguage: "en-US",
            })
            : null;

    const organization = withDefinedValues({
        "@type": "Organization",
        "@id": `${siteIdentity.url}/#org`,
        name: siteIdentity.name,
        url: siteIdentity.url,
        logo: {
            "@type": "ImageObject",
            url: `${siteIdentity.url}/siteer-logo.png`,
        },
        email: siteIdentity.email,
        telephone: siteIdentity.phone,
        contactPoint: contactPoint ? [contactPoint] : undefined,
        sameAs: siteIdentity.sameAs.length > 0 ? siteIdentity.sameAs : ["https://coaibakersfield.com"],
    });

    const website = withDefinedValues({
        "@type": "WebSite",
        "@id": `${siteIdentity.url}/#website`,
        name: siteIdentity.name,
        url: siteIdentity.url,
        publisher: {
            "@id": `${siteIdentity.url}/#org`,
        },
        inLanguage: "en-US",
    });

    const service = withDefinedValues({
        "@type": "ProfessionalService",
        "@id": `${siteIdentity.url}/#service`,
        name: siteIdentity.name,
        description:
            "Instant website diagnostics for performance, mobile UX, SEO, trust signals, and conversion leaks.",
        url: siteIdentity.url,
        provider: {
            "@id": `${siteIdentity.url}/#org`,
        },
        areaServed: [
            withDefinedValues({
                "@type": "City",
                name: siteIdentity.city,
                addressRegion: siteIdentity.region,
                addressCountry: siteIdentity.country,
            }),
            withDefinedValues({
                "@type": "AdministrativeArea",
                name: siteIdentity.region,
                addressCountry: siteIdentity.country,
            }),
            withDefinedValues({
                "@type": "Country",
                name: siteIdentity.country,
            }),
        ],
        serviceType: [
            "Website Audit",
            "Technical SEO Audit",
            "Website Performance Audit",
            "Conversion Optimization",
        ],
    });

    return {
        "@context": "https://schema.org",
        "@graph": [
            organization,
            website,
            buildLocalBusinessSchema(),
            service,
        ],
    };
}

export function buildGeoMetadata(): Record<string, string> {
    const geo: Record<string, string> = {};

    if (siteIdentity.region) {
        geo["geo.region"] = `${siteIdentity.country}-${siteIdentity.region}`;
    }

    if (siteIdentity.city) {
        geo["geo.placename"] = siteIdentity.city;
    }

    if (typeof siteIdentity.latitude === "number" && typeof siteIdentity.longitude === "number") {
        const coords = `${siteIdentity.latitude};${siteIdentity.longitude}`;
        geo["geo.position"] = coords;
        geo.ICBM = coords.replace(";", ", ");
    }

    return geo;
}
