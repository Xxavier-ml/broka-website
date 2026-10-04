import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Gavel, Eye } from "lucide-react";
import { getAuction } from "@/lib/api/auctions";
import { coverImage, galleryImages } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { clip, conditionLabel, formatDateTime, formatKes, maskName, placeLine } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { AppCta } from "@/components/marketplace/AppCta";
import { Countdown } from "@/components/marketplace/Countdown";
import { AttributeTable, Breadcrumbs, Description, Facts, SellerCard } from "@/components/marketplace/DetailParts";
import { Gallery } from "@/components/marketplace/Gallery";
import { Media } from "@/components/marketplace/Media";
import { STATUS_BADGE, outcomeLabel, priceFor } from "@/components/marketplace/auction-utils";
import { JsonLd } from "@/components/ui/JsonLd";

// The API's numbers move as bids arrive; a minute-old page is fine for a page
// that says, right on it, where the live bidding happens.
export const revalidate = 30;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const page = await getAuction(id).catch(() => null);
  if (!page) return { title: "Auction" };
  const { auction: a, listing: l } = page;
  const price = priceFor(a);
  const image = coverImage(l)?.large;
  const title = `${a.name} — auction`;
  const description = clip(
    `${STATUS_BADGE[a.status].label} auction: ${a.name}. ${price.label} ${formatKes(price.amount)}. ${l.description ?? ""}`,
  );
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/auctions/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/auctions/${id}`,
      type: "website",
      ...(image && /^https?:/.test(image) ? { images: [{ url: image }] } : {}),
    },
  };
}

export default async function AuctionPage({ params }: Props) {
  const { id } = await params;
  const page = await getAuction(id);
  if (!page) notFound();
  const { auction: a, listing: l } = page;

  const badge = STATUS_BADGE[a.status];
  const price = priceFor(a);
  const images = galleryImages(l);
  const cat = categoryVisual(l.category);
  const place = placeLine(a.location_name, l.location_county);
  const condition = conditionLabel(l.condition);
  const outcome = a.status === "ended" ? outcomeLabel(a.outcome, Boolean(a.winning_amount)) : null;
  const reserveText = !a.has_reserve
    ? "No reserve"
    : a.status === "ended"
      ? a.reserve_met
        ? "Reserve met"
        : "Reserve not met"
      : a.reserve_met
        ? "Reserve met"
        : "Reserve not met yet";

  const jsonImages = images.map((i) => i.large).filter((u) => /^https?:/.test(u));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: a.name,
          description: l.description ?? undefined,
          category: l.category,
          image: jsonImages.length ? jsonImages : undefined,
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/auctions/${id}`,
            priceCurrency: "KES",
            price: price.amount ?? undefined,
            availability: a.status === "ended" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          },
        }}
      />
      <section className="detail-top" aria-labelledby="auction-h">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Auction House", href: "/auctions" }, { label: a.name }]} />

          <div className="detail-grid">
            <Gallery
              images={images}
              alt={a.name}
              fallback={<Media image={null} category={l.category} alt={a.name} emoji={l.category ? undefined : "🔨"} />}
            />

            <div className="detail-side">
              <div className="detail-tags">
                <span className={`lbadge lbadge-${badge.tone} lbadge-inline`}>
                  {a.status === "live" && <i className="lbadge-dot" aria-hidden="true" />}
                  {badge.label}
                </span>
                <span className="lcard-cat">
                  <span aria-hidden="true">{cat.emoji}</span> {l.category}
                </span>
                {condition && <span className="lcard-cat">{condition}</span>}
              </div>
              <h1 className="detail-title" id="auction-h">
                {a.name}
              </h1>
              {place && (
                <p className="lcard-place detail-place">
                  <MapPin size={14} aria-hidden="true" /> {place}
                </p>
              )}

              <div className="bidbox">
                <span className="bidbox-label">{price.label}</span>
                <span className="bidbox-amount">{formatKes(price.amount)}</span>
                <Countdown status={a.status} startsAt={a.starts_at} endsAt={a.ends_at} className="bidbox-time" />
                {outcome && (
                  <p className="bidbox-outcome">
                    {outcome}
                    {a.winner_name && a.outcome === "won" ? ` to ${maskName(a.winner_name)}` : ""}
                  </p>
                )}
                {a.status === "live" && a.min_next_bid ? (
                  <p className="bidbox-note">Next bid must be at least {formatKes(a.min_next_bid)}.</p>
                ) : null}
              </div>

              <Facts
                items={[
                  { label: "Starting price", value: formatKes(a.starting_price) },
                  { label: "Bid increment", value: formatKes(a.min_bid_increment) },
                  {
                    label: "Bids",
                    value: (
                      <>
                        <Gavel size={13} aria-hidden="true" /> {a.bid_count}
                      </>
                    ),
                  },
                  {
                    label: "Reserve",
                    value: (
                      <>
                        {a.has_reserve && <ShieldCheck size={13} aria-hidden="true" />} {reserveText}
                      </>
                    ),
                  },
                  { label: a.status === "upcoming" ? "Opens" : "Opened", value: formatDateTime(a.starts_at) ?? "—" },
                  { label: a.status === "ended" ? "Closed" : "Closes", value: formatDateTime(a.ends_at) ?? "—" },
                ]}
              />

              <AppCta kind="auction" />
            </div>
          </div>
        </div>
      </section>

      <section className="detail-more">
        <div className="wrap detail-more-grid">
          <div className="detail-col">
            <Description text={l.description} />
            <AttributeTable attributes={l.attributes} />
            {a.bid_history.length > 0 && (
              <section aria-labelledby="bids-h">
                <h2 className="detail-h" id="bids-h">
                  Bid history
                </h2>
                <ol className="bids">
                  {a.bid_history.slice(0, 10).map((b, i) => (
                    <li key={`${b.created_at}-${i}`} className={i === 0 ? "top" : undefined}>
                      <span className="bids-rank">{i + 1}</span>
                      <span className="bids-who">{maskName(b.bidder_name)}</span>
                      <span className="bids-amount">{formatKes(b.amount)}</span>
                      <span className="bids-when">{formatDateTime(b.created_at) ?? ""}</span>
                    </li>
                  ))}
                </ol>
                {a.bid_history.length > 10 && (
                  <p className="t-sm">Showing the top 10 of {a.bid_history.length} bids.</p>
                )}
                <p className="t-sm bids-note">Bidder names are shortened to protect their privacy.</p>
              </section>
            )}
          </div>
          <aside className="detail-col">
            <SellerCard
              name={l.seller_name}
              verified={l.seller_verified}
              rating={l.seller_rating}
              deals={l.seller_completed_deals}
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
