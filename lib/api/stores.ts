import { apiGet } from "./client";
import type { Listing, SortKey, Store, StoreCategory } from "./types";

export const STORES_PAGE_SIZE = 12;
export const PRODUCTS_PAGE_SIZE = 24;

export interface StoreQuery {
  search?: string;
  category?: string;
  county?: string;
  subcounty?: string;
  lat?: number;
  lng?: number;
  maxDistanceKm?: number;
  nearestFirst?: boolean;
  offset?: number;
  limit?: number;
  /** Set to zero for viewer-specific location requests; do not share their cache. */
  revalidate?: number;
}

export interface StorePage {
  items: Store[];
  total: number;
}

/** Active stores, newest first: the directory. */
export async function listStores(query: StoreQuery = {}): Promise<StorePage> {
  const params = new URLSearchParams({
    limit: String(query.limit ?? STORES_PAGE_SIZE),
    offset: String(query.offset ?? 0),
    with_total: "true",
  });
  if (query.search) params.set("search", query.search.slice(0, 100));
  if (query.category) params.set("category", query.category);
  if (query.county) params.set("county", query.county);
  if (query.subcounty) params.set("subcounty", query.subcounty);
  if (query.lat != null) params.set("lat", String(query.lat));
  if (query.lng != null) params.set("lng", String(query.lng));
  if (query.maxDistanceKm != null) params.set("max_distance_km", String(query.maxDistanceKm));
  if (query.nearestFirst) params.set("nearest_first", "true");
  const page = await apiGet<StorePage | Store[]>(
    `/stores?${params}`,
    query.revalidate === undefined ? undefined : { revalidate: query.revalidate },
  );
  if (!page) return { items: [], total: 0 };
  // Tolerate an older API that answers with a bare list.
  return Array.isArray(page) ? { items: page, total: page.length } : page;
}

const LINK_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The store with this link name, or null when there is no such store. */
export async function getStoreBySlug(name: string): Promise<Store | null> {
  const slug = name.toLowerCase();
  if (!LINK_NAME.test(slug) || slug.length > 64) return null;
  return apiGet<Store>(`/stores/slug/${slug}`, { tags: [`store:${slug}`] });
}

// Store ids come from the API's own responses; they are still encoded before
// going into a path, so an odd id cannot point the request at another route.
export async function getStoreCategories(storeId: string): Promise<StoreCategory[]> {
  return (await apiGet<StoreCategory[]>(`/stores/${encodeURIComponent(storeId)}/categories`, { tags: [`store-id:${storeId}`] })) ?? [];
}

export interface CatalogueQuery {
  search?: string;
  category?: string;
  sort?: SortKey;
  offset?: number;
  limit?: number;
}

export interface ListingPage {
  items: Listing[];
  total: number;
}

/** A store's products, in the same card format as the app's Home. */
export async function getStoreListings(storeId: string, query: CatalogueQuery = {}): Promise<ListingPage> {
  const params = new URLSearchParams({
    limit: String(query.limit ?? PRODUCTS_PAGE_SIZE),
    offset: String(query.offset ?? 0),
    with_total: "true",
  });
  if (query.search) params.set("search", query.search.slice(0, 100));
  if (query.category) params.set("category", query.category);
  if (query.sort && query.sort !== "featured") params.set("sort", query.sort);
  const page = await apiGet<ListingPage | Listing[]>(`/stores/${encodeURIComponent(storeId)}/listings?${params}`, {
    tags: [`store-id:${storeId}`],
  });
  if (!page) return { items: [], total: 0 };
  return Array.isArray(page) ? { items: page, total: page.length } : page;
}
