import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import type { ListingPage } from "@/lib/api/listings";
import { withQuery } from "@/lib/params";
import { ApiNotice, EmptyState } from "./StateMessage";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { ProductCard } from "./ProductCard";
import { SearchForm } from "./SearchForm";

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "recent", label: "Newest" },
  { key: "price_low", label: "Price: low to high" },
  { key: "price_high", label: "Price: high to low" },
] as const;

type GamingSort = (typeof sortOptions)[number]["key"];

export function GamingZone({
  q,
  sort,
  condition,
  minPrice,
  maxPrice,
  county,
  result,
  failed,
}: {
  q?: string;
  sort: GamingSort;
  condition?: "new" | "used" | "refurbished";
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  result: ListingPage;
  failed: boolean;
}) {
  const preserved = {
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    county,
  };
  const searchFilters = {
    ...preserved,
    sort: sort === "featured" ? undefined : sort,
  };
  const retryHref = withQuery("/browse/gaming", { q, ...searchFilters });

  return (
    <>
      <section className="gaming-hero browse-hero" aria-labelledby="gaming-zone-title">
        <div className="wrap gaming-hero-grid">
          <div className="gaming-hero-copy">
            <Link href="/browse" className="gaming-back">
              <ArrowLeft size={15} aria-hidden="true" /> All categories
            </Link>
            <p className="gaming-kicker">
              <Gamepad2 size={15} aria-hidden="true" /> BROKA GAMING
            </p>
            <h1 className="gaming-title" id="gaming-zone-title">
              Gaming <span>Zone</span>
            </h1>
            <p className="gaming-intro">
              Find gaming gear from Kenyan sellers. Compare listings, then negotiate with confidence.
            </p>
            <SearchForm
              action="/browse/gaming"
              value={q}
              placeholder="Search consoles, games, accessories…"
              hidden={searchFilters}
              label="Search gaming listings"
              className="sform-lg gaming-search"
            />
          </div>
          <div className="gaming-art" aria-hidden="true">
            <span className="gaming-art-orbit" />
            <span className="gaming-art-core"><Gamepad2 size={78} strokeWidth={1.2} /></span>
            <span className="gaming-art-label">DISCOVER · COMPARE · NEGOTIATE</span>
          </div>
        </div>
      </section>

      <section className="gaming-results browse-section" aria-labelledby="gaming-listings-title">
        <div className="wrap">
          <header className="gaming-results-head">
            <div>
              <span className="t-eyebrow">The gaming marketplace</span>
              <h2 id="gaming-listings-title">Gaming listings</h2>
            </div>
            <p className="browse-count" aria-live="polite">
              {failed ? "Listings unavailable" : `${result.total.toLocaleString("en-KE")} listings`}
            </p>
          </header>

          <div className="gaming-toolbar">
            <nav className="browse-sort" aria-label="Sort gaming listings">
              {sortOptions.map((option) => (
                <Link
                  key={option.key}
                  href={withQuery("/browse/gaming", {
                    q,
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
              category="Gaming"
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
              emoji="🎮"
              title={q ? `No gaming listings for “${q}”` : "No gaming listings yet"}
              actions={[
                { label: "Clear gaming filters", href: "/browse/gaming", primary: true },
                { label: "Browse all categories", href: "/browse" },
              ]}
            >
              Try another search or remove a filter. New gaming listings will appear here when sellers add them.
            </EmptyState>
          ) : (
            <div className="lgrid browse-grid gaming-grid">
              {result.items.map((listing) => <ProductCard key={listing.id} listing={listing} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
