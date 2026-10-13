import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const categories = [
  {
    title: "Electronics",
    eyebrow: "Tools for what’s next",
    href: "/browse/electronics",
    image: "/assets/home-discovery/electronics.webp",
  },
  {
    title: "Fashion",
    eyebrow: "Made to be discovered",
    href: "/browse/fashion",
    image: "/assets/home-discovery/fashion-craft.webp",
  },
  {
    title: "Home & Furniture",
    eyebrow: "Make space feel yours",
    href: "/browse/home-and-furniture",
    image: "/assets/home-discovery/home-living.webp",
  },
];

export function HomeDiscovery() {
  return (
    <section className="sec home-discovery" aria-labelledby="home-discovery-title">
      <div className="wrap">
        <Reveal className="home-discovery-header">
          <div>
            <span className="t-eyebrow">Explore the marketplace</span>
            <h2 className="t-h2" id="home-discovery-title">
              Start with what matters to you.
            </h2>
          </div>
          <p className="t-body-lg">
            Browse a few places to begin, then head to the marketplace for current products, seller details and more categories.
          </p>
        </Reveal>

        <div className="home-discovery-grid">
          {categories.map((category, index) => (
            <Reveal className="home-discovery-reveal" delay={index * 0.07} key={category.title}>
              <Link
                href={category.href}
                className="home-discovery-card"
                aria-label={`Explore ${category.title} in the marketplace`}
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  className="home-discovery-image"
                />
                <span className="home-discovery-shade" aria-hidden="true" />
                <span className="home-discovery-copy">
                  <span className="home-discovery-eyebrow">{category.eyebrow}</span>
                  <strong>{category.title}</strong>
                  <span className="home-discovery-link">
                    Explore category <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="home-discovery-outro">
          <p>Illustrative category artwork — live products are in the marketplace.</p>
          <Link href="/browse" className="btn btn-primary">
            Browse the marketplace <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
