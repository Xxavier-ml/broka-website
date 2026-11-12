"use client";

import { useMemo, useState } from "react";
import "@/app/app-preview/app-preview.css";
import "@/app/app-preview/screen-links.css";
import { ArrowRight, ChevronRight, Grid2X2, Heart, Inbox, MapPin, Menu, Mic, Plus, Search, Sparkles } from "lucide-react";

// Small webp files (about 10 KB each). The originals in
// /assets/category-backgrounds/*.jpg are 4 MB apiece: far too heavy for a
// 100 px tile, and this screen is also shown on the home page.
const categories = [
  { name: "Automobiles", emoji: "🚘", image: "/assets/category-backgrounds/webp/automobiles-320.webp", tone: "rose" },
  { name: "Property", emoji: "🏠", image: "/assets/category-backgrounds/webp/property-320.webp", tone: "blue" },
  { name: "Land", emoji: "🏞️", image: "/assets/category-backgrounds/webp/land-320.webp", tone: "gold" },
  { name: "Electronics", emoji: "⌁", image: "/assets/category-backgrounds/webp/electronics-320.webp", tone: "violet" },
  { name: "Fashion", emoji: "✳", image: "/assets/category-backgrounds/webp/fashion-320.webp", tone: "rose" },
];

const listings = [
  { title: "Airtel 5G router", price: "KES 1,500", place: "Juja, Kiambu", age: "1w ago", seller: "Clanix", image: "/assets/app-preview/airtel-router-5g.webp", tag: "AI Showcase" },
  { title: "Airtel 5G router", price: "KES 1,500", place: "Juja, Kiambu", age: "1w ago", seller: "Clanix", image: "/assets/app-preview/airtel-router-5g-side.webp" },
  { title: "Smart home Wi-Fi", price: "KES 2,800", place: "Thika, Kiambu", age: "2d ago", seller: "Mumbi Tech", image: "/assets/app-preview/airtel-router-5g-2.webp" },
  { title: "Dual-band router", price: "KES 3,200", place: "Nairobi", age: "3d ago", seller: "Tech Hub", image: "/assets/app-preview/airtel-router-5g.webp" },
];

const nav = [
  { label: "Home", icon: Grid2X2 },
  { label: "Inbox", icon: Inbox },
  { label: "Sell", icon: Plus },
  { label: "Zeno", icon: Sparkles },
  { label: "Menu", icon: Menu },
];

/**
 * The contents of the app's home screen, drawn for the website: the scrolling
 * feed and the bottom navigation. It goes inside an `.ap-device` frame, which
 * the caller provides (the preview page and the home page both do). Search,
 * categories, saving and the Zeno button all work, but nothing leaves the page.
 */
export function HomeScreenPreview({ onOpenListing }: { onOpenListing: () => void }) {
  const [query, setQuery] = useState("");
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");
  const [zenoOpen, setZenoOpen] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const visibleListings = useMemo(
    () => listings.filter((item) => `${item.title} ${item.place}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <>
      <div className="ap-status"><span>00:51 <span className="ap-status-symbol">◉ ◉</span></span><span>▮▮ ▰ ᯤ <b>66</b></span></div>
      <div className="ap-screen-scroll">
        <header className="ap-app-header">
          <div className="ap-brand"><img src="/assets/broka-mark.png" alt="" width={39} height={39} /><span><b>BROKA</b><small>INTELLIGENT COMMERCE</small></span></div>
          <div className="ap-greeting"><i /> <b>Good morning, Xavier <span>👋</span></b></div>
          <p className="ap-tagline">Better deals. Smarter choices.</p>
          <label className="ap-search"><Search size={19} /><input aria-label="Search sample listings" placeholder="Search listings - phones, cars, land..." value={query} onChange={(event) => setQuery(event.target.value)} /><button aria-label="Voice search" onClick={() => setZenoOpen(true)}><Mic size={17} /></button></label>
        </header>

        <div className="ap-section-head"><b>Shop by category</b><button onClick={() => setCategoryOffset((categoryOffset + 2) % categories.length)}>See all <span>›</span></button></div>
        <div className="ap-category-window"><div className="ap-category-track" style={{ transform: `translateX(-${categoryOffset * 34}%)` }}>
          {categories.map((category) => <button className={`ap-category ${category.tone}`} key={category.name} style={{ backgroundImage: `linear-gradient(0deg, rgba(3,5,14,.88), transparent 76%), url(${category.image})` }} onClick={() => setQuery(category.name === "Electronics" ? "router" : category.name)}><span className="ap-category-emoji">{category.emoji}</span><b>{category.name}</b></button>)}
        </div><button className="ap-category-next" aria-label="More categories" onClick={() => setCategoryOffset((categoryOffset + 1) % categories.length)}><ChevronRight size={22} /></button></div>

        <button className="ap-zeno-cta" onClick={() => setZenoOpen(!zenoOpen)}><img src="/assets/zeno-icon.png" alt="" /><span><b>{zenoOpen ? "Hi Xavier, what do you need?" : "Let me search for you"}</b><small>Ask Zeno to find it and pick the best deal</small></span><i><ArrowRight size={18} /></i></button>
        {zenoOpen && <div className="ap-zeno-reply"><span className="ap-live-dot" /> Zeno is ready. Try searching for a phone, router or car.</div>}

        <div className="ap-feed-title"><span>🔥</span><b>Fresh on Broka</b><i /></div>
        {visibleListings.length ? <div className="ap-listing-grid">{visibleListings.map((item) => {
          const originalIndex = listings.indexOf(item);
          const isSaved = saved.includes(originalIndex);
          return <article className="ap-listing" key={`${item.title}-${originalIndex}`}>
            <div className="ap-listing-photo" style={{ backgroundImage: `url(${item.image})` }}>
              <button type="button" className="ap-listing-photo-open" onClick={onOpenListing} aria-label={`View ${item.title} in the listing preview`} />
              <span className="ap-new"><i /> New</span>
              <button className={`ap-save ${isSaved ? "saved" : ""}`} aria-label={isSaved ? "Remove from saved" : "Save listing"} onClick={() => setSaved(isSaved ? saved.filter((n) => n !== originalIndex) : [...saved, originalIndex])}><Heart size={15} fill={isSaved ? "currentColor" : "none"} /></button>
              {item.tag && <span className="ap-showcase">✦ {item.tag}</span>}
            </div>
            <div className="ap-listing-info"><button type="button" onClick={onOpenListing} className="ap-listing-name ap-listing-detail-link">{item.title}</button><div className="ap-listing-price"><strong>{item.price}</strong><button type="button" className="ap-detail-arrow" onClick={onOpenListing} aria-label={`View ${item.title} preview details`}><ArrowRight size={17} /></button></div><div className="ap-listing-meta"><span><MapPin size={13} />{item.place}</span><span>{item.age}</span></div><div className="ap-seller"><span className="ap-seller-avatar">{item.seller.charAt(0)}</span><b>▣ {item.seller} <span>›</span></b></div></div>
          </article>;
        })}</div> : <div className="ap-empty">No sample listings match “{query}”. Try “router”.</div>}
      </div>
      <nav className="ap-bottom-nav" aria-label="App preview navigation">{nav.map(({ label, icon: Icon }) => <button className={activeTab === label ? "active" : ""} key={label} onClick={() => { setActiveTab(label); if (label === "Zeno") setZenoOpen(true); }}><span>{label === "Zeno" ? <img src="/assets/zeno-icon.png" alt="" /> : <Icon size={22} strokeWidth={2.3} />}</span><small>{label}</small></button>)}</nav>
      <div className="ap-gesture"><i /></div>
    </>
  );
}
