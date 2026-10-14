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
import { SortSelect } from "./SortSelect";
import { CategorySubcategoryGrid } from "./CategorySubcategoryGrid";
import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";
import {
  MARKETPLACE_SORT_OPTIONS,
  attributeParam,
  facetRowLabel,
  fieldLabel,
  leadingFacetField,
  scalarAttribute,
  sheetFields,
  sortParam,
  type AttributeValue,
  type MarketplaceCondition,
  type MarketplaceSort,
} from "@/lib/marketplace-filters";

/** The app's sort labels, and its default ranking for the first entry. */
const sortOptions: { key: MarketplaceSort; label: string }[] = MARKETPLACE_SORT_OPTIONS.map((option) => ({ key: option.key, label: option.label }));

export function CategoryLanding({
  category,
  q,
  sort,
  condition,
  minPrice,
  maxPrice,
  location,
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
  sort: MarketplaceSort;
  condition?: MarketplaceCondition;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  result: ListingPage;
  failed: boolean;
  categoryNode?: CategoryNode | null;
  subcategories?: CategoryNode[];
  filters?: CategoryFilterField[];
  subcategoryId?: string;
  attributes?: Record<string, AttributeValue>;
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
    location,
    sort: sortParam(sort),
  };
  const activeFilters = {
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    location,
    sort: sortParam(sort),
  };
  // Changing the sort, or searching, must not throw the filters away, so the
  // attribute parameters ride along on the sort links and the search form too.
  const attributeQuery: Record<string, string | undefined> = {};
  for (const [name, value] of Object.entries(attributes ?? {})) {
    if (typeof value === "string") {
      attributeQuery[attributeParam(name)] = value;
      continue;
    }
    if (value.min != null) attributeQuery[`${attributeParam(name)}_min`] = String(value.min);
    if (value.max != null) attributeQuery[`${attributeParam(name)}_max`] = String(value.max);
  }
  const retryHref = withQuery(route, { ...preserved, ...activeFilters, ...attributeQuery });
  const facet = leadingFacetField(filters ?? []);
  const facetValue = facet ? scalarAttribute(attributes?.[facet.field_name]) : "";
  const noun = (subcategoryName ?? content.category).toLowerCase();
  const sortHrefs = Object.fromEntries(
    MARKETPLACE_SORT_OPTIONS.map((option) => [option.key, withQuery(route, { ...preserved, ...attributeQuery, sort: sortParam(option.key) })]),
  ) as Record<MarketplaceSort, string>;
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
              {subcategoryName ? <>{subcategoryName}</> : <>{content.titleLead} <span>{content.titleAccent}</span></>}
            </h1>
            <p className="category-intro">{subcategoryName ? `Explore ${subcategoryName.toLowerCase()} from Kenyan sellers on BROKA.` : content.intro}</p>
          </div>
          <SearchForm
            action={route}
            value={q}
            placeholder={subcategoryName ? `Search in ${subcategoryName}...` : content.searchPlaceholder}
            hidden={{ ...activeFilters, ...attributeQuery }}
            label={`Search ${subcategoryName ?? content.category} listings`}
            className="sform-lg browse-search browse-search-v0 category-search"
            filters={{
              action: route,
              category: content.category,
              condition,
              minPrice,
              maxPrice,
              location,
              sort,
              // The sheet carries the subcategory's own fields (storage, RAM...), minus the brand row.
              fields: sheetFields(filters ?? [], subcategoryName ? facet : null),
              attributes,
              subcategoryId: subcategoryName ? undefined : subcategoryId,
            }}
            filterRowClassName="category-search-filter-row"
          />
        </div>
      </section>

      <section className={`category-results browse-section category-results-${categorySlug(content.category)}`} aria-label={`${content.category} listings`}>
        <div className="wrap">
          {!subcategoryName && <CategorySubcategoryGrid category={content.category} route={route} subcategories={subcategories ?? []} keep={preserved} />}
          {(subcategoryName || !(subcategories?.length) || showAgricultureQuickFilters) && <CategoryZoneControls facetOnly={Boolean(subcategoryName)} route={route} category={categoryNode ?? null} subcategories={quickSubcategories} showSubcategories={showAgricultureQuickFilters} filters={filters ?? []} q={q} subcategoryId={subcategoryId} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} sort={sort} attributes={attributes ?? {}} />}
          <div className="listing-v0-toolbar category-results-toolbar">
            <p className="browse-count" role="status">
              {failed ? "Listings unavailable" : `${result.total.toLocaleString("en-KE")} ${result.total === 1 ? "result" : "results"}`}
            </p>
            <SortSelect value={sort} hrefs={sortHrefs} label={`Sort ${subcategoryName ?? content.category} listings`} />
          </div>

          {failed ? (
            <ApiNotice retryHref={retryHref} />
          ) : result.items.length === 0 ? (
            facetValue && facet ? (
              <EmptyState
                emoji={visual.emoji}
                title={`No ${facetValue} in ${subcategoryName ?? content.category} yet`}
                actions={[{ label: `All ${facetRowLabel(facet).toLowerCase()}`, href: withQuery(route, { ...preserved, ...Object.fromEntries(Object.entries(attributeQuery).filter(([key]) => key !== attributeParam(facet.field_name))) }), primary: true }]}
              >
                Try another {fieldLabel(facet.field_name).toLowerCase()}, or see every one.
              </EmptyState>
            ) : (
              <EmptyState
                emoji={visual.emoji}
                title={q ? `No ${noun} listings for “${q}”` : `No ${subcategoryName ?? content.category} listings yet`}
                actions={[
                  { label: "Clear filters", href: route, primary: true },
                  { label: "Browse all categories", href: "/browse" },
                ]}
              >
                {q || condition || minPrice != null || maxPrice != null || location || Object.keys(attributes ?? {}).length
                  ? "Try adjusting your filters."
                  : `New ${noun} will show here as sellers list them.`}
              </EmptyState>
            )
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
