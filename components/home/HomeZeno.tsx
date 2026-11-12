import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ZenoOrbit } from "./ZenoOrbit";

/**
 * Zeno, shown rather than described: the character in his orbit beside one
 * worked example of what he does, a plain sentence read into the details a
 * search needs. The example is labelled as a sample, like every simulated
 * moment on the site.
 */
const POINTS = [
  "Understands everyday language — size, budget, location — not just keywords.",
  "Keeps price, condition and seller context beside the listing it came from.",
  "Suggests the next step; you decide what to do with it.",
];

const READ = ["Laptop", "MacBook", "Used", "≤ KSh 80,000", "Nairobi"];

export function HomeZeno() {
  return (
    <section className="sec hp-zeno" aria-labelledby="hp-zeno-title">
      <div className="wrap hp-zeno-grid">
        <div className="hp-zeno-visual hp-reveal">
          <span className="hp-zeno-pad" aria-hidden="true"><i /><i /><i /></span>
          <ZenoOrbit />
        </div>

        <div className="hp-zeno-copy hp-reveal">
          <span className="hp-eyebrow"><b>03</b> Meet Zeno</span>
          <h2 className="hp-title" id="hp-zeno-title">
            An assistant that <em>reads the market</em> with you.
          </h2>
          <p className="hp-lede">
            Zeno turns a plain sentence into a search you can act on, then keeps the details that matter in
            view. It is a context layer over real listings — not a shop of its own, and not a replacement for
            the seller.
          </p>

          <figure className="hp-parse" data-spotlight="">
            <div className="hp-parse-row">
              <span className="hp-parse-label">You say</span>
              <p className="hp-parse-quote">“A used MacBook under 80K, preferably in Nairobi.”</p>
            </div>
            <span className="hp-parse-beam" aria-hidden="true"><i /></span>
            <div className="hp-parse-row">
              <span className="hp-parse-label">Zeno reads</span>
              <ul className="hp-parse-tokens">
                {READ.map((token, i) => (
                  <li key={token} style={{ ["--i" as string]: i }}>{token}</li>
                ))}
              </ul>
            </div>
            <figcaption className="hp-parse-note">Sample — how a request is read, not a live search.</figcaption>
          </figure>

          <ul className="hp-points">
            {POINTS.map((point) => (
              <li key={point}><span className="hp-points-icon" aria-hidden="true"><Check size={13} /></span> {point}</li>
            ))}
          </ul>

          <div className="hp-actions">
            <Link href="/zeno" className="btn btn-primary btn-sm">
              Explore Zeno <ArrowUpRight size={15} aria-hidden="true" className="btn-arrow" />
            </Link>
            <Link href="/app-preview" className="hp-textlink">
              Preview the app <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
