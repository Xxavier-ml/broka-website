"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Box,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  HandCoins,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

const photos = [
  "/assets/app-preview/airtel-router-5g.webp",
  "/assets/app-preview/airtel-router-5g-side.webp",
  "/assets/app-preview/airtel-router-5g-2.webp",
];

export function ListingDetailPreview() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [zenoOpen, setZenoOpen] = useState(false);
  const [message, setMessage] = useState("");

  const movePhoto = (direction: number) => {
    setPhotoIndex((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <main className="app-preview-page apd-page">
      <section className="apd-intro wrap">
        <div className="apd-copy">
          <span className="ap-kicker"><span className="ap-kicker-dot" /> THE BROKA APP / LISTING DETAIL</span>
          <h1>Know what you’re looking at.<br /><em>Then decide.</em></h1>
          <p>Open a listing to see its photos, price, availability, location and item details—all in the same dark, information-first layout used by BROKA’s Flutter app.</p>
          <div className="apd-benefits">
            <div><span className="apd-benefit-icon violet"><Eye size={17} /></span><span><b>See the useful context</b><small>Views, location, condition and product attributes.</small></span></div>
            <div><span className="apd-benefit-icon cyan"><PackageCheck size={17} /></span><span><b>Check stock and terms</b><small>Availability, price and delivery at a glance.</small></span></div>
            <div><span className="apd-benefit-icon gold"><MessageCircle size={17} /></span><span><b>Decide what happens next</b><small>The app’s negotiation action stays in view.</small></span></div>
          </div>
          <Link href="/app-preview#phone-preview" className="apd-back-link"><ChevronLeft size={17} /> Back to the homescreen preview</Link>
          <p className="apd-disclaimer"><span>ⓘ</span> This is an interactive sample. Like, save, gallery and negotiation controls are simulated; no account or seller is contacted.</p>
        </div>

        <div className="apd-device-wrap">
          <div className="apd-device-halo" />
          <div className="apd-device" role="application" aria-label="Interactive BROKA listing-detail screen preview">
            <div className="apd-status"><span>02:27 <span>● ◉ ♧ ✉</span></span><span>▮▮ ▰ ᯤ <b>52</b></span></div>
            <header className="apd-toolbar">
              <Link href="/app-preview#phone-preview" className="apd-back" aria-label="Back to homescreen preview"><ChevronLeft size={22} /></Link>
              <span className="apd-category-mark" aria-hidden="true">📱</span>
              <span className="apd-category-name">ELECTRONICS</span>
              <span className="apd-sale">DIRECT SALE</span>
              <button className={`apd-icon-button heart ${liked ? "is-on" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? "Unlike listing" : "Like listing"} aria-pressed={liked}><Heart size={19} fill={liked ? "currentColor" : "currentColor"} /><b>{liked ? 1 : 0}</b></button>
              <button className={`apd-icon-button bookmark ${saved ? "is-on" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? "Remove saved listing" : "Save listing"} aria-pressed={saved}><Bookmark size={17} fill={saved ? "currentColor" : "currentColor"} /><b>{saved ? 1 : 0}</b></button>
            </header>

            <div className="apd-screen-scroll">
              <section className="apd-gallery" aria-label="Airtel 5G router photos">
                <img key={photos[photoIndex]} src={photos[photoIndex]} alt={`Airtel 5G router photo ${photoIndex + 1} of ${photos.length}`} />
                <div className="apd-zeno-orbit" aria-hidden="true" />
                <button className="apd-zeno-float" onClick={() => setZenoOpen(!zenoOpen)} aria-label={zenoOpen ? "Close Zeno preview" : "Ask Zeno about this listing"} aria-expanded={zenoOpen}>
                  <img src="/assets/zeno-icon.png" alt="" /><span><MessageCircle size={14} /></span>
                </button>
                <span className="apd-listed"><Box size={13} /> Listed Oct 3, 2026</span>
                <button className="apd-gallery-next" onClick={() => movePhoto(1)} aria-label="Next listing photo"><ChevronRight size={19} /></button>
                <div className="apd-dots" aria-label={`Photo ${photoIndex + 1} of ${photos.length}`}>
                  {photos.map((photo, index) => <button key={photo} className={index === photoIndex ? "active" : ""} onClick={() => setPhotoIndex(index)} aria-label={`Show photo ${index + 1}`} aria-current={index === photoIndex ? "true" : undefined} />)}
                </div>
              </section>
              {zenoOpen && <div className="apd-zeno-reply" role="status"><span className="ap-kicker-dot" /> Zeno can help compare price, condition and seller context.</div>}

              <section className="apd-product-info" aria-label="Listing information">
                <div className="apd-title-row"><h2>Airtel 5G router</h2><span className="apd-views"><Eye size={14} /> 254 views</span></div>
                <p className="apd-price">KES 1,500</p>
                <div className="apd-stock"><PackageCheck size={17} /><b>Only 1 available</b></div>
                <div className="apd-tags"><span className="blue"><Box size={13} /> Electronics</span><span className="violet"><MapPin size={13} /> Juja, Kiambu</span></div>
              </section>

              <section className="apd-section" aria-labelledby="apd-details-title">
                <h3 id="apd-details-title">DETAILS</h3>
                <dl className="apd-details-card">
                  <div><dt>Condition</dt><dd>New</dd></div>
                  <div><dt>Brand</dt><dd>Airtel</dd></div>
                  <div><dt>Type</dt><dd>Router</dd></div>
                </dl>
              </section>

              <section className="apd-section apd-terms" aria-labelledby="apd-terms-title">
                <h3 id="apd-terms-title">DEAL TERMS</h3>
                <div className="apd-term-grid">
                  <article className="apd-term price-term"><span><HandCoins size={17} /> PRICE</span><b>Negotiable</b><small>Make an offer with the seller</small></article>
                  <article className="apd-term delivery-term"><span><Truck size={17} /> DELIVERY</span><b>Seller delivers</b><small>The seller can arrange delivery</small></article>
                </div>
              </section>

              <section className="apd-seller"><span className="apd-seller-avatar">C</span><span><b>Clanix</b><small>Seller · Juja, Kiambu</small></span><ArrowRight size={17} /></section>
              <p className="apd-arrangements">Buyers and sellers arrange any purchase, payment and delivery directly.</p>
            </div>

            {message && <div className="apd-toast" role="status">{message}</div>}
            <footer className="apd-bottom-bar">
              <div><b>KES 1,500</b><small>Negotiable · Pay with escrow</small></div>
              <button onClick={() => setMessage("Preview only — this won’t contact the seller.")}><MessageCircle size={16} /> Start Negotiation</button>
            </footer>
            <div className="apd-gesture"><i /></div>
          </div>
          <div className="apd-caption"><span><i /> INTERACTIVE LISTING PREVIEW</span><span>THREE SAMPLE PHOTOS</span></div>
        </div>
      </section>
      <section className="apd-end wrap"><span>See the rest of the app</span><Link href="/app-preview#phone-preview" className="ap-primary">Back to the homescreen <ArrowRight size={17} /></Link></section>
    </main>
  );
}
