"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { CategoryNode } from "@/lib/api/categories";
import { categoryArtworkSources } from "@/lib/category-assets";
import { categorySlug, categoryVisual } from "@/lib/categories";
import { automobileSubcategoryArtwork, automobileSubcategorySlug } from "@/lib/automobiles";
import { propertySubcategoryArtwork } from "@/lib/property";
import { landSubcategoryArtwork } from "@/lib/land";
import { fashionSubcategoryArtwork } from "@/lib/fashion";
import { homeFurnitureSubcategoryArtwork } from "@/lib/home-furniture";
import { foodBeveragesSubcategoryArtwork } from "@/lib/food-beverages";
import { agricultureSubcategoryArtwork } from "@/lib/agriculture";
import { constructionSubcategoryArtwork } from "@/lib/construction";
import { beautySubcategoryArtwork } from "@/lib/beauty";
import { healthMedicalSubcategoryArtwork } from "@/lib/health-medical";
import { babyKidsSubcategoryArtwork } from "@/lib/baby-kids";
import { gamingSubcategoryArtwork } from "@/lib/gaming";
import { sportsFitnessSubcategoryArtwork } from "@/lib/sports-fitness";
import { booksEducationSubcategoryArtwork } from "@/lib/books-education";
import { musicInstrumentsSubcategoryArtwork } from "@/lib/music-instruments";
import { businessIndustrialSubcategoryArtwork } from "@/lib/business-industrial";
import { petsAnimalsSubcategoryArtwork } from "@/lib/pets-animals";
import { artsCraftsSubcategoryArtwork } from "@/lib/arts-crafts";
import { servicesSubcategoryArtwork } from "@/lib/services";
import { ELECTRONICS_SUBCATEGORIES, matchElectronicsSubcategory } from "@/lib/electronics";
import { withQuery } from "@/lib/params";

type CardItem = {
  key: string;
  name: string;
  icon: string;
  href: string;
  image?: string;
  gradient: [string, string];
};

export function CategorySubcategoryGrid({
  category,
  route,
  subcategories,
  keep = {},
}: {
  category: string;
  route: string;
  subcategories: CategoryNode[];
  keep?: Record<string, string | undefined>;
}) {
  const visual = categoryVisual(category);
  const isElectronics = category.toLowerCase() === "electronics";
  const isBeauty = category.toLowerCase() === "beauty & personal care";
  const isHealthMedical = category.toLowerCase() === "health & medical";
  const isBabyKids = category.toLowerCase() === "baby & kids";
  const isGaming = category.toLowerCase() === "gaming";
  const isSportsFitness = category.toLowerCase() === "sports & fitness";
  const isBooksEducation = category.toLowerCase() === "books & education";
  const isMusicInstruments = category.toLowerCase() === "music & instruments";
  const isBusinessIndustrial = category.toLowerCase() === "business & industrial";
  const isPetsAnimals = category.toLowerCase() === "pets & animals";
  const isArtsCrafts = category.toLowerCase() === "arts & crafts";
  const isServices = category.toLowerCase() === "services";
  const isAutomobiles = category.toLowerCase() === "automobiles";
  const isProperty = category.toLowerCase() === "property";
  const isLand = category.toLowerCase() === "land";
  const isFashion = category.toLowerCase() === "fashion";
  const isHomeFurniture = category.toLowerCase() === "home & furniture";
  const isFoodBeverages = category.toLowerCase() === "food & beverages";
  const isAgriculture = category.toLowerCase() === "agriculture";
  const isConstruction = category.toLowerCase() === "construction";
  const electronicsItems = ELECTRONICS_SUBCATEGORIES.map((config) => {
    const node = subcategories.find((candidate) => matchElectronicsSubcategory(candidate, config));
    return node ? {
      key: node.id,
      name: config.name,
      icon: node.icon || "✦",
      href: `/browse/electronics/${config.slug}`,
      image: config.image,
      gradient: config.gradient,
    } : null;
  }).filter(Boolean) as CardItem[];
  const beautyItems: CardItem[] = subcategories.map((node) => {
    const artwork = beautySubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const healthMedicalItems: CardItem[] = subcategories.map((node) => {
    const artwork = healthMedicalSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const babyKidsItems: CardItem[] = subcategories.map((node) => {
    const artwork = babyKidsSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const gamingItems: CardItem[] = subcategories.map((node) => {
    const artwork = gamingSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const sportsFitnessItems: CardItem[] = subcategories.map((node) => {
    const artwork = sportsFitnessSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const booksEducationItems: CardItem[] = subcategories.map((node) => {
    const artwork = booksEducationSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const musicInstrumentsItems: CardItem[] = subcategories.map((node) => {
    const artwork = musicInstrumentsSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const businessIndustrialItems: CardItem[] = subcategories.map((node) => {
    const artwork = businessIndustrialSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const petsAnimalsItems: CardItem[] = subcategories.map((node) => {
    const artwork = petsAnimalsSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const artsCraftsItems: CardItem[] = subcategories.map((node) => {
    const artwork = artsCraftsSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const servicesItems: CardItem[] = subcategories.map((node) => {
    const artwork = servicesSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const automobileItems: CardItem[] = subcategories.map((node) => {
    const artwork = automobileSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: `/browse/automobiles/${automobileSubcategorySlug(node.name)}`,
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const propertyItems: CardItem[] = subcategories.map((node) => {
    const artwork = propertySubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const landItems: CardItem[] = subcategories.map((node) => {
    const artwork = landSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const fashionItems: CardItem[] = subcategories.map((node) => {
    const artwork = fashionSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const homeFurnitureItems: CardItem[] = subcategories.map((node) => {
    const artwork = homeFurnitureSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const foodBeveragesItems: CardItem[] = subcategories.map((node) => {
    const artwork = foodBeveragesSubcategoryArtwork(node.name);
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
  const items: CardItem[] = isElectronics ? electronicsItems : isBeauty ? beautyItems : isHealthMedical ? healthMedicalItems : isBabyKids ? babyKidsItems : isGaming ? gamingItems : isSportsFitness ? sportsFitnessItems : isBooksEducation ? booksEducationItems : isMusicInstruments ? musicInstrumentsItems : isBusinessIndustrial ? businessIndustrialItems : isPetsAnimals ? petsAnimalsItems : isArtsCrafts ? artsCraftsItems : isServices ? servicesItems : isAutomobiles ? automobileItems : isProperty ? propertyItems : isLand ? landItems : isFashion ? fashionItems : isHomeFurniture ? homeFurnitureItems : isFoodBeverages ? foodBeveragesItems : subcategories.map((node) => {
    const artwork = isAgriculture ? agricultureSubcategoryArtwork(node.name) : isConstruction ? constructionSubcategoryArtwork(node.name) : null;
    return {
      key: node.id,
      name: node.name,
      icon: node.icon || visual.emoji,
      href: withQuery(route, { ...keep, subcategory_id: node.id }),
      image: artwork?.image ?? visual.backgroundArt,
      gradient: artwork?.gradient ?? visual.gradient,
    };
  });
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
      const nextIndex = activeIndexRef.current >= items.length - 1 ? 0 : activeIndexRef.current + 1;
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
  }, [autoScroll, items.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.querySelectorAll<HTMLImageElement>(".category-card-art img").forEach((image) => {
      if (image.complete && image.naturalWidth > 0) image.classList.add("is-loaded");
    });
  }, [items.length]);

  if (items.length === 0) return null;

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

  return (
    <section className="category-subcategory-zone" aria-label={`${category} subcategories`}>
      <div className="category-subcategory-heading">
        <span>{category} subcategories</span>
        <Link href={`/browse/subcategories/${categorySlug(category)}`} className="browse-see-all-categories">See all <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="category-card-browser category-subcategory-browser">
        <button type="button" className="category-card-nav category-card-nav-prev" aria-label={`Previous ${category} subcategory`} onClick={() => moveByCard(-1)}>‹</button>
        <nav
          ref={railRef}
          className="category-card-grid"
          aria-label={`${category} subcategories`}
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
          {items.map((item, index) => {
            const artwork = categoryArtworkSources(item.image);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`category-card${isAutomobiles ? " automobile-subcategory-card" : ""}`}
                aria-label={`Browse ${item.name}`}
                style={{ "--category-card-start": item.gradient[0], "--category-card-end": item.gradient[1] } as CSSProperties}
              >
                <span className={`category-card-art${artwork ? "" : " no-image"}`} aria-hidden="true">
                  {artwork && (
                    <picture>
                      {artwork.srcSet && <source type="image/webp" srcSet={artwork.srcSet} sizes="(max-width: 620px) 72vw, (max-width: 900px) 33vw, 25vw" />}
                      <img
                        src={artwork.fallback}
                        alt=""
                        loading={index < 2 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "low"}
                        decoding="async"
                        sizes="(max-width: 620px) 92vw, (max-width: 900px) 33vw, 25vw"
                        onLoad={(event) => event.currentTarget.classList.add("is-loaded")}
                        onError={(event) => {
                          event.currentTarget.classList.add("is-error");
                          event.currentTarget.closest(".category-card-art")?.classList.add("no-image");
                        }}
                      />
                    </picture>
                  )}
                </span>
                <span className="category-card-shade" aria-hidden="true" />
                <span className="category-card-copy">
                  <span className="category-card-icon" aria-hidden="true">{item.icon}</span>
                  <span className="category-card-name">{item.name}</span>
                  <span className="category-card-arrow" aria-hidden="true">↗</span>
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            className="category-card-scroll-toggle"
            aria-label={autoScroll ? `Pause automatic ${category} subcategory scrolling` : `Resume automatic ${category} subcategory scrolling`}
            aria-pressed={!autoScroll}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setAutoScroll((current) => !current)}
          >
            {autoScroll ? "Ⅱ" : "▶"}
          </button>
        </nav>
        <button type="button" className="category-card-nav category-card-nav-next" aria-label={`Next ${category} subcategory`} onClick={() => moveByCard(1)}>›</button>
        <span className="category-card-page" aria-live="polite">{activeIndex + 1} / {items.length}</span>
        <div className="category-card-dots" aria-label={`Choose ${category} subcategory slide`}>
          {items.map((item, index) => (
            <button
              key={`dot-${item.key}`}
              type="button"
              className={`category-card-dot${activeIndex === index ? " active" : ""}`}
              aria-label={`Go to ${item.name}`}
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
