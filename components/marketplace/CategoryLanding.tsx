import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import type { ListingPage } from "@/lib/api/listings";
import { categoryPageContent } from "@/lib/category-pages";
import { categorySlug, categoryVisual } from "@/lib/categories";
import { withQuery } from "@/lib/params";
import { ApiNotice, EmptyState } from "./StateMessage";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";
import { CategoryZoneControls } from "./CategoryZoneControls";
import { CategorySubcategoryGrid } from "./CategorySubcategoryGrid";
import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";

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
  categoryNode,
  subcategories,
  filters,
  subcategoryId,
  attributes,
  subcategoryName,
  routeOverride,
  heroArt,
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
  categoryNode?: CategoryNode | null;
  subcategories?: CategoryNode[];
  filters?: CategoryFilterField[];
  subcategoryId?: string;
  attributes?: Record<string, string>;
  subcategoryName?: string;
  routeOverride?: string;
  heroArt?: string;
}) {
  const content = categoryPageContent(category);
  if (!content) return null;

  const visual = categoryVisual(content.category);
  const route = routeOverride ?? `/browse/${categorySlug(content.category)}`;
  const theme = {
    "--category-start": visual.gradient[0],
    "--category-end": visual.gradient[1],
    "--category-art": heroArt || visual.backgroundArt ? `url(${heroArt ?? visual.backgroundArt})` : "none",
  } as CSSProperties;
  const preserved = {
    q,
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    county,
    sort: sort === "featured" ? undefined : sort,
  };
  const activeFilters = {
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    county,
    sort: sort === "featured" ? undefined : sort,
  };
  const retryHref = withQuery(route, { ...preserved, ...activeFilters });
  const agricultureQuickNames = new Set(["Farm Equipment", "Farm Tools", "Fertilizers & Agrochemicals"]);
  const quickSubcategories = content.category === "Agriculture"
    ? (subcategories ?? []).filter((subcategory) => agricultureQuickNames.has(subcategory.name))
    : (subcategories ?? []);
  const showAgricultureQuickFilters = content.category === "Agriculture" && !subcategoryName;

  return (
    <>
      <section className="category-hero browse-hero category-hero-listing" style={theme} aria-labelledby="category-page-title">
        <div className="wrap category-listing-hero">
          <div className="category-hero-copy">
            <Link href={subcategoryName ? `/browse/${categorySlug(content.category)}` : "/browse"} className="category-back">
              <ArrowLeft size={15} aria-hidden="true" /> {subcategoryName ? content.category : "All products"}
            </Link>
            <h1 className="category-title" id="category-page-title">
              {subcategoryName ? <>{subcategoryName} <span>in {content.category}</span></> : <>{content.titleLead} <span>{content.titleAccent}</span></>}
            </h1>
            <p className="category-intro">{subcategoryName ? `Explore ${subcategoryName.toLowerCase()} from Kenyan sellers on BROKA.` : content.intro}</p>
          </div>
          <SearchForm
            action={route}
            value={q}
            placeholder={content.searchPlaceholder}
            hidden={activeFilters}
            label={`Search ${content.category} listings`}
            className="sform-lg browse-search browse-search-v0 category-search"
            filters={{ action: route, category: content.category, condition, minPrice, maxPrice, county, sort }}
            filterRowClassName="category-search-filter-row"
          />
        </div>
      </section>

      <section className={`category-results browse-section category-results-${categorySlug(content.category)}`} aria-label={`${content.category} listings`}>
        <div className="wrap">
          {!subcategoryName && <CategorySubcategoryGrid category={content.category} route={route} subcategories={subcategories ?? []} keep={preserved} />}
          {(subcategoryName || !(subcategories?.length) || showAgricultureQuickFilters) && <CategoryZoneControls route={route} category={categoryNode ?? null} subcategories={quickSubcategories} showSubcategories={showAgricultureQuickFilters} filters={filters ?? []} q={q} subcategoryId={subcategoryId} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} sort={sort} attributes={attributes ?? {}} />}
          <div className="listing-v0-toolbar category-results-toolbar">
            <p className="browse-count" role="status">
              {failed ? "Listings unavailable" : `${result.total.toLocaleString("en-KE")} ${result.total === 1 ? "listing" : "listings"}`}
            </p>
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
