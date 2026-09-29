import Link from "next/link";
import { AuctionCard } from "./AuctionCard";
import { StoreCard } from "./StoreCard";
import { AppCta } from "./AppCta";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeData } from "@/lib/api/home";

/** The home page's window onto the marketplace: a few live auctions and new stores. */
export function LiveMarketplace({ data }: { data: HomeData }) {
  const empty = data.auctions.length === 0 && data.stores.length === 0;

  return (
    <section className="sec atm-violet" id="live" aria-labelledby="live-h">
      <div className="wrap">
        <Reveal className="sec-header">
          <span className="t-eyebrow">Live on BROKA</span>
          <h2 className="t-h2" id="live-h">
            Auctions and stores,<br className="br-lg" />open right now.
          </h2>
          <p className="t-body-lg" style={{ maxWidth: 560, marginTop: 16 }}>
            Look through what sellers across Kenya have listed. See the details here, then bid, make an offer or buy in the BROKA app.
          </p>
        </Reveal>

        {empty ? (
          <div className="state">
            <span className="state-emoji" aria-hidden="true">
              🛍️
            </span>
            <h3 className="state-title">{data.unavailable ? "The listings are loading slowly" : "Fresh listings are on their way"}</h3>
            <p className="state-body">
              {data.unavailable
                ? "We could not reach BROKA's servers just now. The Auction House and stores are still one click away."
                : "There are no live auctions or new stores to show right now."}
            </p>
            <div className="state-actions">
              <Link href="/auctions" className="btn btn-ghost btn-sm">
                Auction House
              </Link>
              <Link href="/stores" className="btn btn-ghost btn-sm">
                Online stores
              </Link>
            </div>
          </div>
        ) : (
          <>
            {data.auctions.length > 0 && (
              <div className="live-block">
                <div className="live-head">
                  <h3 className="t-h4">Ending soon</h3>
                  <Link href="/auctions" className="preview-link live-more">
                    See the Auction House →
                  </Link>
                </div>
                <div className="lgrid lgrid-3">
                  {data.auctions.map((a) => (
                    <AuctionCard key={a.id} auction={a} />
                  ))}
                </div>
              </div>
            )}
            {data.stores.length > 0 && (
              <div className="live-block">
                <div className="live-head">
                  <h3 className="t-h4">Newest stores</h3>
                  <Link href="/stores" className="preview-link live-more">
                    Browse all stores →
                  </Link>
                </div>
                <div className="lgrid lgrid-3">
                  {data.stores.map((s) => (
                    <StoreCard key={s.id} store={s} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <AppCta kind="general" variant="banner" className="listing-cta" />
      </div>
    </section>
  );
}
