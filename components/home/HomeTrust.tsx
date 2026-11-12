import Link from "next/link";
import { ArrowUpRight, BadgeCheck, HandCoins, MapPinned, MessagesSquare } from "lucide-react";
import { KenyaMap } from "./KenyaMap";

/**
 * Four answers to the questions that stop a first purchase. Each one is a
 * statement about how BROKA works — no invented numbers, no invented reviews,
 * and nothing that claims more than the product actually does.
 */
const CONTEXT = [
  ["Price", "Shown on the listing"],
  ["Condition", "New, used, refurbished"],
  ["Location", "Town and area"],
  ["Seller", "Store and profile"],
];

export function HomeTrust() {
  return (
    <section className="sec hp-trust" aria-labelledby="hp-trust-title">
      <div className="wrap">
        <div className="hp-head hp-head-center hp-reveal">
          <span className="hp-eyebrow"><b>06</b> Why people use BROKA</span>
          <h2 className="hp-title" id="hp-trust-title">
            Clear rules, visible context, <em>no middleman.</em>
          </h2>
        </div>

        <div className="hp-trust-grid">
          <article className="hp-trust-card hp-trust-kenya hp-reveal" data-spotlight="">
            <KenyaMap className="hp-trust-map" />
            <div className="hp-trust-body">
              <span className="hp-trust-icon" aria-hidden="true"><MapPinned size={18} /></span>
              <h3>Built in Kenya</h3>
              <p>Designed around how buying and selling actually happens here, from Nairobi to the counties.</p>
              <span className="hp-coords" aria-hidden="true">01°17′S · 36°49′E — Nairobi</span>
            </div>
          </article>

          <article className="hp-trust-card hp-reveal" data-spotlight="">
            <span className="hp-trust-icon" aria-hidden="true"><MessagesSquare size={18} /></span>
            <h3>You talk to the seller</h3>
            <p>Conversations happen between the two people involved, with the listing still in front of you.</p>
          </article>

          <article className="hp-trust-card hp-trust-amber hp-reveal" data-spotlight="">
            <span className="hp-trust-icon" aria-hidden="true"><HandCoins size={18} /></span>
            <h3>No payment handling</h3>
            <p>BROKA does not process or hold money. Price, payment and delivery are agreed directly.</p>
          </article>

          <article className="hp-trust-card hp-trust-wide hp-reveal" data-spotlight="">
            <div className="hp-trust-body">
              <span className="hp-trust-icon" aria-hidden="true"><BadgeCheck size={18} /></span>
              <h3>Context before contact</h3>
              <p>Condition, location and seller details sit beside the price, so nothing is hidden behind a photo.</p>
            </div>
            <dl className="hp-context">
              {CONTEXT.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>

        <div className="hp-trust-outro hp-reveal">
          <Link href="/what-is-broka" className="hp-textlink">
            What is BROKA, in one page <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
