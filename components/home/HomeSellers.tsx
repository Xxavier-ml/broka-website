import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, MapPin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The seller half of the marketplace, told with a picture of the work itself:
 * someone photographing a product they already have. The three points are the
 * three things a seller controls — the photos, the reach, and the conversation.
 */
const POINTS = [
  {
    icon: Camera,
    title: "Clear listings, quickly",
    body: "Photograph what you have, add honest details and a price, and publish it.",
  },
  {
    icon: MapPin,
    title: "Help buyers find the right details",
    body: "Your listing sits in its category and on your storefront, with your location in view.",
  },
  {
    icon: MessageCircle,
    title: "Deal directly",
    body: "Buyers contact you. You agree the price, payment and delivery between yourselves.",
  },
];

export function HomeSellers() {
  return (
    <section className="sec hp-sellers" aria-labelledby="hp-sellers-title">
      <div className="wrap hp-sellers-grid">
        <Reveal className="hp-sellers-media">
          <div className="hp-sellers-photo">
            <Image
              src="/assets/home/seller-studio.webp"
              alt="A shop owner photographing a woven basket to create a marketplace listing"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="hp-sellers-image"
            />
            <span className="hp-sellers-shade" aria-hidden="true" />
            <span className="hp-sellers-tag">Illustrative image</span>
            <div className="hp-sellers-badge">
              <span><strong>Put your products in view</strong><small>Clear photos · useful details · seller context</small></span>
            </div>
          </div>
        </Reveal>

        <Reveal className="hp-sellers-copy" delay={0.1}>
          <span className="t-eyebrow">For sellers</span>
          <h2 className="t-h2" id="hp-sellers-title">Turn what you already have into your next sale.</h2>
          <p className="t-body-lg">
            A shop, a store room or a single item — BROKA gives it a place buyers can
            actually find, with the context that makes them comfortable reaching out.
          </p>
          <div className="hp-sellers-points">
            {POINTS.map((point) => (
              <div className="hp-sellers-point" key={point.title}>
                <span className="hp-sellers-point-icon"><point.icon size={17} aria-hidden="true" /></span>
                <div><strong>{point.title}</strong><p>{point.body}</p></div>
              </div>
            ))}
          </div>
          <div className="hp-sellers-actions">
            <Link href="/sell" className="btn btn-primary btn-sm">
              Create a listing <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/stores" className="preview-link">
              See seller stores <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
