import Link from "next/link";
import { CategoryChips } from "./CategoryChips";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";
import { ApiNotice, EmptyState } from "./StateMessage";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { canonicalCategory } from "@/lib/categories";
import { withQuery } from "@/lib/params";
import type { ListingPage } from "@/lib/api/listings";
import { CategoryLanding } from "./CategoryLanding";

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Newest" },
  { key: "price_low", label: "Price: low to high" },
  { key: "price_high", label: "Price: high to low" },
] as const;

export function BrowseView({
  q,
  category,
  sort,
  condition,
  minPrice,
  maxPrice,
  county,
  result,
  failed,
}: {
  q?: string;
  category?: string;
  sort: (typeof sortOptions)[number]["key"];
  condition?: "new" | "used" | "refurbished";
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  result: ListingPage;
  failed: boolean;
}) {
  const canonical = canonicalCategory(category);
  if (canonical) {
    return <CategoryLanding category={canonical} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={result} failed={failed} />;
  }

  const heading = category ? `${category} for every kind of buyer` : q ? `Results for “${q}”` : "Browse the marketplace";
  const query = { q, category, sort: sort === "featured" ? undefined : sort, condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), county };

  return (
    <>
      <section className="browse-hero">
        <div className="wrap">
          <span className="t-eyebrow">BROKA marketplace</span>
          <h1 className="t-h1">{heading}</h1>
          <p className="t-body-lg">Discover products from Kenyan sellers, then negotiate or buy with more context.</p>
          <SearchForm action="/browse" value={q} placeholder="Search phones, cars, land, homes…" hidden={{ category }} className="sform-lg browse-search" label="Search marketplace" />
        </div>
      </section>
      <section className="sec-sm browse-section" aria-label="Marketplace listings">
        <div className="wrap">
          {/* Categories, the result count and sorting are one control block.
              Spread across the section they read as unrelated widgets. */}
          <div className="filter-panel">
            <div className="browse-categories-head">
              <span className="browse-category-label">Filter by category</span>
              <span className="browse-category-hint">Swipe to explore</span>
            </div>
            <CategoryChips
              basePath="/browse"
              active={category ?? null}
              keep={{ q, sort: sort === "featured" ? undefined : sort, condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), county }}
            />
            <div className="browse-toolbar">
              <div>
                <p className="browse-count">{failed ? "Marketplace unavailable" : `${result.total.toLocaleString("en-KE")} listings to explore`}</p>
                {category && <Link href={withQuery("/browse", { q })} className="browse-clear">Clear category</Link>}
              </div>
              <nav className="browse-sort" aria-label="Sort listings">
                {sortOptions.map((option) => (
                  <Link key={option.key} href={withQuery("/browse", { ...query, sort: option.key === "featured" ? undefined : option.key })} className={sort === option.key ? "active" : ""} aria-current={sort === option.key ? "page" : undefined}>
                    {option.label}
                  </Link>
                ))}
              </nav>
              <MobileFilterDrawer q={q} category={category} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} sort={sort} />
            </div>
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

export function parseBrowseSort(value?: string) {
  return sortOptions.some((option) => option.key === value) ? (value as (typeof sortOptions)[number]["key"]) : "featured";
}

export function parseBrowseCategory(value?: string) {
  return canonicalCategory(value);
}

export function parseBrowseCondition(value?: string) {
  return value === "new" || value === "used" || value === "refurbished" ? value : undefined;
}

export function parseBrowsePrice(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}
