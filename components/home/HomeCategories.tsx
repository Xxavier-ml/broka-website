import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { categoryArtSmall, categorySlug, categoryVisual } from "@/lib/categories";

/**
 * The homepage's main browsing door.
 *
 * Three cards used to stand in for twenty-one categories, so most visitors had
 * to leave the page before they found their own corner of the market. The grid
 * below opens eight popular categories straight from the homepage — the
 * artwork is the same editorial category art the browse pages use, so the
 * visitor sees the category before the click — with the full directory one tap
 * away. The copy is deliberately short: this is a door, not a brochure.
 */
const FEATURED: { name: string; note: string }[] = [
  { name: "Electronics", note: "Phones, laptops, audio" },
  { name: "Fashion", note: "Clothing, shoes, accessories" },
  { name: "Home & Furniture", note: "Living, kitchen, decor" },
  { name: "Automobiles", note: "Cars, bikes, spare parts" },
  { name: "Property", note: "Homes, rentals, offices" },
  { name: "Agriculture", note: "Produce, livestock, tools" },
  { name: "Beauty & Personal Care", note: "Skincare, hair, grooming" },
  { name: "Gaming", note: "Consoles, games, gear" },
];

export function HomeCategories() {
  return (
    <section className="sec hp-cats" aria-labelledby="hp-cats-title">
      <div className="wrap">
        <Reveal className="hp-cats-head">
          <div>
            <span className="t-eyebrow">Explore the marketplace</span>
            <h2 className="t-h2" id="hp-cats-title">Start where your money already goes.</h2>
          </div>
          <p className="t-body-lg">
            Jump into the categories Kenyans buy and sell most, or open the full
            directory to see all 21. Every listing carries its price, condition and
            seller context before you make contact.
          </p>
        </Reveal>

        <div className="hp-cats-grid">
          {FEATURED.map((category, index) => {
            const visual = categoryVisual(category.name);
            return (
              <Reveal className="hp-cat-reveal" key={category.name} delay={index * 0.045}>
                <Link
                  href={`/browse/${categorySlug(category.name)}`}
                  className="hp-cat"
                  aria-label={`Explore ${visual.name} in the marketplace`}
                >
                  <span className="hp-cat-media">
                    <Image
                      src={categoryArtSmall(category.name)}
                      alt=""
                      fill
                      sizes="(max-width: 560px) 50vw, (max-width: 1000px) 33vw, 25vw"
                      className="hp-cat-image"
                    />
                  </span>
                  <span className="hp-cat-shade" aria-hidden="true" />
                  <span className="hp-cat-emoji" aria-hidden="true">{visual.emoji}</span>
                  <span className="hp-cat-copy">
                    <strong>{visual.name}</strong>
                    <small>{category.note}</small>
                    <span className="hp-cat-go">
                      Explore <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="hp-cats-outro">
          <p>Illustrative category artwork — live listings are in the marketplace.</p>
          <div className="hp-cats-outro-actions">
            <Link href="/categories" className="btn btn-ghost btn-sm">
              <LayoutGrid size={15} aria-hidden="true" /> All 21 categories
            </Link>
            <Link href="/browse" className="btn btn-primary btn-sm">
              Browse the marketplace <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
