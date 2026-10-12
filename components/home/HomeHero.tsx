import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Search, ShieldCheck, Sparkles, Store } from "lucide-react";
import type { HomeData } from "@/lib/api/home";
import { coverImage } from "@/lib/api/images";
import { Media } from "@/components/marketplace/Media";
import { KenyaMap } from "./KenyaMap";
import { ZenoOrbit } from "./ZenoOrbit";

const nf = new Intl.NumberFormat("en-KE");

function KenyaFlag() {
  return (
    <svg viewBox="0 0 30 20" width="24" height="16" className="ed-flag" aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#fff" />
      <rect width="30" height="5.6" fill="#1a1a1a" />
      <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
      <rect y="14.4" width="30" height="5.6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="6.2" fill="#bb0000" stroke="#1a1a1a" strokeWidth="0.8" />
      <ellipse cx="15" cy="10" rx="1" ry="3.4" fill="#1a1a1a" />
    </svg>
  );
}

function price(listing: HomeData["featuredListings"][number]) {
  return `KES ${nf.format(listing.price)}${listing.price_unit ? ` / ${listing.price_unit}` : ""}`;
}

/** A product-led first screen: desire first, intelligence second, action always clear. */
export function HomeHero({ data }: { data: HomeData }) {
  const [lead, ...supporting] = data.featuredListings;
  const visibleSupporting = supporting.slice(0, 2);

  return (
    <section className="ed-hero" aria-labelledby="ed-hero-title">
      <KenyaMap className="ed-kenya" />
      <div className="wrap ed-hero-grid">
        <div className="ed-hero-copy">
          <div className="ed-hero-meta ed-reveal" style={{ ["--d" as string]: "0s" }}>
            <span className="ed-meta-index">BROKA / 01</span>
            <span className="ed-meta-rule" aria-hidden="true" />
            <span><KenyaFlag /> BUILT IN KENYA</span>
          </div>
          <h1 className="ed-hero-title ed-reveal" id="ed-hero-title" style={{ ["--d" as string]: "0.08s" }}>
            <span>Commerce,</span>
            <em>with context.</em>
          </h1>
          <p className="ed-hero-sub ed-reveal" style={{ ["--d" as string]: "0.16s" }}>
            Find what fits. Understand who is selling. Move toward a deal you can stand behind.
          </p>
          <div className="ed-hero-actions ed-reveal" style={{ ["--d" as string]: "0.24s" }}>
            <Link href="/browse" className="btn btn-primary ed-primary-action">Explore the market <ArrowUpRight size={16} aria-hidden="true" /></Link>
            <Link href="/sell" className="ed-text-action">Sell on BROKA <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="ed-hero-proof ed-reveal" style={{ ["--d" as string]: "0.32s" }}>
            <span><ShieldCheck size={15} aria-hidden="true" /> Protected payment layer</span>
            <span><Sparkles size={15} aria-hidden="true" /> Zeno-assisted decisions</span>
          </div>
        </div>

        <div className="ed-stage ed-reveal" style={{ ["--d" as string]: "0.12s" }} aria-label="A real BROKA marketplace listing with Zeno intelligence">
          <div className="ed-stage-top"><span>THE MARKET / LIVE WINDOW</span><span><i /> {data.unavailable ? "SYNCING" : "UPDATED NOW"}</span></div>
          <div className="ed-stage-main">
            <div className="ed-lead-product">
              {lead ? (
                <>
                  <div className="ed-lead-media"><Media image={coverImage(lead)} category={lead.category} alt={lead.name} sizes="(max-width: 900px) 88vw, 48vw" /></div>
                  <div className="ed-lead-shade" />
                  <div className="ed-lead-tag"><span><i /> FEATURED LISTING</span><span>↗</span></div>
                  <div className="ed-lead-details">
                    <div><span className="ed-product-category">{lead.category}</span><h2>{lead.name}</h2></div>
                    <div className="ed-lead-price"><strong>{price(lead)}</strong><small>{lead.location_name ?? lead.location_county ?? "Kenya"}</small></div>
                  </div>
                </>
              ) : (
                <div className="ed-lead-empty"><Search size={22} aria-hidden="true" /><strong>Search the market</strong><span>Real listings appear here as sellers post.</span></div>
              )}
            </div>
            <div className="ed-zeno-card">
              <div className="ed-zeno-top"><span><i /> ZENO / INTELLIGENCE</span><span>02</span></div>
              <div className="ed-zeno-orbit"><ZenoOrbit /></div>
              <div className="ed-zeno-copy"><strong>Less scrolling.<br />More signal.</strong><span>Understand the next step before you take it.</span></div>
              <Link href="/zeno" aria-label="Meet Zeno"><ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          {visibleSupporting.length > 0 && (
            <div className="ed-supporting-list" aria-label="More featured listings">
              {visibleSupporting.map((listing, index) => (
                <Link href={`/listings/${listing.id}`} className="ed-supporting-item" key={listing.id}>
                  <span className="ed-supporting-index">0{index + 2}</span>
                  <span className="ed-supporting-media"><Media image={coverImage(listing)} category={listing.category} alt="" sizes="72px" /></span>
                  <span className="ed-supporting-copy"><strong>{listing.name}</strong><small>{listing.location_name ?? listing.location_county ?? listing.category}</small></span>
                  <span className="ed-supporting-price">{price(listing)}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
          <div className="ed-stage-foot"><span>COMPARE BEFORE YOU COMMIT</span><span><Check size={13} aria-hidden="true" /> READ-ONLY MARKETPLACE VIEW</span></div>
        </div>
      </div>
      <div className="wrap ed-bottom-line ed-reveal" style={{ ["--d" as string]: "0.42s" }}>
        <span>DISCOVER</span><i /><span>UNDERSTAND</span><i /><span>NEGOTIATE</span><i /><span>COMPLETE</span>
        <Link href="/how-it-works">See how it works <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
