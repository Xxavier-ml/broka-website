import Link from "next/link";
import { ArrowUpRight, BadgeCheck, HandCoins, MapPinned, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four answers to the questions that stop a first purchase. Each one is a
 * statement about how BROKA works — no invented numbers, no invented reviews,
 * and nothing that claims more than the product actually does.
 */
const CARDS = [
  {
    icon: MessagesSquare,
    title: "You talk to the seller",
    body: "Conversations happen between the two people involved, with the listing still in front of you.",
  },
  {
    icon: HandCoins,
    title: "No payment handling",
    body: "BROKA does not process or hold money. Price, payment and delivery are agreed directly.",
  },
  {
    icon: BadgeCheck,
    title: "Context before contact",
    body: "Condition, location and seller details sit beside the price, so nothing is hidden behind a photo.",
  },
  {
    icon: MapPinned,
    title: "Built in Kenya",
    body: "Designed around how buying and selling actually happens here, from Nairobi to the counties.",
  },
];

export function HomeTrust() {
  return (
    <section className="sec hp-trust" aria-labelledby="hp-trust-title">
      <div className="wrap">
        <Reveal className="hp-trust-head">
          <span className="t-eyebrow">Why people use BROKA</span>
          <h2 className="t-h2" id="hp-trust-title">Clear rules, visible context, no middleman.</h2>
        </Reveal>
        <div className="hp-trust-grid">
          {CARDS.map((card, index) => (
            <Reveal className="hp-trust-reveal" key={card.title} delay={index * 0.06}>
              <div className="hp-trust-card">
                <span className="hp-trust-icon"><card.icon size={19} aria-hidden="true" /></span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="hp-trust-outro">
          <Link href="/what-is-broka" className="preview-link">
            What is BROKA, in one page <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
