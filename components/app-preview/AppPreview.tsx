"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, ChevronRight, Grid2X2, Heart, Inbox, MapPin, Menu, Mic, Plus, Search, Sparkles, Store } from "lucide-react";

const categories = [
  { name: "Automobiles", emoji: "🚘", image: "/assets/category-backgrounds/automobiles.jpg", tone: "rose" },
  { name: "Property", emoji: "🏠", image: "/assets/category-backgrounds/property.jpg", tone: "blue" },
  { name: "Land", emoji: "🏞️", image: "/assets/category-backgrounds/land.jpg", tone: "gold" },
  { name: "Electronics", emoji: "⌁", image: "/assets/category-backgrounds/electronics.jpg", tone: "violet" },
  { name: "Fashion", emoji: "✳", image: "/assets/category-backgrounds/fashion.jpg", tone: "rose" },
];

const listings = [
  { title: "Airtel 5G router", price: "KES 1,500", place: "Juja, Kiambu", age: "1w ago", seller: "Clanix", image: "/assets/electronics-subcategories/networking.jpg", tag: "AI Showcase", tagStyle: "showcase" },
  { title: "Airtel 5G router", price: "KES 1,500", place: "Juja, Kiambu", age: "1w ago", seller: "Clanix", image: "/assets/home-discovery/electronics.webp" },
  { title: "Smart home Wi-Fi", price: "KES 2,800", place: "Thika, Kiambu", age: "2d ago", seller: "Mumbi Tech", image: "/assets/category-backgrounds/electronics.jpg" },
  { title: "Dual-band router", price: "KES 3,200", place: "Nairobi", age: "3d ago", seller: "Tech Hub", image: "/assets/electronics-subcategories/networking.jpg" },
];

export function AppPreview() {
  const [query, setQuery] = useState("");
  const [categoryOffset, setCategoryOffset] = useState(0);
  const [activeTab, setActiveTab] = useState("Home");
  const [zenoOpen, setZenoOpen] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const visibleListings = useMemo(() => listings.filter((item) => `${item.title} ${item.place}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const nav = [
    { label: "Home", icon: Grid2X2 },
    { label: "Inbox", icon: Inbox },
    { label: "Sell", icon: Plus },
    { label: "Zeno", icon: Sparkles },
    { label: "Menu", icon: Menu },
  ];

  return (
    <main className="app-preview-page">
      <section className="ap-intro wrap">
        <div className="ap-copy">
          <span className="ap-kicker"><span className="ap-kicker-dot" /> THE BROKA APP / LIVE PREVIEW</span>
          <h1>Good deals start<br /><em>with a little more context.</em></h1>
          <p>Take a closer look at BROKA: a Kenya-first marketplace where you can browse real categories, compare listings and bring Zeno into your search.</p>
          <div className="ap-intro-actions">
            <a className="ap-primary" href="#phone-preview">Explore the preview <ArrowRight size={17} /></a>
            <Link className="ap-secondary" href="/download">Get the app</Link>
          </div>
          <div className="ap-proof"><span><b>01</b> Discover categories</span><span><b>02</b> Compare listings</span><span><b>03</b> Ask Zeno</span></div>
        </div>
        <div className="ap-art" aria-hidden="true">
          <div className="ap-orbit ap-orbit-one" /><div className="ap-orbit ap-orbit-two" />
          <div className="ap-art-glow" />
          <img src="/assets/zeno-full.webp" alt="" />
          <div className="ap-art-note"><span className="ap-live-dot" /> YOUR MARKET, WITH CONTEXT</div>
          <span className="ap-float ap-float-one">21 categories</span><span className="ap-float ap-float-two">Made for Kenya <span>↗</span></span>
        </div>
      </section>

      <section className="ap-stage" id="phone-preview" aria-labelledby="ap-phone-heading">
        <div className="wrap ap-stage-grid">
          <div className="ap-stage-copy">
            <span className="ap-kicker">A closer look</span>
            <h2 id="ap-phone-heading">The home screen,<br /><em>in your hands.</em></h2>
            <p>Scroll the screen, search the sample feed, browse the category rail and tap through the bottom navigation. The layout follows BROKA’s Flutter app; the listings shown here are illustrative preview content.</p>
            <div className="ap-feature-list">
              <div><span className="ap-feature-icon violet"><Search size={18} /></span><span><b>Find your next thing</b><small>Search across products, cars, property and more.</small></span></div>
              <div><span className="ap-feature-icon cyan"><Sparkles size={18} /></span><span><b>Let Zeno help you look</b><small>Ask for a search that fits what you need.</small></span></div>
              <div><span className="ap-feature-icon gold"><Store size={18} /></span><span><b>Connect directly</b><small>See seller and location context on each listing.</small></span></div>
            </div>
            <p className="ap-disclaimer"><span>ⓘ</span> This interactive preview uses sample listings. It is not connected to live inventory or account features.</p>
          </div>

          <div className="ap-device-wrap">
            <div className="ap-device-halo" />
            <div className="ap-device" role="application" aria-label="Interactive BROKA homescreen preview">
              <div className="ap-status"><span>00:51 <span className="ap-status-symbol">◉ ◉</span></span><span>▮▮ ▰ ᯤ <b>66</b></span></div>
              <div className="ap-screen-scroll">
                <header className="ap-app-header">
                  <div className="ap-brand"><img src="/assets/broka-mark.png" alt="" /><span><b>BROKA</b><small>INTELLIGENT COMMERCE</small></span></div>
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
                      <span className="ap-new"><i /> New</span>
                      <button className={`ap-save ${isSaved ? "saved" : ""}`} aria-label={isSaved ? "Remove from saved" : "Save listing"} onClick={() => setSaved(isSaved ? saved.filter((n) => n !== originalIndex) : [...saved, originalIndex])}><Heart size={15} fill={isSaved ? "currentColor" : "none"} /></button>
                      {item.tag && <span className="ap-showcase">✦ {item.tag}</span>}
                    </div>
                    <div className="ap-listing-info"><b className="ap-listing-name">{item.title}</b><div className="ap-listing-price"><strong>{item.price}</strong><button aria-label={`View ${item.title}`}><ArrowRight size={17} /></button></div><div className="ap-listing-meta"><span><MapPin size={13} />{item.place}</span><span>{item.age}</span></div><div className="ap-seller"><span className="ap-seller-avatar">{item.seller.charAt(0)}</span><b>▣ {item.seller} <span>›</span></b></div></div>
                  </article>;
                })}</div> : <div className="ap-empty">No sample listings match “{query}”. Try “router”.</div>}
              </div>
              <nav className="ap-bottom-nav" aria-label="App preview navigation">{nav.map(({ label, icon: Icon }) => <button className={activeTab === label ? "active" : ""} key={label} onClick={() => { setActiveTab(label); if (label === "Zeno") setZenoOpen(true); }}><span>{label === "Zeno" ? <img src="/assets/zeno-icon.png" alt="" /> : <Icon size={22} strokeWidth={2.3} />}</span><small>{label}</small></button>)}</nav>
              <div className="ap-gesture"><i /></div>
            </div>
            <div className="ap-device-caption"><span><i /> INTERACTIVE APP PREVIEW</span><span>SCROLL TO EXPLORE</span></div>
          </div>
        </div>
      </section>

      <section className="ap-end wrap"><div><span className="ap-kicker">Your next find is closer</span><h2>See what the market<br /><em>has waiting for you.</em></h2></div><Link href="/download" className="ap-primary">Get the BROKA app <ArrowRight size={17} /></Link></section>
    </main>
  );
}
