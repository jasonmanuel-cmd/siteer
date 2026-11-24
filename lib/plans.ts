export const offers = {
  free: { name: "Free Scan", price: "$0" },
  report: { name: "Deep ER Report", price: "$49" },
  fixpack: { name: "Fix Pack", price: "$497" },
} as const;

export type OfferId = keyof typeof offers;

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === "string" && Object.hasOwnProperty.call(offers, value);
}

export function websiteAddress(value: unknown): string {
  if (typeof value !== "string" || value.length > 2048) return "";
  const input = value.trim();
  if (!input) return "";

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") ||
        url.username || url.password) return "";
    return url.href;
  } catch {
    return "";
  }
}
