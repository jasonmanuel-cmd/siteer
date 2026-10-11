import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started – Order Your Report or Fix Pack",
  description:
    "Order a $49 Deep ER Report or $497 Fix Pack for your website. Jason will review and send a payment link within one business day. No charge until you approve.",
  alternates: { canonical: "https://siteer.dev/get-quote" },
};

export default function GetQuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
