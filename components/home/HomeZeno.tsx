import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Zeno, shown rather than described.
 *
 * The right-hand panel is a labelled sample conversation: it shows the shape
 * of the exchange (a sentence in, structured context out) without pretending
 * to be live inventory — the card says SAMPLE PREVIEW in the same way the
 * other simulated moments on the site are labelled.
 */
const POINTS = [
  "Understands everyday language — size, budget, location — not just keywords.",
  "Keeps price, condition and seller context beside the listing it came from.",
  "Suggests the next step; you decide what to do with it.",
];

export function HomeZeno() {
  return (
    <section className="sec hp-zeno" aria-labelledby="hp-zeno-title">
      <div className="wrap hp-zeno-grid">
        <Reveal className="hp-zeno-copy">
          <span className="t-eyebrow">Meet Zeno</span>
          <h2 className="t-h2" id="hp-zeno-title">An assistant that reads the market with you.</h2>
          <p className="t-body-lg">
            Zeno turns a plain sentence into a search you can act on, then keeps the
            details that matter in view. It is a context layer over real listings —
            not a shop of its own, and not a replacement for the seller.
          </p>
          <ul className="hp-zeno-points">
            {POINTS.map((point) => (
              <li key={point}><Check size={14} aria-hidden="true" /> {point}</li>
            ))}
          </ul>
          <div className="hp-zeno-actions">
            <Link href="/zeno" className="btn btn-primary btn-sm">
              Explore Zeno <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/app-preview" className="preview-link">
              Preview the app <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal className="hp-zeno-demo" delay={0.1} aria-label="Sample Zeno conversation">
          <div className="hp-chat">
            <div className="hp-chat-head">
              <span className="hp-chat-who">
                <Image src="/assets/zeno-icon.png" alt="" width={28} height={28} className="hp-chat-avatar" />
                <span><strong>Zeno</strong><small>BROKA assistant</small></span>
              </span>
              <span className="hp-chat-status"><i aria-hidden="true" /> SAMPLE PREVIEW</span>
            </div>

            <div className="hp-chat-thread">
              <p className="hp-bubble hp-bubble-user">
                I need a 55-inch TV under KSh 50,000, preferably in Nairobi.
              </p>
              <div className="hp-bubble hp-bubble-zeno">
                <p>
                  Here is the shape of what comes back — three sample matches with the
                  details you would compare before contacting anyone.
                </p>
                <ul className="hp-chat-results">
                  <li>
                    <span className="hp-chat-thumb" aria-hidden="true">TV</span>
                    <span className="hp-chat-result-copy"><strong>55-inch smart TV</strong><small>Nairobi · used, good condition</small></span>
                    <span className="hp-chat-price">KSh 46,500</span>
                  </li>
                  <li>
                    <span className="hp-chat-thumb hp-chat-thumb-b" aria-hidden="true">TV</span>
                    <span className="hp-chat-result-copy"><strong>55-inch 4K TV + soundbar</strong><small>Mombasa · new, sealed</small></span>
                    <span className="hp-chat-price">KSh 49,000</span>
                  </li>
                </ul>
                <span className="hp-chat-foot"><Sparkles size={12} aria-hidden="true" /> Then you contact the seller directly.</span>
              </div>
            </div>

            <p className="hp-chat-note">
              Illustrative sample — not live listings. Prices shown are examples.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
