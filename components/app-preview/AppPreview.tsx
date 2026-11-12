"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Download, Heart, Home, Info, LayoutPanelLeft, Search, ShieldCheck, Sparkles } from "lucide-react";
import { HomeScreenPreview } from "./HomeScreenPreview";
import { ListingDetailPreview } from "./ListingDetailPreview";
import { PREVIEW_LISTINGS } from "./previewListings";

type Screen = "home" | "listing";
type View = "both" | Screen;

const SCREENS: { id: Screen; step: string; kicker: string; title: string; lead: string; points: { icon: typeof Search; text: string }[] }[] = [
  {
    id: "home",
    step: "01",
    kicker: "DISCOVER",
    title: "Home screen",
    lead: "Where every visit starts.",
    points: [
      { icon: Search, text: "Search by typing or by voice" },
      { icon: Home, text: "Shop by category, then scroll the fresh listings" },
      { icon: Sparkles, text: "Hand the search to Zeno in one tap" },
    ],
  },
  {
    id: "listing",
    step: "02",
    kicker: "DECIDE",
    title: "Listing details",
    lead: "Everything you need before you message the seller.",
    points: [
      { icon: Heart, text: "Photos, price, condition and location together" },
      { icon: ShieldCheck, text: "Seller rating and reply time, measured by BROKA" },
      { icon: Sparkles, text: "Zeno’s read on the listing" },
    ],
  },
];

const VIEWS: { id: View; label: string }[] = [
  { id: "both", label: "Side by side" },
  { id: "home", label: "Home screen" },
  { id: "listing", label: "Listing details" },
];

const cardId = (screen: Screen) => `ap-${screen}-preview`;

function smoothOrAuto(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function AppPreview() {
  const [view, setView] = useState<View>("both");
  const [listingId, setListingId] = useState(PREVIEW_LISTINGS[0]!.id);
  const listing = PREVIEW_LISTINGS.find((item) => item.id === listingId) ?? PREVIEW_LISTINGS[0]!;

  // One screen at a time on phones: two side by side don't fit, and a sideways
  // swipe strip hides the second screen. The server renders both; a phone
  // visitor lands on the home screen.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    // /app-preview/listing-detail redirects to #ap-listing-preview.
    setView(window.location.hash === `#${cardId("listing")}` ? "listing" : "home");
  }, []);

  // Used by the screens themselves (a listing was tapped, or "back").
  const openScreen = useCallback((screen: Screen) => {
    setView((current) => (current === "both" ? current : screen));
    requestAnimationFrame(() => {
      document.getElementById(cardId(screen))?.scrollIntoView({ behavior: smoothOrAuto(), block: "nearest", inline: "center" });
    });
  }, []);

  return (
    // A div: the root layout already wraps every page in <main id="main">, and a second main inside it is invalid HTML.
    <div className="app-preview-page apx">
      <section className="apx-hero wrap" aria-labelledby="ap-preview-title">
        <div className="apx-hero-copy">
          <span className="ap-kicker"><span className="ap-kicker-dot" /> THE BROKA APP / PREVIEW</span>
          <h1 id="ap-preview-title">See BROKA<br /><em>in action.</em></h1>
          <p>Two screens from the app, working as they do on your phone. Search, scroll, save and tap through.</p>
          <div className="apx-hero-actions">
            <Link href="/download" className="btn btn-primary btn-lg hp-beam">
              <Download size={18} aria-hidden="true" /> Get the BROKA app
            </Link>
            <Link href="/browse" className="btn btn-ghost btn-lg">
              Browse the marketplace <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
            </Link>
          </div>
          <ul className="apx-hero-facts">
            <li><Check size={13} aria-hidden="true" /> Interactive</li>
            <li><Check size={13} aria-hidden="true" /> Sample data</li>
            <li><Check size={13} aria-hidden="true" /> Contacts no one</li>
          </ul>
        </div>
        <div className="apx-hero-visual" aria-hidden="true">
          <span className="apx-hero-glow" />
          <img src="/assets/zeno-full.webp" alt="" width={220} height={220} />
          <span className="apx-hero-tag"><span className="ap-live-dot" /> SMARTER SEARCH WITH ZENO</span>
        </div>
      </section>

      <section className="apx-stage" id="phone-preview" aria-label="BROKA app screens">
        <div className="wrap">
          <div className="apx-switch" id="ap-switcher" role="group" aria-label="Choose which screens to show">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`apx-switch-btn apx-switch-${item.id}`}
                aria-pressed={view === item.id}
                onClick={() => setView(item.id)}
              >
                {item.id === "both" && <LayoutPanelLeft size={15} aria-hidden="true" />}
                {item.label}
              </button>
            ))}
          </div>

          <div className="apx-gallery" data-view={view}>
            {SCREENS.map((screen) => (
              <article className="apx-card" id={cardId(screen.id)} key={screen.id} hidden={view !== "both" && view !== screen.id}>
                <header className="apx-card-head">
                  <span className="apx-step" aria-hidden="true">{screen.step}</span>
                  <div>
                    <span className="apx-card-kicker">{screen.kicker}</span>
                    <h2>{screen.title}</h2>
                    <p>{screen.lead}</p>
                  </div>
                </header>

                <div className="apx-device-wrap">
                  <span className="apx-device-halo" aria-hidden="true" />
                  {screen.id === "home" ? (
                    <div id="ap-home-device" className="ap-device apx-device" role="group" aria-label="BROKA home screen preview">
                      <HomeScreenPreview onOpenListing={(id) => { setListingId(id); openScreen("listing"); }} />
                    </div>
                  ) : (
                    <div id="ap-listing-device" className="ap-device ap-device-detail apx-device" role="group" aria-label="BROKA listing details preview">
                      <ListingDetailPreview key={listing.id} listing={listing} onBack={() => openScreen("home")} />
                    </div>
                  )}
                </div>

                <ul className="apx-points">
                  {screen.points.map(({ icon: Icon, text }) => (
                    <li key={text}><Icon size={15} aria-hidden="true" /><span>{text}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="apx-note"><Info size={14} aria-hidden="true" /> Products and sellers are illustrative. Nothing here contacts a real seller.</p>
        </div>
      </section>

      <section className="apx-cta wrap" aria-labelledby="apx-cta-title">
        <div className="apx-cta-panel">
          <div>
            <h2 id="apx-cta-title">Like what you see?</h2>
            <p>Install BROKA on Android to talk to real sellers, or keep browsing on the web.</p>
          </div>
          <div className="apx-cta-actions">
            <Link href="/download" className="btn btn-primary btn-lg hp-beam">
              <Download size={18} aria-hidden="true" /> Download for Android
            </Link>
            <Link href="/browse" className="btn btn-ghost btn-lg">Browse on the web</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
