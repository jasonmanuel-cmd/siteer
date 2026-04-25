import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SiteER — The Emergency Room for Sick Websites",
    description:
        "Paste any URL and SiteER instantly finds broken performance, mobile, SEO, and trust signals — then translates the damage into a plain-English grade and estimated monthly revenue leak.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="noise" aria-hidden="true" />
                {children}
                <Analytics />
            </body>
        </html>
    );
}
