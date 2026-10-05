import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Handshake, MapPin, ShieldCheck, Truck, Eye, Tag, ChevronLeft } from "lucide-react";
import { getListing } from "@/lib/api/listings";
import { coverImage, galleryImages } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { clip, conditionLabel, formatUnitPrice, placeLine } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { AppCta } from "@/components/marketplace/AppCta";
import { AttributeTable, Breadcrumbs, Description, Facts, SellerCard } from "@/components/marketplace/DetailParts";
import { Gallery } from "@/components/marketplace/Gallery";
import { Media } from "@/components/marketplace/Media";
import { JsonLd } from "@/components/ui/JsonLd";

type Props = { params: Promise<{ id: string }> };

async function load(id: string) {
  const l = await getListing(id);
  if (!l) return null;
  if (l.listing_type === "auction") redirect(`/auctions/${l.id}`);
  return l;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = await load(id).catch(() => null);
  if (!l) return { title: "Listing" };
  const image = coverImage(l)?.large;
  const description = clip(
    `${l.name} — ${formatUnitPrice(l.price, l.price_unit)}${l.store_name ? ` from ${l.store_name}` : ""}. ${l.description ?? ""}`,
  );
  return {
    title: `${l.name}${l.store_name ? ` — ${l.store_name}` : ""}`,
    description,
    alternates: { canonical: `${SITE_URL}/listings/${l.id}` },
    openGraph: {
      title: l.name,
      description,
      url: `${SITE_URL}/listings/${l.id}`,
      type: "website",
      ...(image && /^https?:/.test(image) ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function ListingPage({ params }: Props) {
  const { id } = await params;
  const l = await load(id);
  if (!l) notFound();

  const images = galleryImages(l);
  const cat = categoryVisual(l.category);
  const condition = conditionLabel(l.condition);
  const place = placeLine(l.location_name, l.location_county);
  const jsonImages = images.map((i) => i.large).filter((u) => /^https?:/.test(u));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: l.name,
          description: l.description ?? undefined,
          category: l.category,
          image: jsonImages.length ? jsonImages : undefined,
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/listings/${l.id}`,
            priceCurrency: "KES",
            price: l.price,
            itemCondition:
              l.condition?.toLowerCase() === "new"
                ? "https://schema.org/NewCondition"
                : l.condition?.toLowerCase() === "used"
                  ? "https://schema.org/UsedCondition"
                  : undefined,
            availability: l.status === "active" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            seller: l.store_name ? { "@type": "Organization", name: l.store_name } : undefined,
          },
        }}
      />
      <section className="detail-top detail-app-shell" aria-labelledby="listing-h">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: "Browse", href: "/browse" },
              ...(l.store_name && l.store_slug ? [{ label: l.store_name, href: `/stores/${l.store_slug}` }] : []),
              { label: l.name },
            ]}
          />
          <div className="detail-app-toolbar">
            <Link href="/browse" className="detail-app-back"><ChevronLeft size={16} aria-hidden="true" /> Browse marketplace</Link>
            <span className="detail-app-kicker">BROKA / LISTING DETAIL</span>
            <span className="detail-app-sale-badge">DIRECT SALE</span>
          </div>
          <div className="detail-grid">
            <Gallery images={images} alt={l.name} fallback={<Media image={null} category={l.category} alt={l.name} />} />

            <div className="detail-side">
              <div className="detail-tags">
                <span className="lcard-cat">
                  <span aria-hidden="true">{cat.emoji}</span> {l.category}
                </span>
                {condition && <span className="lcard-cat">{condition}</span>}
              </div>
              <h1 className="detail-title" id="listing-h">
                {l.name}
              </h1>
              {place && (
                <p className="lcard-place detail-place">
                  <MapPin size={14} aria-hidden="true" /> {place}
                </p>
              )}

              <div className="detail-terms-block">
                <p className="detail-section-label">DEAL TERMS</p>
                <div className="detail-terms-grid">
                  <div className="detail-term detail-term-price">
                    <span className="detail-term-label"><Handshake size={15} aria-hidden="true" /> PRICE</span>
                    <strong>{l.price_negotiable ? "Negotiable" : "Fixed price"}</strong>
                    <p>{l.price_negotiable ? "Make an offer in the BROKA app" : "Seller's asking price"}</p>
                    <b>{formatUnitPrice(l.price, l.price_unit)}</b>
                  </div>
                  <div className="detail-term detail-term-delivery">
                    <span className="detail-term-label"><Truck size={15} aria-hidden="true" /> DELIVERY</span>
                    <strong>{l.delivery_available ? "Seller delivers" : "Pickup only"}</strong>
                    <p>{l.delivery_available ? (l.delivery_note || "The seller can arrange delivery") : "Collect it from the seller"}</p>
                  </div>
                </div>
              </div>

              <div className="detail-meta-facts">
                <Facts
                  items={[
                    ...(l.quantity && l.quantity > 1 ? [{ label: "Available", value: `${l.quantity}${l.price_unit ? ` ${l.price_unit}s` : ""}` }] : []),
                    ...(condition ? [{ label: "Condition", value: condition }] : []),
                    { label: "Category", value: <><Tag size={13} aria-hidden="true" /> {l.category}</> },
                    { label: "Trust", value: <><ShieldCheck size={13} aria-hidden="true" /> Escrow protected</> },
                  ]}
                />
              </div>

              <AppCta kind="product" />
            </div>
          </div>
        </div>
      </section>

      <section className="detail-more">
        <div className="wrap detail-more-grid">
          <div className="detail-col">
            <Description text={l.description} />
            <AttributeTable attributes={l.attributes} />
          </div>
          <aside className="detail-col">
            <SellerCard
              name={l.seller_name}
              verified={l.seller_verified}
              rating={l.seller_rating}
              deals={l.seller_completed_deals}
              dcr={l.seller_dcr}
              dcrProvisional={l.seller_dcr_provisional}
              responseMinutes={l.seller_response_minutes}
              dealTimeMinutes={l.seller_avg_deal_time_minutes}
              timedDeals={l.seller_timed_deals}
              store={l.store_slug && l.store_name ? { slug: l.store_slug, name: l.store_name } : null}
            />
            <p className="t-sm views">
              <Eye size={13} aria-hidden="true" /> {l.views.toLocaleString("en-KE")} views
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
