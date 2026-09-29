import { apiGet } from "./client";
import type { Listing } from "./types";

export interface ListingStats {
  total: number;
  active: number;
  sold: number;
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
