import Link from "next/link";
import { ArrowUpRight, Gavel, LayoutGrid, ShieldCheck, Sparkles, Store } from "lucide-react";
import type { HomeData } from "@/lib/api/home";
import { KenyaMap } from "./KenyaMap";
import { ZenoOrbit } from "./ZenoOrbit";

const nf = new Intl.NumberFormat("en-KE");

/** Kenya's flag, drawn: the emoji shows as the letters "KE" on Windows. */
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

/**
 * The welcome page's first screen: a focused BROKA pitch on the left; Zeno
 * orbiting the intelligence layer on the right; a glowing Kenya behind.
 *
 * The bar used to read "0 live auctions, 0 online stores, 5 listings" on a
 * quiet day, which made the first thing a visitor saw a marketplace that
 * looked abandoned. Live counts now appear only when there is something to
 * count, and the bar is topped up to four cells with things that are always
 * true about the product. Nothing is invented and nothing reads as empty.
 */
export function HomeHero({ data }: { data: HomeData }) {
  type Stat = { icon: React.ReactNode; tone: string; value: string; label: string };
  const live: Stat[] = [];
  if (data.liveAuctionCount)
    live.push({
      icon: <Gavel size={22} />,
      tone: "violet",
      // The API lists up to 20 at a time, so 20 means "20 or more".
      value: data.liveAuctionCount >= 20 ? "20+" : nf.format(data.liveAuctionCount),
      label: "Live auctions",
    });
  if (data.storeCount)
    live.push({ icon: <Store size={22} />, tone: "amber", value: nf.format(data.storeCount), label: "Online stores" });
  const always: Stat[] = [
    { icon: <ShieldCheck size={22} />, tone: "green", value: "Escrow", label: "Protected payments" },
    { icon: <Sparkles size={22} />, tone: "violet", value: "Zeno", label: "AI negotiation" },
    { icon: <LayoutGrid size={22} />, tone: "cyan", value: "Layer", label: "Connected commerce" },
  ];
  const stats: Stat[] = [...live, ...always].slice(0, 4);

  return (
    <section className="hh" aria-labelledby="hh-title">
      <KenyaMap className="hh-kenya" />
      <div className="wrap hh-grid">
        <div className="hh-copy">
          <p className="hh-pill hh-in" style={{ ["--d" as string]: "0s" }}>
            <KenyaFlag />
            Welcome to BROKA
            <span className="hh-pill-dot" aria-hidden="true" />
          </p>
          <h1 className="hh-title hh-title-welcome hh-in" id="hh-title" style={{ ["--d" as string]: "0.08s" }}>
            <span className="hh-title-a">The future of</span>
            <span className="hh-title-b">intelligent commerce.</span>
          </h1>
          <p className="hh-sub hh-in" style={{ ["--d" as string]: "0.16s" }}>
            AI-powered discovery. Fairer negotiation. Better deals, backed by trust.
          </p>
          <div className="hh-actions hh-in" style={{ ["--d" as string]: "0.28s" }}>
            <Link href="/download" className="btn btn-primary hh-action-primary">
              Get the BROKA app <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/browse" className="hh-action-link">
              Explore the marketplace <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="hh-visual hh-v0-visual">
          <div className="hh-v0-visual-head">
            <span className="hh-v0-overline">ZENO / INTELLIGENCE CORE</span>
            <span className="hh-v0-status"><span aria-hidden="true" /> processing commerce signals</span>
          </div>
          <div className="hh-v0-coreframe">
            <ZenoOrbit />
            <span className="hh-v0-signal hh-v0-signal-buyer">BUYER <b>intent</b></span>
            <span className="hh-v0-signal hh-v0-signal-offer">OFFER <b>context</b></span>
            <span className="hh-v0-signal hh-v0-signal-trust">TRUST <b>signal</b></span>
            <div className="hh-v0-query" aria-label="Simulated Zeno product moment">
              <div className="hh-v0-query-kicker"><span aria-hidden="true">↗</span> SIMULATED PRODUCT MOMENT</div>
              <div className="hh-v0-query-copy">Find a 55-inch TV under <strong>KSh 50,000</strong></div>
              <div className="hh-v0-query-footer">
                <span><b>Intent understood</b><small>size · category · budget</small></span>
                <span className="hh-v0-query-arrow" aria-hidden="true">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ul className="hh-stats hh-in" style={{ ["--d" as string]: "0.45s" }}>
          {stats.map((s) => (
            <li key={s.label} className={`hh-stat hh-stat-${s.tone}`}>
              <span className="hh-stat-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span>
                <span className="hh-stat-value">{s.value}</span>
                <span className="hh-stat-label">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
