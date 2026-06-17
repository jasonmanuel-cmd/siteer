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

export const siteIdentity = {
    name: readEnv("LOCAL_BUSINESS_NAME") ?? "SiteER",
    url: readEnv("NEXT_PUBLIC_APP_URL") ?? "https://siteer.dev",
    email: readEnv("CONTACT_EMAIL"),
    phone: readEnv("LOCAL_BUSINESS_PHONE"),
    city: readEnv("LOCAL_BUSINESS_CITY") ?? "Bakersfield",
    region: readEnv("LOCAL_BUSINESS_REGION") ?? "CA",
    postalCode: readEnv("LOCAL_BUSINESS_POSTAL_CODE"),
    country: readEnv("LOCAL_BUSINESS_COUNTRY") ?? "US",
    streetAddress: readEnv("LOCAL_BUSINESS_STREET"),
    latitude: readNumberEnv("LOCAL_BUSINESS_LATITUDE"),
    longitude: readNumberEnv("LOCAL_BUSINESS_LONGITUDE"),
};

export function buildLocalBusinessSchema(): Record<string, unknown> {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": siteIdentity.url,
        name: siteIdentity.name,
        description:
            "Instant website diagnostics for local businesses - performance, SEO, mobile, and trust signal analysis.",
        url: siteIdentity.url,
        image: `${siteIdentity.url.replace(/\/$/, "")}/og-image.png`,
        priceRange: "$$",
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
