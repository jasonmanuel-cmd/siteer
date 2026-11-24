import QuoteForm from "./QuoteForm";
import { isOfferId, websiteAddress } from "@/lib/plans";

export default async function GetQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[]; url?: string | string[] }>;
}) {
  const { plan, url } = await searchParams;
  return (
    <QuoteForm
      initialPlan={isOfferId(plan) ? plan : "fixpack"}
      initialWebsite={websiteAddress(url)}
    />
  );
}
