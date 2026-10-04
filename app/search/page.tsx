import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the BROKA marketplace.",
  robots: { index: false, follow: true },
};

/** Keep old shared links working while consolidating discovery in /browse. */
export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  redirect(withQuery("/browse", { q: firstParam(sp.q), category: firstParam(sp.category) }));
}
