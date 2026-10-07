import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Gavel, Search, ShieldCheck, Sparkles, Store } from "lucide-react";
import type { HomeData } from "@/lib/api/home";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { Media } from "@/components/marketplace/Media";
import { coverImage } from "@/lib/api/images";
import { formatUnitPrice } from "@/lib/format";

const nf = new Intl.NumberFormat("en-KE");

/** Kenya's flag, drawn: emoji shows as the letters "KE" on Windows. */
function KenyaFlag() {
  return (
    <svg viewBox="0 0 30 20" width="24" height="16" className="hh-flag" aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#fff" />
      <rect width="30" height="5.6" fill="#1a1a1a" />
      <rect y="7.2" width="30" height="5.6" fill="#BB0000" />
      <rect y="14.4" width="30" height="5.6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="6.2" fill="#BB0000" stroke="#1a1a1a" strokeWidth="0.8" />
      <ellipse cx="15" cy="10" rx="1" ry="3.4" fill="#1a1a1a" />
    </svg>
  );
}

function ListingPreview({ data }: { data: HomeData }) {
  const picks = data.featuredListings.slice(0, 2);
  return (
    <div className="hh-product-stage" aria-label="Featured products on BROKA">
      <div className="hh-stage-orb" aria-hidden="true" />
      <div className="hh-stage-topline">
        <span><i aria-hidden="true" /> LIVE MARKETPLACE</span>
        <span>KENYA / 01</span>
      </div>
      {picks.length > 0 ? (
        <div className="hh-product-stack">
          {picks.map((listing, index) => (
            <Link
              key={listing.id}
              href={`/listings/${listing.id}`}
              className={`hh-product-peek hh-product-peek-${index + 1}`}
              prefetch={false}
            >
              <div className="hh-product-peek-image">
                <Media image={coverImage(listing)} category={listing.category} alt="" />
              </div>
              <div className="hh-product-peek-copy">
                <span className="hh-product-kicker">{index === 0 ? "FEATURED LISTING" : "JUST FOR YOU"}</span>
                <strong>{listing.name}</strong>
                <span className="hh-product-price">{formatUnitPrice(listing.price, listing.price_unit)}</span>
              </div>
              <span className="hh-product-peek-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="hh-zeno-spotlight">
          <Image src="/assets/zeno-full.webp" alt="Zeno, BROKA's AI broker" width={420} height={420} priority />
          <div className="hh-zeno-label"><Sparkles size={14} aria-hidden="true" /> Zeno helps you find a fair deal</div>
        </div>
      )}
      <div className="hh-stage-footer">
        <span><ShieldCheck size={14} aria-hidden="true" /> Escrow protected</span>
        <span>Prices in KSh</span>
      </div>
    </div>
  );
}

export function HomeHero({ data }: { data: HomeData }) {
  const live: { icon: React.ReactNode; value: string; label: string }[] = [];
  if (data.liveAuctionCount) {
    live.push({
      icon: <Gavel size={15} aria-hidden="true" />,
      value: data.liveAuctionCount >= 20 ? "20+" : nf.format(data.liveAuctionCount),
      label: "live auctions",
    });
  }
  if (data.storeCount) {
    live.push({ icon: <Store size={15} aria-hidden="true" />, value: nf.format(data.storeCount), label: "online stores" });
  }

  return (
    <section className="hh hh-conversion" aria-labelledby="hh-title">
      <div className="wrap hh-grid">
        <div className="hh-copy">
          <p className="hh-pill hh-in" style={{ ["--d" as string]: "0s" }}>
            <KenyaFlag />
            Built in Kenya. Ready for your next deal.
            <span className="hh-pill-dot" aria-hidden="true" />
          </p>
          <h1 className="hh-title hh-title-welcome hh-in" id="hh-title" style={{ ["--d" as string]: "0.08s" }}>
            <span className="hh-title-a">Find it.</span>
            <span className="hh-title-b">Negotiate it.</span>
            <span className="hh-title-a">Win it.</span>
          </h1>
          <p className="hh-sub hh-in" style={{ ["--d" as string]: "0.16s" }}>
            Discover real products from Kenyan sellers. Compare with confidence,
            negotiate with Zeno, and close the deal in the BROKA app.
          </p>

          <div className="hh-search-wrap hh-in" style={{ ["--d" as string]: "0.24s" }}>
            <SearchForm
              action="/browse"
              placeholder="What are you looking for today?"
              label="Search BROKA marketplace"
              className="sform-hero sform-lg"
              iconSubmit
            />
            <p className="hh-search-hint"><Search size={12} aria-hidden="true" /> Try &ldquo;Samsung phone&rdquo;, &ldquo;sofa&rdquo; or &ldquo;land in Kiambu&rdquo;</p>
          </div>

          <div className="hh-actions hh-in" style={{ ["--d" as string]: "0.32s" }}>
            <Link href="/browse" className="btn btn-primary hh-action-primary">
              Explore deals <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/download" className="hh-app-link">
              Get the app <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="hh-proof-line hh-in" style={{ ["--d" as string]: "0.4s" }}>
            {live.map((item) => (
              <span className="hh-proof-chip" key={item.label}>
                {item.icon}<strong>{item.value}</strong> {item.label}
              </span>
            ))}
            <span className="hh-proof-chip"><ShieldCheck size={15} aria-hidden="true" /><strong>Escrow</strong> protected</span>
            <span className="hh-proof-chip"><Sparkles size={15} aria-hidden="true" /><strong>Zeno</strong> AI negotiation</span>
          </div>
        </div>

        <div className="hh-visual hh-in" style={{ ["--d" as string]: "0.14s" }}>
          <ListingPreview data={data} />
        </div>
      </div>

      <div className="wrap hh-category-wrap">
        <div className="hh-category-lead"><span>Popular searches</span><Link href="/categories">All categories <ArrowUpRight size={13} aria-hidden="true" /></Link></div>
        <ul className="hh-orbs" aria-label="Popular searches">
          {["Phones", "Cars", "Laptops", "Apartments", "Land", "Furniture"].map((term) => (
            <li key={term}>
              <Link href={`/browse?q=${encodeURIComponent(term)}`} className="hh-orb">
                <span className="hh-orb-ring" aria-hidden="true"><Search size={14} /></span>
                <span className="hh-orb-label">{term}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
