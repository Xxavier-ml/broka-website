"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { categoryArtworkSources } from "@/lib/category-assets";
import { withQuery } from "@/lib/params";

type CategoryRailItem = {
  key: string;
  href: string;
  label: string;
  emoji: string;
  image?: string;
  gradient?: readonly [string, string];
  active?: boolean;
  isDestination?: boolean;
};

const BROWSE_DESTINATIONS: CategoryRailItem[] = [
  {
    key: "destination-trending",
    href: "/browse",
    label: "Trending",
    emoji: "🔥",
    image: "/assets/home-discovery/trending.webp",
    gradient: ["#F472B6", "#FF6B9D"],
    isDestination: true,
  },
  {
    key: "destination-stores",
    href: "/stores",
    label: "Stores",
    emoji: "🏬",
    image: "/assets/home-discovery/stores.webp",
    gradient: ["#8B5CF6", "#8B5CF6"],
    isDestination: true,
  },
];

const FLUTTER_CATEGORY_ORDER = [
  "Electronics",
  "Fashion",
  "Home & Furniture",
  "Food & Beverages",
  "Beauty & Personal Care",
  "Health & Medical",
  "Baby & Kids",
  "Agriculture",
  "Gaming",
  "Sports & Fitness",
  "Construction",
  "Automobiles",
  "Property",
  "Land",
  "Books & Education",
  "Music & Instruments",
  "Arts & Crafts",
  "Business & Industrial",
  "Pets & Animals",
  "Services",
  "Other",
] as const;

const BROWSE_CATEGORY_RANK = new Map<string, number>(
  FLUTTER_CATEGORY_ORDER.map((name, index) => [name.toLowerCase(), index] as const),
);

/** Shared marketplace category browser. "All" clears only the category selection. */
export function CategoryChips({
  basePath,
  active,
  keep = {},
  className = "",
}: {
  basePath: string;
  active?: string | null;
  /** Other query values to carry over when a category is chosen. */
  keep?: Record<string, string | undefined>;
  className?: string;
}) {
  const railRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const pointerStartXRef = useRef<number | null>(null);
  const isBrowseRail = className.includes("browse-category-rail");
  const [autoScroll, setAutoScroll] = useState(!isBrowseRail);
  const [activeIndex, setActiveIndex] = useState(0);
  const browseCategories = isBrowseRail
    ? CATEGORIES.map((category, index) => ({ category, index }))
        .sort((a, b) => {
          const lastRank = FLUTTER_CATEGORY_ORDER.length - 1;
          const aRank = BROWSE_CATEGORY_RANK.get(a.category.name.trim().toLowerCase()) ?? lastRank;
          const bRank = BROWSE_CATEGORY_RANK.get(b.category.name.trim().toLowerCase()) ?? lastRank;
          return aRank - bRank || a.index - b.index;
        })
        .map(({ category }) => category)
    : CATEGORIES;
  const categoryItems: CategoryRailItem[] = browseCategories.map((category) => ({
    key: category.name,
    href: basePath === "/browse"
      ? withQuery(`/browse/${categorySlug(category.name)}`, keep)
      : withQuery(basePath, { ...keep, category: category.name }),
    label: category.name,
    emoji: category.emoji,
    image: category.backgroundArt,
    gradient: category.gradient,
    active: active === category.name,
  }));
  const items: CategoryRailItem[] = isBrowseRail
    ? [...BROWSE_DESTINATIONS, ...categoryItems]
    : categoryItems;
  const itemCount = items.length;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || isBrowseRail || !autoScroll || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(max-width: 620px)").matches) return;

    let timer: number | undefined;
    const advanceToNextCard = () => {
      const card = rail.querySelector<HTMLElement>(".category-card");
      if (!card || rail.scrollWidth <= rail.clientWidth) return;
      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
      const nextIndex = activeIndexRef.current >= itemCount - 1 ? 0 : activeIndexRef.current + 1;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      rail.scrollTo({ left: nextIndex * (card.offsetWidth + gap), behavior: "smooth" });
    };
    const scheduleNext = () => {
      timer = window.setTimeout(() => {
        advanceToNextCard();
        scheduleNext();
      }, 3500);
    };
    scheduleNext();
    return () => { if (timer) window.clearTimeout(timer); };
  }, [autoScroll, isBrowseRail, itemCount]);

  const moveByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".category-card");
    if (!rail || !card) return;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    const nextIndex = (activeIndex + direction + items.length) % items.length;
    activeIndexRef.current = nextIndex;
    rail.scrollTo({ left: nextIndex * (card.offsetWidth + gap), behavior: "smooth" });
    setActiveIndex(nextIndex);
    setAutoScroll(false);
  };

  const browseChipHook = isBrowseRail ? " chip" : "";
  const browseTickerHook = isBrowseRail ? " category-ticker-group" : "";
  const categoryImageSizes = "(max-width: 385px) 78vw, (max-width: 620px) 300px, (max-width: 900px) 36vw, 25vw";

  return (
    <div className={`category-card-browser${isBrowseRail ? " browse-category-browser" : ""}`}>
      <button type="button" className="category-card-nav category-card-nav-prev" aria-label="Previous category" onClick={() => moveByCard(-1)}>‹</button>
      <nav
        ref={railRef}
        className={`category-card-grid${className ? ` ${className}` : ""}${browseTickerHook}`}
        aria-label={isBrowseRail ? "Marketplace destinations and categories" : "Marketplace categories"}
        onScroll={(event) => {
          const rail = event.currentTarget;
          const card = rail.querySelector<HTMLElement>(".category-card");
          if (!card) return;
          const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
          const nextIndex = Math.round(rail.scrollLeft / (card.offsetWidth + gap));
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }}
        onPointerDown={(event) => {
          if (!(event.target as HTMLElement).closest(".category-card-scroll-toggle")) pointerStartXRef.current = event.clientX;
        }}
        onPointerMove={(event) => {
          if (pointerStartXRef.current != null && Math.abs(event.clientX - pointerStartXRef.current) > 8) {
            pointerStartXRef.current = null;
            setAutoScroll(false);
          }
        }}
        onPointerUp={() => {
          pointerStartXRef.current = null;
        }}
        onPointerCancel={() => {
          pointerStartXRef.current = null;
        }}
        onMouseEnter={() => setAutoScroll(false)}
        onFocusCapture={(event) => {
          if (!(event.target as HTMLElement).closest(".category-card-scroll-toggle")) setAutoScroll(false);
        }}
      >
      {items.map((item) => {
        const artwork = item.image
          ? item.image.toLowerCase().endsWith(".webp")
            ? { fallback: item.image, srcSet: undefined }
            : categoryArtworkSources(item.image)
          : null;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`category-card${browseChipHook}${item.active ? " active" : ""}`}
            aria-label={item.active ? `${item.label}, selected` : item.isDestination ? `Open ${item.label}` : `Browse ${item.label}`}
            aria-current={item.active ? "page" : undefined}
            style={item.image ? { "--category-card-start": item.gradient?.[0], "--category-card-end": item.gradient?.[1] } as CSSProperties : undefined}
          >
            <span className="category-card-art" aria-hidden="true">
              {artwork && (
                <picture>
                  {artwork.srcSet && (
                    <source type="image/webp" srcSet={artwork.srcSet} sizes={categoryImageSizes} />
                  )}
                  <img src={artwork.fallback} alt="" loading="lazy" decoding="async" />
                </picture>
              )}
            </span>
            <span className="category-card-shade" aria-hidden="true" />
            <span className="category-card-copy">
              <span className="category-card-icon" aria-hidden="true">{item.emoji}</span>
              <span className="category-card-name">{item.label}</span>
              <span className="category-card-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        );
      })}
      <button
        type="button"
        className="category-card-scroll-toggle"
        aria-label={autoScroll ? "Pause automatic category scrolling" : "Resume automatic category scrolling"}
        aria-pressed={!autoScroll}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => setAutoScroll((current) => !current)}
      >
        {autoScroll ? "Ⅱ" : "▶"}
      </button>
      </nav>
      <button type="button" className="category-card-nav category-card-nav-next" aria-label="Next category" onClick={() => moveByCard(1)}>›</button>
      <span className="category-card-page" aria-live="polite">{activeIndex + 1} / {items.length}</span>
      <div className="category-card-dots" aria-label="Choose category slide">
        {items.map((item, index) => (
          <button
            key={`dot-${item.key}`}
            type="button"
            className={`category-card-dot${activeIndex === index ? " active" : ""}`}
            aria-label={`Go to ${item.label}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => {
              const rail = railRef.current;
              const card = rail?.querySelector<HTMLElement>(".category-card");
              if (!rail || !card) return;
              const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
              activeIndexRef.current = index;
              setActiveIndex(index);
              setAutoScroll(false);
              rail.scrollTo({ left: index * (card.offsetWidth + gap), behavior: "smooth" });
            }}
          />
        ))}
      </div>
    </div>
  );
}
