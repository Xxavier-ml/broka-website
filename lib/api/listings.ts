import { apiGet } from "./client";
import type { Listing } from "./types";
import { sortParam, type AttributeValue, type MarketplaceSort } from "@/lib/marketplace-filters";

export interface ListingStats {
  total: number;
  active: number;
  sold: number;
}

/**
 * The one feed query both the app and this site use: `GET /listings/`,
 * parameter for parameter.
 *
 * The identifiers the API accepts are `category_id` / `subcategory_id` (never
 * the category name - the app's zone screen passes the id it got from the
 * category tree), plus `location`, `condition`, `min_price`, `max_price`,
 * `search`, `attributes`, `sort`, `limit`, `offset` and `with_total`. There is
 * no `county`, no `listing_type` and no `status` parameter on this route, so
 * sending them would silently filter nothing.
 */
export interface ListingQuery {
  search?: string;
  /** Category name. Only a fallback for when the id is not known yet. */
  category?: string;
  categoryId?: string;
  subcategoryId?: string;
  /** Every filter that is not one of the reserved ones, as the app sends it. */
  attributes?: Record<string, AttributeValue>;
  sort?: MarketplaceSort;
  condition?: "new" | "used" | "refurbished";
  minPrice?: number;
  maxPrice?: number;
  /** Free text matched against a listing's location name (`service.py:784`). */
  location?: string;
  offset?: number;
  limit?: number;
}

export interface ListingPage {
  items: Listing[];
  total: number;
}

/** Public listings in the marketplace feed, 20 to a page like the app. */
export async function listListings(query: ListingQuery = {}): Promise<ListingPage> {
  const params = new URLSearchParams({
    limit: String(query.limit ?? 20),
    offset: String(query.offset ?? 0),
    with_total: "true",
  });
  if (query.search) params.set("search", query.search.slice(0, 100));
  // One scope per request, most specific first - the API short-circuits
  // `category_id` the moment a `subcategory_id` is present, and the app's two
  // screens send exactly one of them: the subcategory screen sends only
  // `subcategory_id`, the category zone sends only `category_id`.
  if (query.subcategoryId) params.set("subcategory_id", query.subcategoryId);
  else if (query.categoryId) params.set("category_id", query.categoryId);
  else if (query.category) params.set("category", query.category);
  if (query.attributes && Object.keys(query.attributes).length) params.set("attributes", JSON.stringify(query.attributes));
  if (query.location) params.set("location", query.location);
  if (query.condition) params.set("condition", query.condition);
  if (query.minPrice != null) params.set("min_price", String(query.minPrice));
  if (query.maxPrice != null) params.set("max_price", String(query.maxPrice));
  const sort = query.sort ? sortParam(query.sort) : undefined;
  if (sort) params.set("sort", sort);
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
