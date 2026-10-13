import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Handshake, ShieldCheck, Store } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Sell on BROKA",
  description: "Present your products clearly, reach more buyers and discuss any sale directly with them.",
};

const paths = [
  { index: "01", icon: Store, title: "Open your storefront", body: "Build a clear presence for your products and let buyers discover your business in one place.", href: "/sell/listing", label: "Create a listing" },
  { index: "02", icon: Handshake, title: "Answer buyer questions directly", body: "Use clear listing details and seller context to support a useful conversation. Buyers and sellers discuss offers and final terms themselves.", href: "/zeno", label: "See how Zeno helps" },
  { index: "03", icon: ShieldCheck, title: "Build buyer confidence", body: "Show location, seller history, delivery options and verification signals where they matter most.", href: "/how-it-works", label: "See how trust works" },
];

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="For sellers / BROKA marketplace"
        headline="Put your context to work."
        sub="BROKA gives sellers a polished storefront, a wider audience and useful marketplace context. Buyers and sellers handle any sale and payment directly; BROKA does not process or hold funds."
      >
        <Link href="/sell/listing" className="btn btn-primary">Create a listing <ArrowRight size={17} /></Link>
        <Link href="/download" className="btn btn-ghost">Get the app →</Link>
      </PageHero>

      <section className="sec sell-route-intro" aria-labelledby="sell-route-title">
        <div className="wrap sell-route-intro-grid">
          <div><span className="t-eyebrow">Your next move</span><h2 className="t-h2" id="sell-route-title">The better buyer is not always the closest one.</h2></div>
          <p className="t-body-lg">Whether you have one product or a whole catalogue, make the details clear so interested buyers know how to reach you.</p>
        </div>
      </section>

      <section className="sec sell-route-paths" aria-label="Seller paths">
        <div className="wrap">
          <div className="sell-route-path-grid">
            {paths.map(({ index, icon: Icon, title, body, href, label }) => (
              <article key={title} className="sell-route-path">
                <div className="sell-route-path-top"><span>{index}</span><Icon size={19} /></div>
                <h3>{title}</h3>
                <p>{body}</p>
                <Link href={href} className="preview-link">{label} <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sell-route-flow" aria-labelledby="sell-flow-title">
        <div className="wrap sell-route-flow-grid">
          <div className="sell-route-poster" aria-hidden="true">
            <span>SELLER / READY</span>
            <strong>LIST<br /><em>ONCE.</em></strong>
            <small>Be understood by the right buyer.</small>
            <div className="sell-route-poster-bars"><i /><i /><i /><i /></div>
          </div>
          <div className="sell-route-flow-copy">
            <span className="t-eyebrow">Start with one product</span>
            <h2 className="t-h2" id="sell-flow-title">A premium listing takes minutes.</h2>
            <p className="t-body-lg">Add the details buyers need, upload strong photos and publish when everything looks right. Your listing becomes part of a marketplace that is designed to carry context forward.</p>
            <div className="sell-route-checks"><span>Product context</span><span>Seller signals</span><span>Clear next step</span></div>
            <div className="sell-route-actions"><Link href="/sell/listing" className="btn btn-primary">Create a listing <ArrowRight size={17} /></Link><Link href="/how-it-works" className="btn btn-ghost">How it works</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
