"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Bot, ChevronDown, MapPin, Mic, Navigation, Search, Store as StoreIcon } from "lucide-react";
import type { Store } from "@/lib/api/types";
import { categoryArtSmall, categoryVisual } from "@/lib/categories";
import { StoreDirectoryCard } from "./StoreDirectoryCard";
import styles from "./StoreDirectory.module.css";

type Props = {
  q?: string;
  category?: string;
  county?: string;
  subcounty?: string;
  total: number;
  failed: boolean;
  counties: string[];
  areasByCounty: Record<string, string[]>;
  cards: ReactNode;
  pagination?: ReactNode;
  footer?: ReactNode;
};

type Coordinates = { lat: number; lng: number };
type NearbyReply = { items: Store[]; total: number };

type DirectoryCategory = { name: string; near?: false } | { name: "Near you"; near: true };

// Mirrors StoreCategories.onlineRail in the Flutter app. Dealer-only trades
// are intentionally excluded; this is the online-store category rail.
const STORE_CATEGORIES: DirectoryCategory[] = [
  { name: "Near you", near: true },
  ...[
    "Electronics",
    "Fashion",
    "Home & Furniture",
    "Wholesale and General",
    "Agriculture",
    "Food & Beverages",
    "Beauty & Personal Care",
    "Health & Medical",
    "Baby & Kids",
    "Gaming",
    "Construction",
    "Sports & Fitness",
    "Business & Industrial",
    "Books & Education",
    "Music & Instruments",
    "Arts & Crafts",
    "Pets & Animals",
  ].map((name) => ({ name })),
];

export function StoreDirectoryExperience({
  q = "",
  category,
  county,
  subcounty,
  total,
  failed,
  counties,
  areasByCounty,
  cards,
  pagination,
  footer,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(q);
  const [radius, setRadius] = useState("25");
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [nearby, setNearby] = useState<Store[]>([]);
  const [nearbyTotal, setNearbyTotal] = useState(0);
  const [nearbyState, setNearbyState] = useState<"idle" | "asking" | "loading" | "ready" | "error">("idle");
  const [nearbyError, setNearbyError] = useState("");
  const [expandedNearby, setExpandedNearby] = useState(false);

  function updateParams(changes: Record<string, string | null>) {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value == null || value === "") params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    const query = params.toString();
    router.push(`/stores${query ? `?${query}` : ""}`);
  }

  function categoryHref(name: string) {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    params.set("category", name);
    if (county) params.set("county", county);
    if (subcounty) params.set("subcounty", subcounty);
    return `/stores?${params.toString()}`;
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: search.trim() || null });
  }

  async function fetchNearby(coords: Coordinates, maxDistanceKm: number, limit: number) {
    setNearbyState("loading");
    setNearbyError("");
    try {
      const response = await fetch("/api/store-directory/nearby", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: coords.lat, lng: coords.lng, maxDistanceKm, limit }),
      });
      if (!response.ok) throw new Error("Nearby stores could not be loaded.");
      const result = (await response.json()) as NearbyReply;
      setNearby(result.items ?? []);
      setNearbyTotal(result.total ?? 0);
      setNearbyState("ready");
    } catch {
      setNearbyError("Nearby stores could not be loaded. Please try again.");
      setNearbyState("error");
    }
  }

  function findNearby(limit = 5, maxDistanceKm = Number(radius)) {
    if (position) {
      void fetchNearby(position, maxDistanceKm, limit);
      return;
    }
    if (!navigator.geolocation) {
      setNearbyError("Location is not available in this browser.");
      setNearbyState("error");
      return;
    }
    setNearbyState("asking");
    setNearbyError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextPosition = { lat: coords.latitude, lng: coords.longitude };
        setPosition(nextPosition);
        void fetchNearby(nextPosition, maxDistanceKm, limit);
      },
      (error) => {
        setNearbyError(error.code === error.PERMISSION_DENIED
          ? "Location permission was not granted. You can still browse all stores or filter by county."
          : "We couldn't determine your location. Please try again.");
        setNearbyState("error");
      },
      { enableHighAccuracy: false, maximumAge: 30_000, timeout: 12_000 },
    );
  }

  function openNearYou() {
    document.getElementById("nearby-stores")?.scrollIntoView({ behavior: "smooth", block: "start" });
    findNearby();
  }

  const locationStatus = nearbyState === "asking"
    ? "Waiting for location permission…"
    : nearbyState === "loading"
      ? `Finding stores within ${radius} km…`
      : nearbyState === "ready"
        ? `${nearbyTotal} ${nearbyTotal === 1 ? "store" : "stores"} within ${radius} km of you`
        : "Use your location to find nearby stores";

  return (
    <div className={styles.directory}>
      <section className={styles.hero} aria-labelledby="stores-title">
        <div className={styles.topLine}>
          <Link className={styles.backLink} href="/browse" aria-label="Back to marketplace">
            <ArrowLeft size={23} aria-hidden="true" />
          </Link>
          <span className={styles.storeGlyph} aria-hidden="true"><StoreIcon size={24} /></span>
          <h1 className={styles.pageTitle} id="stores-title">STORES</h1>
        </div>

        <div className={styles.searchRow}>
          <form className={styles.searchBox} onSubmit={submitSearch} role="search">
            <Search size={22} aria-hidden="true" />
            <label className={styles.visuallyHidden} htmlFor="store-directory-search">Search stores and their products</label>
            <input
              id="store-directory-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stores and their products"
              maxLength={100}
            />
          </form>
          <span className={styles.zenoOrb} role="img" aria-label="Zeno assistant">
            <span className={styles.zenoCore}><Bot size={28} aria-hidden="true" /></span>
            <span className={styles.zenoMic}><Mic size={13} aria-hidden="true" /></span>
          </span>
        </div>
      </section>

      <section className={styles.categorySection} aria-labelledby="shop-category-heading">
        <h2 className={styles.sectionKicker} id="shop-category-heading">Shop by category</h2>
        <div className={styles.categoryRail} role="navigation" aria-label="Store categories">
          {STORE_CATEGORIES.map((item) => {
            if (item.near) {
              return (
                <button className={`${styles.categoryTile} ${styles.nearTile}`} key={item.name} type="button" onClick={openNearYou} aria-label="Find stores near you">
                  <span className={styles.nearIcon}><MapPin size={24} fill="currentColor" aria-hidden="true" /></span>
                  <span className={styles.categoryShade} aria-hidden="true" />
                  <span className={styles.categoryLabel}>Near you</span>
                </button>
              );
            }
            const visual = categoryVisual(item.name);
            const selected = category?.toLowerCase() === item.name.toLowerCase();
            return (
              <Link
                className={`${styles.categoryTile} ${selected ? styles.categorySelected : ""}`}
                style={{ borderColor: `${visual.gradient[0]}88` }}
                key={item.name}
                href={categoryHref(item.name)}
                aria-label={`Browse ${item.name} stores`}
                aria-current={selected ? "page" : undefined}
              >
                <span className={styles.categoryArt}>
                  <Image src={categoryArtSmall(item.name, 320)} alt="" fill sizes="(max-width: 640px) 32vw, 180px" />
                </span>
                <span className={styles.categoryShade} aria-hidden="true" />
                <span className={styles.categoryLabel}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className={styles.filters} id="store-filters" role="group" aria-label="Filter stores by location">
        <label className={styles.filter}>
          <MapPin size={18} aria-hidden="true" />
          <span className={styles.visuallyHidden}>County</span>
          <select value={county ?? ""} onChange={(event) => updateParams({ county: event.target.value || null, subcounty: null })}>
            <option value="">County</option>
            {counties.map((name) => <option value={name} key={name}>{name}</option>)}
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </label>
        <label className={`${styles.filter} ${!county || !areasByCounty[county]?.length ? styles.filterDisabled : ""}`}>
          <MapPin size={18} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Area</span>
          <select
            value={subcounty ?? ""}
            disabled={!county || !areasByCounty[county]?.length}
            onChange={(event) => updateParams({ subcounty: event.target.value || null })}
          >
            <option value="">Area</option>
            {(county ? areasByCounty[county] ?? [] : []).map((name) => <option value={name} key={name}>{name}</option>)}
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </label>
        <label className={`${styles.filter} ${!position ? styles.filterDisabled : ""}`}>
          <Navigation size={18} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Distance from you</span>
          <select
            value={radius}
            disabled={!position}
            onChange={(event) => {
              const value = event.target.value;
              setRadius(value);
              if (position) void fetchNearby(position, Number(value), expandedNearby ? 20 : 5);
            }}
          >
            <option value="25">Distance</option>
            <option value="5">Within 5 km</option>
            <option value="25">Within 25 km</option>
            <option value="50">Within 50 km</option>
            <option value="100">Within 100 km</option>
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </label>
      </div>

      <section className={styles.nearbySection} id="nearby-stores" aria-labelledby="nearby-title">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionIcon} aria-hidden="true"><Navigation size={18} fill="currentColor" /></span>
          <div className={styles.sectionHeadingCopy}>
            <h2 className={styles.sectionTitle} id="nearby-title">Nearby stores</h2>
            <p className={styles.sectionMeta} aria-live="polite">{locationStatus}</p>
          </div>
          {nearbyState === "ready" && nearby.length > 0 ? (
            <button
              className={styles.sectionAction}
              type="button"
              onClick={() => {
                const nextExpanded = !expandedNearby;
                setExpandedNearby(nextExpanded);
                findNearby(nextExpanded ? 20 : 5);
              }}
            >
              {expandedNearby ? "Show fewer" : "See all"} <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button className={styles.sectionAction} type="button" onClick={() => findNearby()} disabled={nearbyState === "asking" || nearbyState === "loading"}>
              {nearbyState === "asking" || nearbyState === "loading" ? "Finding…" : "Use location"} <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {nearbyError && <p className={styles.locationError} role="status">{nearbyError}</p>}
        {nearbyState === "ready" && nearby.length > 0 ? (
          <div className={styles.nearbyList}>
            {nearby.map((store) => <StoreDirectoryCard key={store.id} store={store} />)}
          </div>
        ) : nearbyState === "ready" ? (
          <p className={styles.nearbyEmpty}>No stores were found within {radius} km. Try a wider distance or browse all stores below.</p>
        ) : (
          <button className={styles.locationPrompt} type="button" onClick={() => findNearby()} disabled={nearbyState === "asking" || nearbyState === "loading"}>
            <span className={styles.locationPromptIcon}><MapPin size={19} aria-hidden="true" /></span>
            <span><strong>Find stores close to you</strong><small>Your browser asks for permission only after you tap. Your location is used for this search and is not saved to your profile.</small></span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        )}
      </section>

      <section className={styles.allSection} aria-labelledby="all-stores-title">
        <header className={styles.allHeader}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIcon} aria-hidden="true"><StoreIcon size={18} /></span>
            <div className={styles.sectionHeadingCopy}>
              <h2 className={styles.sectionTitle} id="all-stores-title">All stores</h2>
              <p className={styles.sectionMeta} role="status">
                {failed ? "Stores unavailable" : `${total.toLocaleString("en-KE")} ${total === 1 ? "store" : "stores"}${category ? ` in ${category}` : " across Kenya"}`}
              </p>
            </div>
          </div>
          <Link className={styles.allLink} href="/stores">Browse all <ArrowRight size={16} aria-hidden="true" /></Link>
        </header>
        <div className={styles.storeList}>{cards}</div>
        {pagination && <div className={styles.pagination}>{pagination}</div>}
      </section>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
