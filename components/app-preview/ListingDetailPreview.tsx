"use client";

import { useState } from "react";
import {
  Bookmark,
  Box,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  HandCoins,
  Heart,
  MapPin,
  MessageCircle,
  PackageCheck,
  Store,
  Truck,
  UserRound,
} from "lucide-react";

const photos = [
  "/assets/app-preview/airtel-router-5g.webp",
  "/assets/app-preview/airtel-router-5g-side.webp",
  "/assets/app-preview/airtel-router-5g-2.webp",
];

type ListingDetailPreviewProps = { onBack: () => void };

export function ListingDetailPreview({ onBack }: ListingDetailPreviewProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [zenoOpen, setZenoOpen] = useState(false);
  const [zenoAnswer, setZenoAnswer] = useState("");
  const [message, setMessage] = useState("");

  const movePhoto = (direction: number) => {
    setPhotoIndex((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <>
      <div className="apd-status"><span>02:42 <span>● ◉ ♧ ✉</span></span><span>▮▮ ▰ ᯤ <b>50</b></span></div>
      <header className="apd-toolbar">
        <button className="apd-back" onClick={onBack} aria-label="Back to the BROKA homescreen"><ChevronLeft size={23} /></button>
        <span className="apd-category-mark" aria-hidden="true">📱</span>
        <span className="apd-category-name">ELECTRONICS</span>
        <span className="apd-sale">DIRECT SALE</span>
        <button className={`apd-icon-button heart ${liked ? "is-on" : ""}`} onClick={() => setLiked(!liked)} aria-label={liked ? "Unlike listing" : "Like listing"} aria-pressed={liked}><Heart size={19} fill="currentColor" /><b>{liked ? 1 : 0}</b></button>
        <button className={`apd-icon-button bookmark ${saved ? "is-on" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? "Remove saved listing" : "Save listing"} aria-pressed={saved}><Bookmark size={17} fill="currentColor" /><b>{saved ? 1 : 0}</b></button>
      </header>

      <div className="apd-screen-scroll" aria-label="Airtel 5G router listing details">
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
        {zenoOpen && <div className="apd-zeno-reply" role="status"><span className="ap-kicker-dot" /> Zeno can help compare the price, seller and delivery.</div>}

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
            <article className="apd-term price-term"><span><HandCoins size={17} /> PRICE</span><b>Negotiable</b><small>Make an offer - Zeno negotiates it for you</small></article>
            <article className="apd-term delivery-term"><span><Truck size={17} /> DELIVERY</span><b>Seller delivers</b><small>The seller can arrange delivery</small></article>
          </div>
        </section>

        <section className="apd-section apd-seller-section" aria-labelledby="apd-seller-title">
          <h3 id="apd-seller-title">SELLER</h3>
          <div className="apd-seller-card">
            <div className="apd-seller-main">
              <span className="apd-seller-avatar">X</span>
              <div className="apd-seller-data">
                <b className="apd-shop-name"><Store size={15} /> Clanix</b>
                <span className="apd-owner-name"><UserRound size={14} /> Xavier Bravin Odhaimbo</span>
                <small>0 deals completed</small>
                <small className="apd-active"><i /> Active 15m ago</small>
              </div>
              <ChevronRight className="apd-seller-arrow" size={20} />
            </div>
            <div className="apd-seller-meta"><span><MapPin size={13} /> Juja, Kiambu</span><span><CalendarDays size={13} /> Since Oct 2026</span></div>
          </div>
          <div className="apd-standing-grid" aria-label="Seller standing">
            <article className="apd-standing-tile rating"><span>RATING</span><b>4.9<small>/10</small></b><p>BROKA rating</p></article>
            <article className="apd-standing-tile completion"><span>COMPLETION</span><b>—</b><p>No deals yet</p></article>
            <article className="apd-standing-tile response"><span>AVG RESPONSE</span><b>7.8h</b><p>average reply time</p></article>
            <article className="apd-standing-tile deal-time"><span>AVG DEAL TIME</span><b>—</b><p>No completed deals</p></article>
          </div>
          <p className="apd-standing-note">Measured by BROKA from the seller&apos;s deals and chats</p>
        </section>

        <section className="apd-section apd-about-section" aria-labelledby="apd-about-title">
          <h3 id="apd-about-title">ABOUT THIS LISTING</h3>
          <div className="apd-about-card">
            <p>What&apos;s included: A four hours long backup battery</p>
            <p>Age / how long used: Not used</p>
          </div>
        </section>

        <section className="apd-section apd-zeno-section" aria-labelledby="apd-zeno-title">
          <h3 id="apd-zeno-title">ZENO INSIGHT</h3>
          <div className="apd-zeno-card">
            <button className="apd-zeno-prompt" onClick={() => setZenoAnswer("Preview only — Zeno isn’t connected to a live listing here.")}>
              <img src="/assets/zeno-icon.png" alt="" />
              <span><b>Ask Zeno about your listing</b><small>How it compares, what buyers will ask, and how to sell it faster.</small></span>
              <ChevronRight size={21} />
            </button>
            <div className="apd-zeno-questions">
              {["How can I sell this faster?", "Is my price right?"].map((question) => <button key={question} onClick={() => setZenoAnswer(`Preview only — “${question}” isn’t sent to Zeno.`)}>{question}</button>)}
            </div>
          </div>
          {zenoAnswer && <div className="apd-zeno-answer" role="status">{zenoAnswer}</div>}
        </section>
        <p className="apd-arrangements">Preview content is illustrative. This screen doesn&apos;t contact a seller or connect to Zeno.</p>
      </div>

      {message && <div className="apd-toast" role="status">{message}</div>}
      <footer className="apd-bottom-bar">
        <div><b>KES 1,500</b><small>Negotiable · Pay with escrow</small></div>
        <button onClick={() => setMessage("Preview only — this won’t contact the seller.")}><MessageCircle size={16} /> Start Negotiation</button>
      </footer>
      <div className="apd-gesture"><i /></div>
    </>
  );
}
