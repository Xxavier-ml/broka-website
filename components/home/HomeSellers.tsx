import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Check, Link2, MapPin, MessageCircle, Sparkles } from "lucide-react";

/**
 * The seller half of the marketplace, told with a picture of the work itself:
 * someone photographing a product they already have. The camera framing and
 * the draft listing beside it show what that photo becomes. Both are
 * illustrations (the photo says so), and nothing here promises payments,
 * checkout or anything else the platform does not do.
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
        <div className="hp-sellers-photo hp-reveal">
          <div className="hp-sellers-frame">
            <Image
              src="/assets/home/seller-studio.webp"
              alt="A shop owner photographing a woven basket to create a marketplace listing"
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              className="hp-sellers-image"
            />
            <span className="hp-sellers-shade" aria-hidden="true" />
            <span className="hp-viewfinder" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="hp-focus" aria-hidden="true"><span>Focus locked</span></span>
            <span className="hp-sellers-tag">Illustrative image</span>
            <div className="hp-sellers-badge">
              <strong>Put your products in view</strong>
              <small>Clear photos · useful details · seller context</small>
            </div>
          </div>

          <div className="hp-draft" aria-hidden="true">
            <div className="hp-draft-head">
              <span>New listing</span>
              <b><i /> Draft</b>
            </div>
            <div className="hp-draft-photos">
              <span className="is-filled" /><span className="is-filled" /><span className="is-filled" /><span /><span />
              <small>3 of 5 photos</small>
            </div>
            <dl className="hp-draft-fields">
              <div><dt>Title</dt><dd>Hand-woven basket</dd></div>
              <div><dt>Category</dt><dd>Arts &amp; Crafts</dd></div>
              <div><dt>Location</dt><dd>Nairobi</dd></div>
              <div><dt>Price</dt><dd className="is-muted">Set by you</dd></div>
            </dl>
            <span className="hp-draft-zeno"><Sparkles size={12} /> Zeno can suggest a price</span>
            <span className="hp-draft-publish"><Check size={13} /> Publish listing</span>
          </div>
        </div>

        <div className="hp-sellers-copy hp-reveal">
          <span className="hp-eyebrow"><b>04</b> For sellers</span>
          <h2 className="hp-title" id="hp-sellers-title">
            Turn what you already have <em>into your next sale.</em>
          </h2>
          <p className="hp-lede">
            A shop, a store room or a single item — BROKA gives it a place buyers can actually find, with the
            context that makes them comfortable reaching out.
          </p>
          <div className="hp-sellers-points">
            {POINTS.map((point) => (
              <div className="hp-sellers-point" key={point.title}>
                <span className="hp-sellers-point-icon" aria-hidden="true"><point.icon size={17} /></span>
                <div>
                  <strong>{point.title}</strong>
                  <p>{point.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="hp-storelink">
            <Link2 size={15} aria-hidden="true" />
            <span>Every store gets its own link: <b>broka.co.ke/store/your-shop</b></span>
          </p>
          <div className="hp-actions">
            <Link href="/sell" className="btn btn-primary btn-sm">
              Create a listing <ArrowUpRight size={15} aria-hidden="true" className="btn-arrow" />
            </Link>
            <Link href="/stores" className="hp-textlink">
              See seller stores <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
