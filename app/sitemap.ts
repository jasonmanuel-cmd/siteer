import type { MetadataRoute } from "next";

const pages = [
  "/",
  "/pricing",
  "/reports",
  "/contact",
  "/faq",
  "/blog",
  "/blog/local-business-website-mistakes",
  "/blog/mobile-page-speed-fixes",
  "/blog/website-not-bringing-customers",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `https://www.siteer.dev${path}` }));
}
