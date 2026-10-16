import Link from "next/link";
import { CategoryChips } from "./CategoryChips";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";
import { ApiNotice, EmptyState } from "./StateMessage";
import { canonicalCategory } from "@/lib/categories";
import { withQuery } from "@/lib/params";
import type { ListingPage } from "@/lib/api/listings";
import { CategoryLanding } from "./CategoryLanding";
import {
  MARKETPLACE_SORT_OPTIONS,
  parseMarketplaceCondition,
  parseMarketplaceSort,
  parsePriceKes,
  sortParam,
  type MarketplaceCondition,
  type MarketplaceSort,
} from "@/lib/marketplace-filters";

/**
 * The sort options are the app's, label for label (`feed_sort_row.dart`).
 * "Top ranked" is the backend's own ranking rather than a date order, and it
 * is the default, so it travels as no parameter at all.
 */
const sortOptions = MARKETPLACE_SORT_OPTIONS;

export function BrowseView({
  q,
  category,
  sort,
  condition,
  minPrice,
  maxPrice,
  location,
  result,
  failed,
}: {
  q?: string;
  category?: string;
  sort: MarketplaceSort;
  condition?: MarketplaceCondition;
  minPrice?: number;
  maxPrice?: number;
  /** Free text matched against the listing's location, as the app's filter sends it. */
  location?: string;
  result: ListingPage;
  failed: boolean;
}) {
  const canonical = canonicalCategory(category);
  if (canonical) {
    return <CategoryLanding category={canonical} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} result={result} failed={failed} />;
  }

  const query = { q, category, sort: sortParam(sort), condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), location };

  return (
    <>
      <section className="browse-hero browse-hero-v0" aria-label="Browse marketplace">
        <div className="wrap">
          <div className="browse-v0-intro">
            <span className="t-eyebrow" id="browse-page-title">Broka Marketplace</span>
          </div>
          <div className="browse-v0-search-slot">
            <SearchForm
              action="/browse"
              value={q}
              placeholder="Search products or places…"
              hidden={{ category }}
              className="sform-lg browse-search browse-search-v0"
              label="Search marketplace"
              filters={{ action: "/browse", category, condition, minPrice, maxPrice, location, sort }}
              filterRowClassName="browse-search-filter-row"
            />
          </div>
          <div className="browse-route-signal" aria-label="Live marketplace status">
            <span className="browse-route-signal-dot" aria-hidden="true" />
            <span><b>LIVE CATALOGUE</b><small>Listings update as sellers post</small></span>
          </div>
          <div className="browse-v0-controls">
            <div className="browse-category-discovery-head">
              <span>Explore categories</span>
              <Link href="/categories" className="browse-see-all-categories">See all categories <span aria-hidden="true">↗</span></Link>
            </div>
            <CategoryChips
              basePath="/browse"
              active={category ?? null}
              className="browse-category-rail browse-v0-category-rail"
              keep={{ q, sort: sortParam(sort), condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), location }}
            />
          </div>
        </div>
      </section>
      <section className="browse-section browse-v0-results" aria-label="Marketplace listings">
        <div className="wrap">
          <div className="browse-toolbar browse-v0-toolbar listing-v0-toolbar">
            <div>
              <p className="browse-count" role="status">
                {failed
                  ? "Marketplace unavailable"
                  : `${result.total.toLocaleString("en-KE")} ${result.total === 1 ? "listing" : "listings"}`}
              </p>
              {category && <Link href={withQuery("/browse", { q })} className="browse-clear">Clear category</Link>}
            </div>
            <nav className="browse-sort" aria-label="Sort listings">
              {sortOptions.map((option) => (
                <Link key={option.key} href={withQuery("/browse", { ...query, sort: sortParam(option.key) })} className={sort === option.key ? "active" : ""} aria-current={sort === option.key ? "page" : undefined}>
                  {option.label}
                </Link>
              ))}
            </nav>
          </div>
          {failed ? (
            <ApiNotice retryHref={withQuery("/browse", query)} />
          ) : result.items.length === 0 ? (
            <EmptyState emoji="🔎" title="Nothing matches yet">
              Try another search or browse a different category. New products appear on BROKA every day.
            </EmptyState>
          ) : (
            <div className="lgrid browse-grid">
              {result.items.map((listing) => <ProductCard key={listing.id} listing={listing} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Re-exported for the browse routes, which have always imported them from here.
export const parseBrowseSort = parseMarketplaceSort;
export const parseBrowseCondition = parseMarketplaceCondition;
export const parseBrowsePrice = parsePriceKes;

export function parseBrowseCategory(value?: string) {
  return canonicalCategory(value);
}
