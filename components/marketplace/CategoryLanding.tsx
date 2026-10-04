import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import type { ListingPage } from "@/lib/api/listings";
import { categoryPageContent } from "@/lib/category-pages";
import { categorySlug, categoryVisual } from "@/lib/categories";
import { withQuery } from "@/lib/params";
import { ApiNotice, EmptyState } from "./StateMessage";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";

type CategorySort = "featured" | "recent" | "price_low" | "price_high";
const sortOptions: { key: CategorySort; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Newest" },
  { key: "price_low", label: "Price: low to high" },
  { key: "price_high", label: "Price: high to low" },
];

export function CategoryLanding({
  category,
  q,
  sort,
  condition,
  minPrice,
  maxPrice,
  county,
  result,
  failed,
}: {
  category: string;
  q?: string;
  sort: CategorySort;
  condition?: "new" | "used" | "refurbished";
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  result: ListingPage;
  failed: boolean;
}) {
  const content = categoryPageContent(category);
  if (!content) return null;

  const visual = categoryVisual(content.category);
  const route = `/browse/${categorySlug(content.category)}`;
  const theme = {
    "--category-start": visual.gradient[0],
    "--category-end": visual.gradient[1],
  } as CSSProperties;
  const preserved = {
    q,
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    county,
  };
  const activeFilters = {
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    county,
    sort: sort === "featured" ? undefined : sort,
  };
  const retryHref = withQuery(route, { ...preserved, ...activeFilters });

  return (
    <>
      <section className="category-hero browse-hero" style={theme} aria-labelledby="category-page-title">
        <div className="wrap category-hero-grid">
          <div className="category-hero-copy">
            <Link href="/browse" className="category-back">
              <ArrowLeft size={15} aria-hidden="true" /> All categories
            </Link>
            <p className="category-kicker">
              <span aria-hidden="true">{visual.emoji}</span> BROKA {content.category.toUpperCase()}
            </p>
            <h1 className="category-title" id="category-page-title">
              {content.titleLead} <span>{content.titleAccent}</span>
            </h1>
            <p className="category-intro">{content.intro}</p>
            <SearchForm
              action={route}
              value={q}
              placeholder={content.searchPlaceholder}
              hidden={activeFilters}
              label={`Search ${content.category} listings`}
              className="sform-lg category-search"
            />
          </div>
          <div className="category-art" aria-hidden="true">
            <span className="category-art-orbit" />
            <span className="category-art-core">{visual.emoji}</span>
            <span className="category-art-label">DISCOVER · COMPARE · NEGOTIATE</span>
          </div>
        </div>
      </section>

      <section className="category-results browse-section" aria-labelledby="category-listings-title">
        <div className="wrap">
          <header className="category-results-head">
            <div>
              <span className="t-eyebrow">The {content.category} marketplace</span>
              <h2 id="category-listings-title">{content.category} listings</h2>
            </div>
            <p className="browse-count" aria-live="polite">
              {failed ? "Listings unavailable" : `${result.total.toLocaleString("en-KE")} listings`}
            </p>
          </header>

          <div className="category-toolbar">
            <nav className="browse-sort" aria-label={`Sort ${content.category} listings`}>
              {sortOptions.map((option) => (
                <Link
                  key={option.key}
                  href={withQuery(route, {
                    ...preserved,
                    sort: option.key === "featured" ? undefined : option.key,
                  })}
                  className={sort === option.key ? "active" : ""}
                  aria-current={sort === option.key ? "page" : undefined}
                >
                  {option.label}
                </Link>
              ))}
            </nav>
            <MobileFilterDrawer
              q={q}
              category={content.category}
              condition={condition}
              minPrice={minPrice}
              maxPrice={maxPrice}
              county={county}
              sort={sort}
            />
          </div>

          {failed ? (
            <ApiNotice retryHref={retryHref} />
          ) : result.items.length === 0 ? (
            <EmptyState
              emoji={visual.emoji}
              title={q ? `No ${content.category.toLowerCase()} listings for “${q}”` : `No ${content.category.toLowerCase()} listings yet`}
              actions={[
                { label: "Clear category filters", href: route, primary: true },
                { label: "Browse all categories", href: "/browse" },
              ]}
            >
              Try another search or remove a filter. New listings for this category will appear here as sellers add them.
            </EmptyState>
          ) : (
            <div className="lgrid browse-grid category-grid">
              {result.items.map((listing) => <ProductCard key={listing.id} listing={listing} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
