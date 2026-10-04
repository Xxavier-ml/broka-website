import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Mail, MapPin, Star, PauseCircle } from "lucide-react";
import { AppCta } from "@/components/marketplace/AppCta";
import { Breadcrumbs } from "@/components/marketplace/DetailParts";
import { Pagination } from "@/components/marketplace/Pagination";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { CategoryRail, type CategoryRailItem } from "@/components/marketplace/CategoryRail";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { EmptyState } from "@/components/marketplace/StateMessage";
import { FilterTabs } from "@/components/marketplace/FilterTabs";
import { storeCover, storeLogo } from "@/components/marketplace/StoreCard";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  PRODUCTS_PAGE_SIZE,
  getStoreBySlug,
  getStoreCategories,
  getStoreListings,
  type ListingPage,
} from "@/lib/api/stores";
import { orFallback } from "@/lib/api/client";
import { categoryVisual, canonicalCategory } from "@/lib/categories";
import { clip, monthYearOf, placeLine, plural } from "@/lib/format";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";
import { SITE_URL, mailto } from "@/lib/site";
import type { SortKey, StoreCategory } from "@/lib/api/types";

type Props = { params: Promise<{ slug: string }>; searchParams: SearchParams };

// The API only returns an address once the store has proven it, but this one
// goes into a mailto: link, where "?" or "&" would let a value add headers
// (a bcc, say). Show it only if it is a plain address.
const PLAIN_EMAIL = /^[^\s@?&#<>"']+@[^\s@?&#<>"']+\.[^\s@?&#<>"']+$/;

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price_low", label: "Price: low to high" },
  { key: "price_high", label: "Price: high to low" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const store = await getStoreBySlug(slug).catch(() => null);
  if (!store) return { title: "Store" };
  const image = storeCover(store)?.large;
  const description = clip(
    store.description || `${store.name} is an online store on BROKA${store.county ? ` in ${store.county}` : ""}.`,
  );
  return {
    title: `${store.name} — online store`,
    description,
    alternates: { canonical: `${SITE_URL}/stores/${store.slug}` },
    openGraph: {
      title: store.name,
      description,
      url: `${SITE_URL}/stores/${store.slug}`,
      type: "website",
      ...(image && /^https?:/.test(image) ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function StorePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  const q = firstParam(sp.q);
  const category = canonicalCategory(firstParam(sp.category));
  const sortParam = firstParam(sp.sort, 20);
  const sort = SORTS.find((s) => s.key === sortParam)?.key ?? "featured";
  const page = Math.max(1, Math.min(500, Number.parseInt(firstParam(sp.page, 6) ?? "1", 10) || 1));

  // A paused store keeps its profile but shows no products, like in the app.
  let categories: StoreCategory[] = [];
  let products: { data: ListingPage; failed: boolean } = { data: { items: [], total: 0 }, failed: false };
  if (store.is_active) {
    const [cats, prods] = await Promise.all([
      orFallback(() => getStoreCategories(store.id), []),
      orFallback(
        () =>
          getStoreListings(store.id, {
            search: q,
            category: category ?? undefined,
            sort,
            offset: (page - 1) * PRODUCTS_PAGE_SIZE,
          }),
        { items: [], total: 0 },
      ),
    ]);
    categories = cats.data;
    products = prods;
  }

  const base = `/stores/${store.slug}`;
  const query = { q, category: category ?? undefined, sort: sort === "featured" ? undefined : sort };
  const pageCount = Math.max(1, Math.ceil(products.data.total / PRODUCTS_PAGE_SIZE));
  const cover = storeCover(store);
  const logo = storeLogo(store);
  const v = categoryVisual(store.category);
  const place = placeLine(store.subcounty, store.county, store.country);
  const since = monthYearOf(store.owner?.member_since ?? store.created_at);
  const owner = store.owner;
  const filtered = Boolean(q || category);
  const storeCategoryItems: CategoryRailItem[] = [
    { key: "all", href: withQuery(base, { q, sort: query.sort }), label: "All", count: store.listing_count, active: !category },
    ...categories.map((c) => ({
      key: c.name,
      href: withQuery(base, { ...query, category: c.name }),
      label: c.name,
      emoji: categoryVisual(c.name).emoji,
      count: c.count,
      active: category === c.name,
    })),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: store.name,
          url: `${SITE_URL}${base}`,
          description: store.description ?? undefined,
          image: cover && /^https?:/.test(cover.large) ? cover.large : undefined,
          email: store.business_email && PLAIN_EMAIL.test(store.business_email) ? store.business_email : undefined,
          address: {
            "@type": "PostalAddress",
            addressLocality: store.subcounty ?? store.county ?? undefined,
            addressRegion: store.county ?? undefined,
            addressCountry: "KE",
          },
        }}
      />

      <section className="store-top">
        <div
          className="store-cover"
          style={cover ? undefined : { background: `linear-gradient(135deg, ${v.gradient[0]}44, ${v.gradient[1]}44)` }}
        >
          {cover && <RemoteImage image={cover} alt="" priority sizes="100vw" className="lmedia-img" />}
          <div className="store-cover-fade" aria-hidden="true" />
          <div className="wrap store-crumbs">
            <Breadcrumbs items={[{ label: "Online stores", href: "/stores" }, { label: store.name }]} />
          </div>
        </div>
        <div className="wrap">
          <div className="store-head">
            <div className="store-logo" aria-hidden="true">
              {logo ? <RemoteImage image={logo} alt="" className="lmedia-img" sizes="96px" /> : <span>{store.name.slice(0, 1).toUpperCase()}</span>}
            </div>
            <div className="store-id">
              <h1 className="detail-title">
                {store.name}
                {owner?.verified && <BadgeCheck size={22} className="scard-verified" aria-label="Verified seller" />}
              </h1>
              <p className="store-meta">
                {store.category && (
                  <span className="lcard-cat">
                    <span aria-hidden="true">{v.emoji}</span> {store.category}
                  </span>
                )}
                {place && (
                  <span className="lcard-place">
                    <MapPin size={14} aria-hidden="true" /> {place}
                  </span>
                )}
                {owner?.rating ? (
                  <span className="lcard-place">
                    <Star size={14} aria-hidden="true" /> {owner.rating.toFixed(1)}
                  </span>
                ) : null}
              </p>
            </div>
          </div>

          <div className="store-info">
            <div className="store-about">
              {store.description && <p className="prose store-desc">{store.description}</p>}
              {store.location_description && (
                <p className="t-sm">
                  <MapPin size={13} aria-hidden="true" /> {store.location_description}
                </p>
              )}
            </div>
            <dl className="facts store-facts">
              <div>
                <dt>Products</dt>
                <dd>{store.listing_count}</dd>
              </div>
              {owner && (
                <div>
                  <dt>Completed deals</dt>
                  <dd>{owner.completed_deals}</dd>
                </div>
              )}
              {since && (
                <div>
                  <dt>On BROKA since</dt>
                  <dd>{since}</dd>
                </div>
              )}
              {owner?.name && (
                <div>
                  <dt>Run by</dt>
                  <dd>{owner.name}</dd>
                </div>
              )}
              {store.business_email && store.business_email_verified && PLAIN_EMAIL.test(store.business_email) && (
                <div>
                  <dt>Business email</dt>
                  <dd>
                    <a href={mailto(store.business_email)} className="store-mail">
                      <Mail size={13} aria-hidden="true" /> {store.business_email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="sec-sm listing-sec" aria-label="Products">
        <div className="wrap">
          {!store.is_active ? (
            <EmptyState emoji="⏸️" title="This store is taking a break">
              <PauseCircle size={14} aria-hidden="true" /> Its owner has paused it, so no products are shown right now.
            </EmptyState>
          ) : (
            <>
              {categories.length > 1 && (
                <CategoryRail
                  items={storeCategoryItems}
                  ariaLabel={`${store.name} product categories`}
                  className="store-product-category-rail"
                />
              )}

              <SearchForm
                action={base}
                value={q}
                placeholder={`Search ${store.name} products…`}
                hidden={{ category: category ?? undefined, sort: sort === "featured" ? undefined : sort }}
                label={`Search ${store.name} products`}
                className="sform-lg browse-search browse-search-v0 store-product-search"
              />

              <div className="listing-v0-toolbar store-products-toolbar">
                <p className="browse-count" role="status">
                  {products.failed ? "Products unavailable" : plural(products.data.total, "product")}
                </p>
                <FilterTabs
                  label="Sort products"
                  active={sort}
                  tabs={SORTS.map((s) => ({
                    key: s.key,
                    label: s.label,
                    href: withQuery(base, { ...query, sort: s.key === "featured" ? undefined : s.key }),
                  }))}
                />
              </div>

              {products.failed ? (
                <EmptyState emoji="📡" title="We can't load this store's products right now">
                  Please try again in a moment.
                </EmptyState>
              ) : products.data.items.length === 0 ? (
                <EmptyState
                  emoji="🛍️"
                  title={filtered ? "No products match" : "No products yet"}
                  actionHref={filtered ? base : undefined}
                  actionLabel={filtered ? "Clear search" : undefined}
                >
                  {filtered ? "Try a different word or category." : "This store has not listed anything yet."}
                </EmptyState>
              ) : (
                <>
                  <div className="lgrid">
                    {products.data.items.map((l) => (
                      <ProductCard key={l.id} listing={l} />
                    ))}
                  </div>
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    hrefFor={(p) => withQuery(base, { ...query, page: p > 1 ? p : undefined })}
                  />
                </>
              )}
            </>
          )}

          <AppCta kind="store" variant="banner" className="listing-cta" />
        </div>
      </section>
    </>
  );
}
