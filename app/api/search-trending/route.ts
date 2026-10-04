import { NextResponse } from "next/server";
import { getTrendingSearches } from "@/lib/searchAnalytics";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { items: getTrendingSearches(6) },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } },
  );
}
