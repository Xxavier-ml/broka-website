import Link from "next/link";
import { Boxes, Gavel, ShieldCheck, Store } from "lucide-react";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { FEATURED_CATEGORIES } from "@/lib/categories";
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
 * The home page's first screen, built to the BROKA mockup: pitch, search and
 * categories on the left; Zeno orbiting the marketplace on the right; a
 * glowing Kenya behind; live numbers along the bottom. Every number comes
 * from the API: one it could not give is left out, never made up.
 */
export function HomeHero({ data }: { data: HomeData }) {
  const stats: { icon: React.ReactNode; tone: string; value: string; label: string }[] = [];
  if (data.liveAuctionCount !== null)
    stats.push({
      icon: <Gavel size={22} />,
      tone: "violet",
      // The API lists up to 20 at a time, so 20 means "20 or more".
      value: data.liveAuctionCount >= 20 ? "20+" : nf.format(data.liveAuctionCount),
      label: "Live auctions",
    });
  if (data.storeCount !== null)
    stats.push({ icon: <Store size={22} />, tone: "amber", value: nf.format(data.storeCount), label: "Online stores" });
  if (data.activeListings !== null)
    stats.push({ icon: <Boxes size={22} />, tone: "cyan", value: nf.format(data.activeListings), label: "Active listings" });
  stats.push({ icon: <ShieldCheck size={22} />, tone: "green", value: "Escrow", label: "Protected payments" });

  return (
    <section className="hh" aria-labelledby="hh-title">
      <KenyaMap className="hh-kenya" />
      <div className="wrap hh-grid">
        <div className="hh-copy">
          <p className="hh-pill hh-in" style={{ ["--d" as string]: "0s" }}>
            <KenyaFlag />
            Kenya&apos;s AI Marketplace
            <span className="hh-pill-dot" aria-hidden="true" />
          </p>
          <h1 className="hh-title hh-in" id="hh-title" style={{ ["--d" as string]: "0.08s" }}>
            <span className="hh-title-a">Buy. Sell.</span>
            <span className="hh-title-b">Smarter.</span>
          </h1>
          <p className="hh-sub hh-in" style={{ ["--d" as string]: "0.16s" }}>
            BROKA connects buyers and sellers with the power of AI. Negotiate fairly, trade safely, and get better
            deals with Zeno.
          </p>
          <div className="hh-in" style={{ ["--d" as string]: "0.24s" }}>
            <SearchForm
              action="/browse"
              placeholder="Search listings - phones, cars, land, houses…"
              label="Search BROKA"
              className="sform-hero"
              iconSubmit
            />
          </div>
          <nav className="hh-orbs hh-in" aria-label="Popular categories" style={{ ["--d" as string]: "0.32s" }}>
            {FEATURED_CATEGORIES.slice(0, 5).map((c) => (
              <Link key={c.name} href={`/browse/${encodeURIComponent(c.name.toLowerCase().replace(/\s+/g, "-"))}`} className="hh-orb">
                <span className="hh-orb-ring" style={{ ["--a" as string]: c.gradient[0], ["--b" as string]: c.gradient[1] }}>
                  <span aria-hidden="true">{c.emoji}</span>
                </span>
                <span className="hh-orb-label">{c.name}</span>
              </Link>
            ))}
            <Link href="/browse" className="hh-orb">
              <span className="hh-orb-ring hh-orb-more">
                <span aria-hidden="true">›</span>
              </span>
              <span className="hh-orb-label">All 21</span>
            </Link>
          </nav>
        </div>

        <div className="hh-visual">
          <ZenoOrbit />
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
