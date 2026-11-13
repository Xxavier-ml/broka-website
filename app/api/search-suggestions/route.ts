import { NextResponse } from "next/server";
import { listListings } from "@/lib/api/listings";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().slice(0, 100) ?? "";
  if (q.length < 2) return NextResponse.json({ items: [] });

  try {
    // No sort: the API's own ranking puts the best matches first. "recent"
    // returned the six newest matches, however loosely they matched.
    const result = await listListings({ search: q, limit: 6 });
    return NextResponse.json(
      {
        items: result.items.map((listing) => ({
          id: listing.id,
          name: listing.name,
          category: listing.category,
          location: listing.location_name ?? listing.location_county ?? null,
          price: listing.price,
          priceUnit: listing.price_unit ?? null,
        })),
      },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } },
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
