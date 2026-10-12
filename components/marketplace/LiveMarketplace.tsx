import Link from "next/link";
import { AuctionCard } from "./AuctionCard";
import { StoreCard } from "./StoreCard";
import { ProductCard } from "./ProductCard";
import { AppCta } from "./AppCta";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeData } from "@/lib/api/home";

/** The home page's storefront window: products, auctions, and stores. */
export function LiveMarketplace({ data }: { data: HomeData }) {
  const empty = data.auctions.length === 0 && data.featuredListings.length === 0 && data.stores.length === 0;

  return (
    <section className="sec atm-violet" id="live" aria-labelledby="live-h">
      <div className="wrap">
        {/* This block is the catalogue window, so it says what is on the
            platform rather than restating the pitch the hero already made. */}
        <Reveal className="sec-header cx-market-header">
          <div>
            <span className="t-eyebrow">A live window into BROKA</span>
            <h2 className="t-h2" id="live-h">
              See what the market is saying.
            </h2>
          </div>
          <p className="t-body-lg" style={{ maxWidth: 520, marginTop: 0 }}>
            Real listings from sellers across Kenya, updated as they are posted. Compare the signal here, then move to the app when you are ready to negotiate or buy.
          </p>
        </Reveal>

        {empty ? (
          <div className="state">
            <span className="state-emoji" aria-hidden="true">🛍️</span>
            <h3 className="state-title">{data.unavailable ? "The marketplace is loading slowly" : "Fresh listings are on their way"}</h3>
            <p className="state-body">
              {data.unavailable
                ? "We could not reach BROKA's servers just now. Try again shortly or explore the Auction House and stores."
                : "There are no featured products to show right now, but new listings appear every day."}
            </p>
            <div className="state-actions">
              <Link href="/browse" className="btn btn-primary btn-sm">Browse listings</Link>
              <Link href="/auctions" className="btn btn-ghost btn-sm">Auction House</Link>
            </div>
          </div>
        ) : (
          <>
            {data.featuredListings.length > 0 && (
              <div className="live-block">
                <div className="live-head">
                  <h3 className="t-h4">Featured listings</h3>
                  <Link href="/browse" className="preview-link live-more">Browse all products →</Link>
                </div>
                {/* Four cards fill one row of the desktop grid. Three left an
                    orphan card and a hole beside it. */}
                <div className="lgrid">
                  {data.featuredListings.slice(0, 4).map((listing) => (
                    <ProductCard key={listing.id} listing={listing} headingLevel={3} />
                  ))}
                </div>
              </div>
            )}
            {data.auctions.length > 0 && (
              <div className="live-block">
                <div className="live-head">
                  <h3 className="t-h4">Ending soon</h3>
                  <Link href="/auctions" className="preview-link live-more">See the Auction House →</Link>
                </div>
                <div className="lgrid lgrid-3">
                  {data.auctions.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
                </div>
              </div>
            )}
            {data.stores.length > 0 && (
              <div className="live-block">
                <div className="live-head">
                  <h3 className="t-h4">Newest stores</h3>
                  <Link href="/stores" className="preview-link live-more">Browse all stores →</Link>
                </div>
                <div className="lgrid lgrid-3">
                  {data.stores.map((store) => <StoreCard key={store.id} store={store} />)}
                </div>
              </div>
            )}
          </>
        )}

        <div className="cx-market-footnote"><span><span className="cx-live-dot" /> LIVE MARKETPLACE WINDOW</span><span>Read-only on web · deal actions continue in the app</span></div>
        <AppCta kind="general" variant="banner" className="listing-cta" />
      </div>
    </section>
  );
}
