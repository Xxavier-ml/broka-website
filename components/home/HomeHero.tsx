import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle, Search, Smartphone, Sparkles, Store, UserRound } from "lucide-react";
import { KenyaMap } from "./KenyaMap";
import { ZenoOrbit } from "./ZenoOrbit";

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
 * The homepage's first decision: explore the marketplace, sell with context, or meet Zeno.
 * The network background and Zeno core stay recognizable, while the copy and
 * route cards make the value proposition legible before the visitor scrolls.
 */
export function HomeHero() {
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
            BROKA helps buyers discover listings, compare seller context and see clearer next steps with Zeno.
          </p>
          <div className="cx-hero-actions cx-reveal" style={{ ["--d" as string]: "0.24s" }}>
            <Link href="/browse" className="btn btn-primary cx-primary-action">
              Explore the marketplace <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/sell" className="btn btn-ghost cx-secondary-action">
              Sell with context <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/app-preview" className="btn btn-ghost cx-secondary-action">
              Preview the app <Smartphone size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="cx-hero-note cx-reveal" style={{ ["--d" as string]: "0.32s" }}>
            <MessageCircle size={14} aria-hidden="true" /> Browse listings, compare the details, then contact the seller directly.
          </p>

          <div className="cx-intent-grid cx-reveal" style={{ ["--d" as string]: "0.4s" }} aria-label="Choose your starting point">
            <Link href="/browse" className="cx-intent-card">
              <span className="cx-intent-icon cx-intent-violet"><Search size={17} aria-hidden="true" /></span>
              <span><strong>Explore products</strong><small>Browse the marketplace</small></span>
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
            <span className="cx-signal-label cx-signal-trust"><b>03</b> SELLER CONTEXT</span>
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
            <span><Search size={14} aria-hidden="true" /> details before contact</span>
            <span>BUYER <b>↔</b> SELLER</span>
          </div>
        </div>
      </div>

      <div className="wrap cx-proof-strip cx-reveal" style={{ ["--d" as string]: "0.48s" }} aria-label="BROKA product signals">
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-violet"><Search size={16} aria-hidden="true" /></span><span><strong>21 categories</strong><small>to explore</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-cyan"><Store size={16} aria-hidden="true" /></span><span><strong>Built in Kenya</strong><small>for local commerce</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-amber"><MessageCircle size={16} aria-hidden="true" /></span><span><strong>Seller context</strong><small>in view</small></span></div>
        <div className="cx-proof-item"><span className="cx-proof-mark cx-mark-green"><UserRound size={16} aria-hidden="true" /></span><span><strong>Human-led</strong><small>AI-assisted decisions</small></span></div>
        <SignalLine />
      </div>
    </section>
  );
}
