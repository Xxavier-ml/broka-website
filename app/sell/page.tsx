import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, ImagePlus, ShieldCheck, Store } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Sell on BROKA",
  description: "Reach more buyers, negotiate with context, and sell with confidence on BROKA.",
};

const paths = [
  { icon: Store, title: "Open your storefront", body: "Build a branded presence for your products and let buyers discover your business in one place.", href: "/sell/listing", label: "Create a listing" },
  { icon: Handshake, title: "Sell through better conversations", body: "Let Zeno help you frame offers, understand buyer intent, and move from interest to agreement.", href: "/zeno", label: "Meet Zeno" },
  { icon: ShieldCheck, title: "Build buyer confidence", body: "Show your location, seller history, delivery options, and verification signals where they matter most.", href: "/how-it-works", label: "See how trust works" },
];

export default function SellPage() {
  return (
    <>
      <PageHero eyebrow="For sellers" headline="Turn attention into better deals." sub="BROKA gives sellers a polished storefront, a wider audience, and intelligent tools for the moments that decide a sale." />
      <section className="sec-sm" aria-labelledby="sell-paths">
        <div className="wrap">
          <div className="sell-intro">
            <div>
              <span className="t-eyebrow">Your next move</span>
              <h2 className="t-h2" id="sell-paths">Choose how you want to grow.</h2>
            </div>
            <p className="t-body-lg">Whether you have one product or a whole catalogue, the experience stays clear for you and your buyers.</p>
          </div>
          <div className="sell-path-grid">
            {paths.map(({ icon: Icon, title, body, href, label }) => (
              <article key={title} className="card sell-path-card">
                <span className="sell-path-icon"><Icon size={21} /></span>
                <h3 className="t-h4">{title}</h3>
                <p className="t-body">{body}</p>
                <Link href={href} className="preview-link">{label} <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec atm-violet-center" aria-labelledby="sell-start">
        <div className="wrap sell-start-card">
          <div>
            <span className="t-eyebrow">Start with one product</span>
            <h2 className="t-h2" id="sell-start">A premium listing takes minutes.</h2>
            <p className="t-body-lg">Add the details buyers need, upload strong photos, and publish when everything looks right.</p>
          </div>
          <div className="sell-start-actions">
            <Link href="/sell/listing" className="btn btn-primary">Create a listing <ArrowRight size={17} /></Link>
            <Link href="/download" className="btn btn-ghost">Get the app</Link>
          </div>
        </div>
      </section>
    </>
  );
}
