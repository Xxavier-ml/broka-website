"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { CategoryNode } from "@/lib/api/categories";
import { categoryArtworkSources } from "@/lib/category-assets";
import { ELECTRONICS_SUBCATEGORIES, matchElectronicsSubcategory } from "@/lib/electronics";

export function ElectronicsSubcategoryGrid({ subcategories }: { subcategories: CategoryNode[] }) {
  const available = ELECTRONICS_SUBCATEGORIES.map((config) => ({
    config,
    node: subcategories.find((node) => matchElectronicsSubcategory(node, config)),
  })).filter((entry): entry is { config: typeof ELECTRONICS_SUBCATEGORIES[number]; node: CategoryNode } => Boolean(entry.node));
  const railRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const pointerStartXRef = useRef<number | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !autoScroll || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(max-width: 620px)").matches) return;

    let timer: number | undefined;
    const advanceToNextCard = () => {
      const card = rail.querySelector<HTMLElement>(".category-card");
      if (!card || rail.scrollWidth <= rail.clientWidth) return;
      const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
      const nextIndex = activeIndexRef.current >= available.length - 1 ? 0 : activeIndexRef.current + 1;
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
  }, [autoScroll, available.length]);

  if (available.length === 0) return null;

  const moveByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>(".category-card");
    if (!rail || !card) return;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    const nextIndex = (activeIndex + direction + available.length) % available.length;
    activeIndexRef.current = nextIndex;
    rail.scrollTo({ left: nextIndex * (card.offsetWidth + gap), behavior: "smooth" });
    setActiveIndex(nextIndex);
    setAutoScroll(false);
  };

  return (
    <section className="electronics-subcategory-zone" aria-label="Electronics subcategories">
      <div className="category-card-browser electronics-subcategory-browser">
        <button type="button" className="category-card-nav category-card-nav-prev" aria-label="Previous Electronics subcategory" onClick={() => moveByCard(-1)}>‹</button>
        <nav
          ref={railRef}
          className="category-card-grid"
          aria-label="Electronics subcategories"
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
          onPointerUp={() => { pointerStartXRef.current = null; }}
          onPointerCancel={() => { pointerStartXRef.current = null; }}
          onMouseEnter={() => setAutoScroll(false)}
          onFocusCapture={(event) => {
            if (!(event.target as HTMLElement).closest(".category-card-scroll-toggle")) setAutoScroll(false);
          }}
        >
          {available.map(({ config, node }) => {
            const artwork = categoryArtworkSources(config.image);
            return (
              <Link
                key={node.id}
                href={`/browse/electronics/${config.slug}`}
                className="category-card"
                aria-label={`Browse ${config.name}`}
                style={{ "--category-card-start": config.gradient[0], "--category-card-end": config.gradient[1] } as CSSProperties}
              >
                <span className="category-card-art" aria-hidden="true">
                  {artwork && (
                    <picture>
                      {artwork.srcSet && <source type="image/webp" srcSet={artwork.srcSet} sizes="(max-width: 620px) 72vw, (max-width: 900px) 33vw, 25vw" />}
                      <img src={artwork.fallback} alt="" loading="lazy" decoding="async" />
                    </picture>
                  )}
                </span>
                <span className="category-card-shade" aria-hidden="true" />
                <span className="category-card-copy">
                  <span className="category-card-icon" aria-hidden="true">{node.icon || "✦"}</span>
                  <span className="category-card-name">{config.name}</span>
                  <span className="category-card-arrow" aria-hidden="true">↗</span>
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            className="category-card-scroll-toggle"
            aria-label={autoScroll ? "Pause automatic Electronics subcategory scrolling" : "Resume automatic Electronics subcategory scrolling"}
            aria-pressed={!autoScroll}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setAutoScroll((current) => !current)}
          >
            {autoScroll ? "Ⅱ" : "▶"}
          </button>
        </nav>
        <button type="button" className="category-card-nav category-card-nav-next" aria-label="Next Electronics subcategory" onClick={() => moveByCard(1)}>›</button>
        <span className="category-card-page" aria-live="polite">{activeIndex + 1} / {available.length}</span>
        <div className="category-card-dots" aria-label="Choose Electronics subcategory slide">
          {available.map(({ config }, index) => (
            <button
              key={`dot-${config.slug}`}
              type="button"
              className={`category-card-dot${activeIndex === index ? " active" : ""}`}
              aria-label={`Go to ${config.name}`}
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
    </section>
  );
}
