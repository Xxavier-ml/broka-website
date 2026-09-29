import Link from "next/link";
import { Gavel, Store, Boxes, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { SearchForm } from "./SearchForm";
import { FEATURED_CATEGORIES } from "@/lib/categories";
import type { HomeData } from "@/lib/api/home";

const nf = new Intl.NumberFormat("en-KE");

/**
 * The strip under the hero: search, the categories people browse most, and
 * live numbers from the marketplace. The numbers are read from the API, never
 * typed in, and a number the API could not give is simply left out.
 */
export function HomeDiscover({ data }: { data: HomeData }) {
  const stats: { icon: React.ReactNode; value: string; label: string }[] = [];
  if (data.liveAuctionCount !== null)
    stats.push({
      icon: <Gavel size={20} />,
      // The API lists up to 20 at a time, so 20 means "20 or more".
      value: data.liveAuctionCount >= 20 ? "20+" : nf.format(data.liveAuctionCount),
      label: "Live auctions",
    });
  if (data.storeCount !== null) stats.push({ icon: <Store size={20} />, value: nf.format(data.storeCount), label: "Online stores" });
  if (data.activeListings !== null)
    stats.push({ icon: <Boxes size={20} />, value: nf.format(data.activeListings), label: "Active listings" });
  stats.push({ icon: <ShieldCheck size={20} />, value: "Escrow", label: "Protected payments" });
  stats.push({ icon: <Sparkles size={20} />, value: "Zeno", label: "AI broker on every deal" });
  const shown = stats.slice(0, 4);

  return (
    <section className="discover" aria-label="Find something on BROKA">
      <div className="wrap">
        <SearchForm
          action="/search"
          placeholder="Search phones, cars, land, houses…"
          label="Search BROKA"
          className="sform-lg"
        />

        <nav className="orbs" aria-label="Popular categories">
          {FEATURED_CATEGORIES.map((c) => (
            <Link key={c.name} href={`/search?category=${encodeURIComponent(c.name)}`} className="orb">
              <span
                className="orb-ring"
                style={{ ["--orb-a" as string]: c.gradient[0], ["--orb-b" as string]: c.gradient[1] }}
              >
                <span className="orb-emoji" aria-hidden="true">
                  {c.emoji}
                </span>
              </span>
              <span className="orb-label">{c.name}</span>
            </Link>
          ))}
          <Link href="/stores" className="orb">
            <span className="orb-ring orb-more">
              <span className="orb-emoji" aria-hidden="true">
                ›
              </span>
            </span>
            <span className="orb-label">More</span>
          </Link>
        </nav>

        <ul className="statbar">
          {shown.map((s) => (
            <li key={s.label}>
              <span className="statbar-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span>
                <span className="statbar-value">{s.value}</span>
                <span className="statbar-label">{s.label}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="discover-note">
          <MapPin size={12} aria-hidden="true" /> Auctions and online stores from across Kenya. Bidding and buying happen in the BROKA app.
        </p>
      </div>
    </section>
  );
}
