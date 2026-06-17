import type { Metadata } from "next";
import PaymentReturnPageClient from "@/components/PaymentReturnPageClient";

export const metadata: Metadata = {
    title: "Payment return",
    description: "Returning you to your paid SiteER report.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PaymentReturnPage() {
    return <PaymentReturnPageClient />;
}
