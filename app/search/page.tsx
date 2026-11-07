import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search the BROKA marketplace",
  description: "Search products and stores across the BROKA marketplace in Kenya.",
  path: "/search",
  noIndex: true,
});

/** Keep old shared links working while consolidating discovery in /browse. */
export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  redirect(withQuery("/browse", { q: firstParam(sp.q), category: firstParam(sp.category) }));
}
