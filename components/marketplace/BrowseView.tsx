import Link from "next/link";
import { Home } from "lucide-react";
import { CategoryChips } from "./CategoryChips";
import { Pagination } from "./Pagination";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";
import { ApiNotice, EmptyState } from "./StateMessage";
import { CATEGORIES, canonicalCategory } from "@/lib/categories";
import { withQuery } from "@/lib/params";
import { LISTINGS_PAGE_SIZE, type ListingPage } from "@/lib/api/listings";
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
  page = 1,
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
  /** 1-based page of `LISTINGS_PAGE_SIZE` listings. */
  page?: number;
  result: ListingPage;
  failed: boolean;
}) {
  const canonical = canonicalCategory(category);
  if (canonical) {
    return <CategoryLanding category={canonical} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} page={page} result={result} failed={failed} />;
  }

  const query = { q, category, sort: sortParam(sort), condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), location };
  const pageCount = Math.max(1, Math.ceil(result.total / LISTINGS_PAGE_SIZE));
  const pageHref = (target: number) => withQuery("/browse", { ...query, page: target > 1 ? target : undefined });
  const activeSortLabel = sortOptions.find((option) => option.key === sort)?.label ?? sortOptions[0].label;

  return (
    <>
      <section className="browse-hero browse-hero-v0 mk-premium mk-hero" aria-label="Browse marketplace">
        <div className="wrap">
          <div className="mk-deck">
            <nav className="mk-deck-nav" aria-label="Marketplace navigation">
              <Link href="/" className="mk-home-link">
                <Home size={15} aria-hidden="true" />
                <span>Home</span>
              </Link>
              <span className="mk-deck-path" aria-hidden="true">BROKA <i>/</i> MARKETPLACE</span>
            </nav>
            <div className="browse-route-signal" aria-label="Live marketplace status">
              <span className="browse-route-signal-dot" aria-hidden="true" />
              <span><b>LIVE CATALOGUE</b><small>Listings update as sellers post</small></span>
            </div>
          </div>
          <div className="mk-hero-head">
            <div className="browse-v0-intro mk-hero-intro">
              <h1 className="mk-hero-title" id="browse-page-title">
                <span className="mk-hero-title-lead">Broka</span> <span className="mk-hero-title-accent">Marketplace</span>
              </h1>
              <p className="mk-hero-sub">Real listings from Kenyan sellers, with price, place and seller context side by side.</p>
            </div>
            <dl className="mk-hud">
              <div>
                <dt>Listings</dt>
                <dd>{failed ? "—" : result.total.toLocaleString("en-KE")}</dd>
              </div>
              <div>
                <dt>Categories</dt>
                <dd>{CATEGORIES.length}</dd>
              </div>
              <div>
                <dt>Sorted by</dt>
                <dd>{activeSortLabel}</dd>
              </div>
              <div>
                <dt>Page</dt>
                <dd>{failed ? "—" : `${page} / ${pageCount}`}</dd>
              </div>
            </dl>
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
          <div className="browse-v0-controls">
            <div className="browse-category-discovery-head">
              <span>Shop by category</span>
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
      <section className="browse-section browse-v0-results mk-premium mk-results" aria-label="Marketplace listings">
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
            <ApiNotice retryHref={pageHref(page)} />
          ) : result.items.length === 0 && page > 1 && result.total > 0 ? (
            <EmptyState emoji="🔎" title="This page is past the last listing" actions={[{ label: "Go to the first page", href: pageHref(1), primary: true }]}>
              {`There ${pageCount === 1 ? "is 1 page" : `are ${pageCount} pages`} of listings for this search.`}
            </EmptyState>
          ) : result.items.length === 0 ? (
            <EmptyState emoji="🔎" title="Nothing matches yet">
              Try another search or browse a different category. New products appear on BROKA every day.
            </EmptyState>
          ) : (
            <>
              <div className="lgrid browse-grid">
                {result.items.map((listing) => <ProductCard key={listing.id} listing={listing} />)}
              </div>
              <Pagination page={page} pageCount={pageCount} hrefFor={pageHref} />
            </>
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
