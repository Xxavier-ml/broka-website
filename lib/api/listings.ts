import { apiGet } from "./client";
import type { Listing } from "./types";

export interface ListingStats {
  total: number;
  active: number;
  sold: number;
}

export interface ListingQuery {
  search?: string;
  category?: string;
  sort?: "recent" | "price_low" | "price_high" | "featured";
  condition?: "new" | "used" | "refurbished";
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  offset?: number;
  limit?: number;
}

export interface ListingPage {
  items: Listing[];
  total: number;
}

/** Public direct-price listings for the storefront catalogue. */
export async function listListings(query: ListingQuery = {}): Promise<ListingPage> {
  const params = new URLSearchParams({
    listing_type: "direct",
    status: "active",
    limit: String(query.limit ?? 24),
    offset: String(query.offset ?? 0),
    with_total: "true",
  });
  if (query.search) params.set("search", query.search.slice(0, 100));
  if (query.category) params.set("category", query.category);
  if (query.county) params.set("county", query.county);
  if (query.condition) params.set("condition", query.condition);
  if (query.minPrice != null) params.set("min_price", String(query.minPrice));
  if (query.maxPrice != null) params.set("max_price", String(query.maxPrice));
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  const page = await apiGet<ListingPage | Listing[]>(`/listings/?${params}`, { revalidate: 60 });
  if (!page) return { items: [], total: 0 };
  return Array.isArray(page) ? { items: page, total: page.length } : page;
}

const LISTING_ID = /^[A-Za-z0-9-]{1,64}$/;

/** One listing (public fields only), or null when it does not exist or is not visible to buyers. */
export async function getListing(id: string): Promise<Listing | null> {
  if (!LISTING_ID.test(id)) return null;
  return apiGet<Listing>(`/listings/${id}`, { tags: [`listing:${id}`] });
}

/** Marketplace-wide counts, for the home page's numbers. */
export async function getListingStats(): Promise<ListingStats | null> {
  return apiGet<ListingStats>("/listings/stats", { revalidate: 300 });
}
