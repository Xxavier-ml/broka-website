import Link from "next/link";
import { ArrowUpRight, Check, Download, Store } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroSearch } from "./HeroSearch";
import { HeroStage } from "./HeroStage";

/** Kenya's flag, drawn: the emoji shows as the letters "KE" on Windows. */
function KenyaFlag() {
  return (
    <svg viewBox="0 0 30 20" width="21" height="14" className="hp-flag" aria-hidden="true">
      <rect width="30" height="20" rx="2" fill="#fff" />
      <rect width="30" height="5.6" fill="#1a1a1a" />
      <rect y="7.2" width="30" height="5.6" fill="#bb0000" />
      <rect y="14.4" width="30" height="5.6" fill="#006600" />
      <ellipse cx="15" cy="10" rx="3" ry="6.2" fill="#bb0000" stroke="#1a1a1a" strokeWidth="0.8" />
      <ellipse cx="15" cy="10" rx="1" ry="3.4" fill="#1a1a1a" />
    </svg>
  );
}

/** Splits a line into words that come into focus one after another (CSS only). */
function Words({ text, start }: { text: string; start: number }) {
  return text.split(" ").map((word, i, all) => (
    <span key={`${word}${i}`} className="hp-word" style={{ ["--i" as string]: start + i }}>
      {word}
      {i < all.length - 1 ? " " : ""}
    </span>
  ));
}

const POPULAR = ["Phones", "Laptops", "Cars", "Apartments", "Land", "Furniture"];

/**
 * The first screen. Most visitors arrive looking for something, so the
 * marketplace search sits right under the promise, with the most common
 * searches one tap away. The primary action installs the app, where the
 * conversations happen; selling and Zeno are the two other doors. The product
 * stage below shows what the app does with a request instead of describing it.
 */
export function HomeHero() {
  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero-sky" aria-hidden="true">
        <span className="hp-hero-beam" />
        <span className="hp-hero-halo" />
        <span className="hp-hero-grid" />
      </div>

      <div className="wrap hp-hero-inner">
        <p className="hp-kicker">
          <KenyaFlag />
          <span>The future of intelligent commerce</span>
          <i aria-hidden="true" />
          <span className="hp-kicker-alt">Built in Kenya</span>
        </p>

        {/* The gradient line is one piece: background-clip text breaks when
            its words are animated separately. */}
        <h1 className="hp-hero-title" id="hp-hero-title">
          <span className="hp-line"><Words text="Find what fits." start={0} /></span>{" "}
          <span className="hp-line hp-line-accent">Deal with clarity.</span>
        </h1>

        <p className="hp-hero-sub">
          Search products and stores across Kenya. Compare price, condition and location
          before you contact the seller directly.
        </p>

        <HeroSearch />

        <nav className="hp-chips" aria-label="Popular searches">
          <span className="hp-chips-label">Popular</span>
          {POPULAR.map((term) => (
            <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="hp-chip">
              {term}
            </Link>
          ))}
        </nav>

        <div className="hp-hero-actions">
          <Magnetic>
            <Link href="/download" className="btn btn-primary btn-lg hp-beam">
              <Download size={18} aria-hidden="true" /> Get the BROKA app <ArrowUpRight size={17} aria-hidden="true" className="btn-arrow" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/sell" className="btn btn-ghost btn-lg">
              <Store size={17} aria-hidden="true" /> Sell on BROKA
            </Link>
          </Magnetic>
          <Link href="/zeno" className="hp-textlink">
            Meet Zeno <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className="hp-hero-trust">
          <li><Check size={13} aria-hidden="true" /> Clear listing context</li>
          <li><Check size={13} aria-hidden="true" /> Contact sellers directly</li>
          <li><Check size={13} aria-hidden="true" /> Arrange payment directly</li>
        </ul>
      </div>

      <div className="hp-hero-stage">
        <HeroStage />
      </div>
    </section>
  );
}
