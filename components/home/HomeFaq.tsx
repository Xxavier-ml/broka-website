import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { faqs } from "@/data/faq";

/**
 * The four questions a first-time visitor asks before they install anything,
 * answered with the same text as the FAQ page (data/faq.ts), so the two can
 * never disagree. Native <details>: keyboard and screen-reader support come
 * free, and it works before JavaScript loads.
 */
const PICK = ["what", "payments", "zeno", "location"];
const ITEMS = PICK.map((id) => faqs.find((item) => item.id === id)).filter((item) => item !== undefined);

export function HomeFaq() {
  return (
    <section className="sec hp-faq" aria-labelledby="hp-faq-title">
      <div className="wrap hp-faq-grid">
        <div className="hp-faq-intro hp-reveal">
          <span className="hp-eyebrow"><b>07</b> Good to know</span>
          <h2 className="hp-title" id="hp-faq-title">
            Questions, <em>answered.</em>
          </h2>
          <p className="hp-lede">Straight answers about what BROKA does today, and what it leaves to you and the seller.</p>
          <div className="hp-actions">
            <Link href="/faq" className="hp-textlink">
              All questions <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="hp-textlink">
              Talk to the team <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="hp-faq-list hp-reveal">
          {ITEMS.map((item, index) => (
            <details className="hp-faq-item" key={item.id} open={index === 0}>
              <summary>
                <span className="hp-faq-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="hp-faq-q">{item.question}</span>
                <span className="hp-faq-toggle" aria-hidden="true"><Plus size={16} /></span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
