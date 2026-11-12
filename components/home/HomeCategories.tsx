import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { categoryArtSmall, categorySlug, categoryVisual } from "@/lib/categories";
import { categoryIcon } from "@/lib/category-icons";

/**
 * The homepage's main browsing door: eight popular categories as a bento of
 * the same editorial artwork the browse pages use, so the visitor sees the
 * category before the click. The full directory is one tap away, and the note
 * under the grid says the artwork is illustrative: live listings are in the
 * marketplace.
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
        <div className="hp-head hp-head-split hp-reveal">
          <div>
            <span className="hp-eyebrow"><b>01</b> Explore the marketplace</span>
            <h2 className="hp-title" id="hp-cats-title">
              Start where your money <em>already goes.</em>
            </h2>
          </div>
          <div className="hp-head-aside">
            <p className="hp-lede">
              Jump into the categories Kenyans buy and sell most, or open the full directory to see all 21.
              Every listing carries its price, condition and seller context before you make contact.
            </p>
            <div className="hp-head-actions">
              <Link href="/browse" className="btn btn-primary btn-sm">
                Browse the marketplace <ArrowUpRight size={15} aria-hidden="true" className="btn-arrow" />
              </Link>
              <Link href="/categories" className="btn btn-ghost btn-sm">
                <LayoutGrid size={15} aria-hidden="true" /> All 21 categories
              </Link>
            </div>
          </div>
        </div>

        <ul className="hp-bento">
          {FEATURED.map((category, index) => {
            const visual = categoryVisual(category.name);
            const Icon = categoryIcon(visual.name);
            return (
              <li className="hp-bento-cell hp-reveal" key={category.name} style={{ ["--i" as string]: index }}>
                <Link
                  href={`/browse/${categorySlug(category.name)}`}
                  className="hp-cat"
                  aria-label={`Explore ${visual.name} in the marketplace`}
                  data-spotlight=""
                >
                  <span className="hp-cat-media">
                    <Image
                      src={categoryArtSmall(category.name, index === 0 ? 1024 : 640)}
                      alt=""
                      fill
                      sizes={index === 0 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 50vw, 25vw"}
                      className="hp-cat-image"
                    />
                  </span>
                  <span className="hp-cat-shade" aria-hidden="true" />
                  <span className="hp-cat-top" aria-hidden="true">
                    <span className="hp-cat-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="hp-cat-go"><ArrowUpRight size={16} /></span>
                  </span>
                  <span className="hp-cat-copy">
                    <span className="hp-cat-icon" aria-hidden="true"><Icon size={16} /></span>
                    <strong>{visual.name}</strong>
                    <small>{category.note}</small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="hp-note">Illustrative category artwork — live listings are in the marketplace.</p>
      </div>
    </section>
  );
}
