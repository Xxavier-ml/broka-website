import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { categoryIcon } from "@/lib/category-icons";

/**
 * Every category, one tap away: two slow rails of category links running in
 * opposite directions under the hero. Each rail is drawn twice so the loop is
 * seamless; the copy is hidden from assistive technology and taken out of the
 * tab order. Hovering or focusing a rail pauses it. With reduced motion the
 * rails stand still and scroll sideways instead.
 */
const NAMED = CATEGORIES.filter((category) => category.name !== "Other");
const RAILS = [NAMED.slice(0, 10), NAMED.slice(10)];

function Rail({ items, copy }: { items: typeof NAMED; copy?: boolean }) {
  return (
    <ul className="hp-rail-track" aria-hidden={copy ? "true" : undefined}>
      {items.map((category) => {
        const Icon = categoryIcon(category.name);
        return (
          <li key={category.name}>
            <Link
              href={`/browse/${categorySlug(category.name)}`}
              className="hp-pill"
              tabIndex={copy ? -1 : undefined}
              style={{ ["--g1" as string]: category.gradient[0], ["--g2" as string]: category.gradient[1] }}
            >
              <span className="hp-pill-icon"><Icon size={15} aria-hidden="true" /></span>
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function HomeMarquee() {
  return (
    <section className="hp-marquee" aria-labelledby="hp-marquee-title">
      <div className="wrap hp-marquee-head">
        <h2 className="hp-marquee-title" id="hp-marquee-title">
          <span className="hp-marquee-count">21</span> categories. One marketplace.
        </h2>
        <Link href="/categories" className="hp-textlink">
          See the full directory <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="hp-rails">
        {RAILS.map((items, index) => (
          <div className={`hp-rail${index === 1 ? " hp-rail-reverse" : ""}`} key={index}>
            <Rail items={items} />
            <Rail items={items} copy />
          </div>
        ))}
      </div>
    </section>
  );
}
