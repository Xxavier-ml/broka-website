import Link from "next/link";
import { ArrowUpRight, Check, CircleDollarSign, Search, ShieldCheck, Sparkles, Store, UserRound } from "lucide-react";
import type { HomeData } from "@/lib/api/home";
import { KenyaMap } from "./KenyaMap";
import { ZenoOrbit } from "./ZenoOrbit";

const nf = new Intl.NumberFormat("en-KE");

/** Kenya's flag, drawn: the emoji shows as the letters "KE" on Windows. */
function KenyaFlag() {
  return (
    <svg viewBox="0 0 30 20" width="24" height="16" className="cx-flag" aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#fff" />
      <rect width="30" height="5.6" fill="#1a1a1a" />
      <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
      <rect y="14.4" width="30" height="5.6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="6.2" fill="#bb0000" stroke="#1a1a1a" strokeWidth="0.8" />
      <ellipse cx="15" cy="10" rx="1" ry="3.4" fill="#1a1a1a" />
    </svg>
  );
}

function SignalLine() {
  return <span className="cx-signal-line" aria-hidden="true"><i /><i /><i /></span>;
}

/**
 * The homepage's first decision: find a deal, sell with context, or meet Zeno.
 * The network background and Zeno core stay recognizable, while the copy and
 * route cards make the value proposition legible before the visitor scrolls.
 */
export function HomeHero({ data }: { data: HomeData }) {
  const liveListings = data.activeListings != null ? nf.format(data.activeListings) : null;
  const liveStores = data.storeCount != null ? nf.format(data.storeCount) : null;

  return (
    <section className="cx-hero" aria-labelledby="cx-hero-title">
      <KenyaMap className="cx-kenya" />
      <div className="wrap cx-hero-grid">
        <div className="cx-hero-copy">
          <p className="cx-kicker cx-reveal" style={{ ["--d" as string]: "0s" }}>
            <KenyaFlag />
            <span>Built in Kenya</span>
            <i aria-hidden="true" />
            <span>Designed for the next deal</span>
          </p>
          <h1 className="cx-hero-title cx-reveal" id="cx-hero-title" style={{ ["--d" as string]: "0.08s" }}>
            <span>Find the signal</span>
            <em>in the market.</em>
          </h1>
          <p className="cx-hero-sub cx-reveal" style={{ ["--d" as string]: "0.16s" }}>
            BROKA connects real listings, seller context, Zeno intelligence and protected payment rails — so the next deal is easier to see and easier to trust.
          </p>
          <div className="cx-hero-actions cx-reveal" style={{ ["--d" as string]: "0.24s" }}>
            <Link href="/browse" className="btn btn-primary cx-primary-action">
              Find a deal <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/sell" className="btn btn-ghost cx-secondary-action">
              Sell with context <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="cx-hero-note cx-reveal" style={{ ["--d" as string]: "0.32s" }}>
            <ShieldCheck size={14} aria-hidden="true" /> View the marketplace first. Move to the app when you are ready to negotiate, chat or pay.
          </p>

          <div className="cx-intent-grid cx-reveal" style={{ ["--d" as string]: "0.4s" }} aria-label="Choose your starting point">
            <Link href="/browse" className="cx-intent-card">
              <span className="cx-intent-icon cx-intent-violet"><Search size={17} aria-hidden="true" /></span>
              <span><strong>Find a deal</strong><small>Search real listings</small></span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/sell" className="cx-intent-card">
              <span className="cx-intent-icon cx-intent-cyan"><Store size={17} aria-hidden="true" /></span>
              <span><strong>Sell with context</strong><small>Reach the right buyer</small></span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/zeno" className="cx-intent-card">
              <span className="cx-intent-icon cx-intent-amber"><Sparkles size={17} aria-hidden="true" /></span>
              <span><strong>Meet Zeno</strong><small>Make the next step clearer</small></span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="cx-hero-visual cx-reveal" style={{ ["--d" as string]: "0.12s" }}>
          <div className="cx-visual-topline">
            <span><i aria-hidden="true" /> ZENO / INTELLIGENCE CORE</span>
            <span>LIVE SIGNAL</span>
          </div>
          <div className="cx-core-frame">
            <div className="cx-core-grid" aria-hidden="true" />
            <div className="cx-core-ring cx-core-ring-one" aria-hidden="true" />
            <div className="cx-core-ring cx-core-ring-two" aria-hidden="true" />
            <ZenoOrbit />
            <span className="cx-signal-label cx-signal-buyer"><b>01</b> BUYER INTENT</span>
            <span className="cx-signal-label cx-signal-context"><b>02</b> MARKET CONTEXT</span>
            <span className="cx-signal-label cx-signal-trust"><b>03</b> TRUST LAYER</span>
            <div className="cx-query-card">
              <div className="cx-query-heading"><span className="cx-live-dot" /> SIMULATED PRODUCT MOMENT <span>ZEN/01</span></div>
              <p>I need a 55-inch TV under <strong>KSh 50,000</strong></p>
              <div className="cx-query-result">
                <span className="cx-query-check"><Check size={13} aria-hidden="true" /></span>
                <span><strong>Intent understood</strong><small>size · category · budget</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="cx-visual-footer">
            <span><CircleDollarSign size={14} aria-hidden="true" /> context before commitment</span>
            <span>BUYER <b>↔</b> SELLER</span>
          </div>
        </div>
      </div>

      <div className="wrap cx-proof-strip cx-reveal" style={{ ["--d" as string]: "0.48s" }} aria-label="BROKA product signals">
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-violet"><Search size={16} aria-hidden="true" /></span><span><strong>{liveListings ?? "Real"}</strong><small>{liveListings ? "active listings" : "marketplace listings"}</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-cyan"><Store size={16} aria-hidden="true" /></span><span><strong>{liveStores ?? "Online"}</strong><small>{liveStores ? "online stores" : "seller storefronts"}</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-amber"><ShieldCheck size={16} aria-hidden="true" /></span><span><strong>Protected</strong><small>payment layer</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-green"><UserRound size={16} aria-hidden="true" /></span><span><strong>Human-led</strong><small>AI-assisted decisions</small></span></div>
        <SignalLine />
      </div>
    </section>
  );
}
