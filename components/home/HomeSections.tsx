import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  MessageCircleHeart,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  Timer,
} from "lucide-react";
import { AuctionCard } from "@/components/marketplace/AuctionCard";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { AppCta } from "@/components/marketplace/AppCta";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeData } from "@/lib/api/home";
import { CATEGORIES, FEATURED_CATEGORIES, categorySlug } from "@/lib/categories";

/**
 * The home page's conversion sections, in one scroll:
 * live auctions (urgency) → categories (fastest route to products) →
 * featured listings (product proof) → how buying works (demystified) →
 * trust (objection handling) → stores (depth) → sell (secondary conversion).
 *
 * Every section renders only when it has something real to show; when the
 * API is down the page keeps working and says so once, in the state block.
 */

export function EndingSoon({ auctions }: { auctions: HomeData["auctions"] }) {
  if (auctions.length === 0) return null;
  return (
    <section className="sec hes" aria-labelledby="hes-title">
      <div className="wrap">
        <Reveal className="sec-header">
          <span className="t-eyebrow t-eyebrow-amber">
            <Timer size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Happening now
          </span>
          <h2 className="t-h2" id="hes-title">
            Auctions closing <em className="hes-accent">soon.</em>
          </h2>
          <p className="t-body-lg">
            Live bids from sellers across Kenya. When the clock runs out, the
            highest bidder wins — follow along in the app.
          </p>
        </Reveal>
        <div className="lgrid lgrid-auctions">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
        <div className="sec-outro">
          <Link href="/auctions" className="preview-link">
            Open the Auction House <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CategoryRail() {
  return (
    <section className="sec hcat" aria-labelledby="hcat-title">
      <div className="wrap">
        <Reveal className="sec-header">
          <span className="t-eyebrow">Shop by category</span>
          <h2 className="t-h2" id="hcat-title">
            What are you looking for?
          </h2>
        </Reveal>
        <Reveal>
          <ul className="hcat-grid">
            {FEATURED_CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/browse/${categorySlug(c.name)}`}
                  className="hcat-tile"
                  style={{
                    ["--hcat-a" as string]: c.gradient[0],
                    ["--hcat-b" as string]: c.gradient[1],
                  }}
                >
                  <span className="hcat-emoji" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <span className="hcat-name">{c.name}</span>
                  <span className="hcat-go" aria-hidden="true">
                    <ArrowRight size={15} />
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/categories" className="hcat-tile hcat-tile-more">
                <span className="hcat-emoji" aria-hidden="true">🗂️</span>
                <span className="hcat-name">All {CATEGORIES.length} categories</span>
                <span className="hcat-go" aria-hidden="true">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedPicks({ listings }: { listings: HomeData["featuredListings"] }) {
  if (listings.length === 0) return null;
  return (
    <section className="sec hfeat" aria-labelledby="hfeat-title">
      <div className="wrap">
        <Reveal className="sec-header">
          <span className="t-eyebrow">Featured picks</span>
          <h2 className="t-h2" id="hfeat-title">
            Handpicked from the marketplace.
          </h2>
          <p className="t-body-lg">
            Real listings, real prices, updated as sellers post. Compare here,
            then make your offer in the app.
          </p>
        </Reveal>
        <div className="lgrid">
          {listings.slice(0, 8).map((listing) => (
            <ProductCard key={listing.id} listing={listing} headingLevel={3} />
          ))}
        </div>
        <div className="sec-outro">
          <Link href="/browse" className="preview-link">
            Browse all products <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: <Search size={22} aria-hidden="true" />,
    title: "Find it",
    body: "Search real listings from sellers across Kenya — filtered by price, condition and county.",
  },
  {
    icon: <MessageCircleHeart size={22} aria-hidden="true" />,
    title: "Negotiate it",
    body: "Make an offer and let Zeno, BROKA's AI broker, frame the deal for both sides.",
  },
  {
    icon: <ShieldCheck size={22} aria-hidden="true" />,
    title: "Win it, safely",
    body: "Agree, pay through escrow and follow the transaction through to completion.",
  },
];

export function HowBuyingWorks() {
  return (
    <section className="sec hsteps" aria-labelledby="hsteps-title">
      <div className="wrap">
        <Reveal className="sec-header sec-header-center">
          <span className="t-eyebrow">How buying works</span>
          <h2 className="t-h2" id="hsteps-title">
            Three steps to a deal you can stand behind.
          </h2>
        </Reveal>
        <ol className="hsteps-grid">
          {STEPS.map((step, i) => (
            <li className="hstep" key={step.title}>
              <Reveal className="hstep-inner" delay={i * 0.08}>
              <span className="hstep-icon" aria-hidden="true">
                {step.icon}
              </span>
              <span className="hstep-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="sec-outro">
          <Link href="/how-it-works" className="preview-link">
            See the full journey <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  {
    icon: <ShieldCheck size={20} aria-hidden="true" />,
    title: "Escrow-protected",
    body: "Your payment is held until you get what you paid for.",
  },
  {
    icon: <Handshake size={20} aria-hidden="true" />,
    title: "M-PESA & familiar rails",
    body: "Pay the way Kenya already pays — no new wallets to learn.",
  },
  {
    icon: <BadgeCheck size={20} aria-hidden="true" />,
    title: "Verified sellers",
    body: "Ratings, completed deals and response times on every seller.",
  },
  {
    icon: <Star size={20} aria-hidden="true" />,
    title: "Honest bidding",
    body: "Reserve prices are enforced and bidder names stay private.",
  },
];

export function TrustStrip() {
  return (
    <section className="sec htrust" aria-labelledby="htrust-title">
      <div className="wrap">
        <Reveal className="sec-header sec-header-center">
          <span className="t-eyebrow t-eyebrow-amber">Built on trust</span>
          <h2 className="t-h2" id="htrust-title">
            Deal with confidence, not hope.
          </h2>
        </Reveal>
        <ul className="htrust-grid">
          {TRUST.map((t, i) => (
            <li className="htrust-cell" key={t.title}>
              <Reveal className="htrust-inner" delay={i * 0.06}>
              <span className="htrust-icon" aria-hidden="true">
                {t.icon}
              </span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StoresToFollow({ stores }: { stores: HomeData["stores"] }) {
  // An empty storefront is not useful buyer discovery. Do not dress up a
  // zero-inventory store as a recommendation; show the section only when the
  // API has real product inventory behind it.
  const stockedStores = stores.filter((store) => store.listing_count > 0);
  if (stockedStores.length === 0) return null;
  return (
    <section className="sec hstores" aria-labelledby="hstores-title">
      <div className="wrap">
        <Reveal className="sec-header">
          <span className="t-eyebrow">
            <Store size={14} aria-hidden="true" style={{ verticalAlign: "-2px" }} /> Online stores
          </span>
          <h2 className="t-h2" id="hstores-title">
            Sellers with their own storefronts.
          </h2>
        </Reveal>
        <div className="lgrid lgrid-auctions">
          {stockedStores.slice(0, 3).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        <div className="sec-outro">
          <Link href="/stores" className="preview-link">
            Browse all stores <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SellBand() {
  return (
    <section className="hsell" aria-labelledby="hsell-title">
      <div className="wrap hsell-grid">
        <Reveal>
          <span className="t-eyebrow t-eyebrow-amber">For sellers</span>
          <h2 className="t-h2" id="hsell-title">
            Your store, open to all of Kenya.
          </h2>
          <p className="t-body-lg">
            List once and be understood: buyers arrive with context, Zeno helps
            you respond, and escrow closes the deal. Your link works everywhere
            you already share.
          </p>
        </Reveal>
        <Reveal className="hsell-actions" delay={0.1}>
          <Link href="/sell" className="btn btn-primary">
            Start selling <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/stores" className="preview-link">
            See live stores <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** The app boundary, stated once near the end of the scroll. */
export function AppDownloadCta() {
  return (
    <section className="sec hfinal" aria-label="Get the BROKA app">
      <div className="wrap">
        <Reveal className="hfinal-panel">
          <span className="hfinal-glow" aria-hidden="true" />
          <AppCta kind="general" variant="banner" />
          <div className="hfinal-zeno">
            <Smartphone size={20} aria-hidden="true" />
            <span>Free on Android</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeSections({ data }: { data: HomeData }) {
  const empty =
    data.auctions.length === 0 &&
    data.featuredListings.length === 0 &&
    data.stores.length === 0;

  return (
    <>
      {empty && data.unavailable ? (
        <section className="sec" aria-label="Marketplace status">
          <div className="wrap">
            <div className="state state-warn">
              <span className="state-emoji" aria-hidden="true">
                🛰️
              </span>
              <h3 className="state-title">The marketplace is loading slowly</h3>
              <p className="state-body">
                We could not reach BROKA&apos;s servers just now. The stories
                below still work, and the listings are one refresh away.
              </p>
              <div className="state-actions">
                <Link href="/browse" className="btn btn-primary btn-sm">
                  Browse listings
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <EndingSoon auctions={data.auctions} />
          <CategoryRail />
          <FeaturedPicks listings={data.featuredListings} />
          <HowBuyingWorks />
          <TrustStrip />
          <StoresToFollow stores={data.stores} />
          <SellBand />
          <AppDownloadCta />
        </>
      )}
    </>
  );
}
