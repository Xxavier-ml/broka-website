import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Camera, FileText, Tag } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Create a listing",
  description: "Choose how you want to list an item on BROKA.",
};

export default function CreateListingPage() {
  return (
    <>
      <PageHero eyebrow="Sell on BROKA" headline="Create a product listing." sub="Prepare your product details, then continue to your BROKA seller account to publish." />
      <section className="sec-sm" aria-label="Create a product listing">
        <div className="wrap listing-start-grid listing-start-grid-single">
          <Link href="/account?next=/sell/listing" className="card listing-start-option">
            <span className="sell-path-icon"><Tag size={21} /></span>
            <h2 className="t-h4">Fixed-price product</h2>
            <p className="t-body">Set a price, explain what you are selling, and let buyers send an offer or move toward a purchase.</p>
            <span className="preview-link">Continue to seller account →</span>
          </Link>
        </div>
        <div className="wrap listing-checklist">
          <span className="t-eyebrow">Prepare before you publish</span>
          <div className="listing-checklist-grid">
            <div><Camera size={17} /><span>Bright, honest product photos</span></div>
            <div><FileText size={17} /><span>Clear details and condition</span></div>
            <div><ArrowLeft size={17} /><span>Delivery or pickup information</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
