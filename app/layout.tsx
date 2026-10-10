import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SiteER – Free Website Audit for Local Businesses",
    template: "%s | SiteER",
  },
  description:
    "Get a free website error report. Find out why your site isn't bringing in customers. $49 Deep ER Report or $497 Fix Pack for Bakersfield area businesses.",
  metadataBase: new URL("https://siteer.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
