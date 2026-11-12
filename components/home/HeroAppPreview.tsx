"use client";

import "@/app/hero-preview.css";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { HomeScreenPreview } from "@/components/app-preview/HomeScreenPreview";
import { ListingDetailPreview } from "@/components/app-preview/ListingDetailPreview";
import { PREVIEW_LISTINGS } from "@/components/app-preview/previewListings";

type Screen = "home" | "listing";

const SCREENS: { id: Screen; label: string }[] = [
  { id: "home", label: "Home screen" },
  { id: "listing", label: "Listing details" },
];

/**
 * The hero's product stage: the app's own screens, the same ones as on
 * /app-preview, drawn at phone size. A visitor can scroll, search and tap
 * through them, and switch between the home screen and a listing. Both are
 * kept mounted (the inactive one is hidden) so a search typed on one screen is
 * still there after a look at the other. Everything is sample content that
 * contacts no one, and /app-preview has every screen at full size.
 */
export function HeroAppPreview() {
  const [screen, setScreen] = useState<Screen>("home");
  const [listingId, setListingId] = useState(PREVIEW_LISTINGS[0]!.id);
  const listing = PREVIEW_LISTINGS.find((item) => item.id === listingId) ?? PREVIEW_LISTINGS[0]!;

  return (
    <div className="hx">
      <span className="hx-glow" aria-hidden="true" />

      <div className="hx-switch" role="group" aria-label="Choose an app screen">
        {SCREENS.map((item) => (
          <button key={item.id} type="button" className="hx-switch-btn" aria-pressed={screen === item.id} onClick={() => setScreen(item.id)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="hx-frame">
        <div className="ap-device hx-device" role="group" aria-label="BROKA home screen preview" hidden={screen !== "home"}>
          <HomeScreenPreview onOpenListing={(id) => { setListingId(id); setScreen("listing"); }} />
        </div>
        <div className="ap-device ap-device-detail hx-device" role="group" aria-label="BROKA listing details preview" hidden={screen !== "listing"}>
          <ListingDetailPreview key={listing.id} listing={listing} onBack={() => setScreen("home")} />
        </div>
      </div>

      <div className="hx-foot">
        <p>Sample screens from the app. Tap around; nothing here contacts a seller.</p>
        <Link href="/app-preview" className="hx-all">
          <Images size={16} aria-hidden="true" /> See all app previews <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
