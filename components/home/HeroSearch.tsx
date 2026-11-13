"use client";

import { useEffect, useRef, useState } from "react";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

/** Things people really search for; plain keywords, because that is what the catalogue search matches. */
const EXAMPLES = ["iPhone 13 Pro", "Toyota Axio 2016", "2 bedroom in Kilimani", "L-shaped sofa", "Land in Kitengela", "Dairy cows", "PS5 console"];

/**
 * The hero's marketplace search with a typed hint behind it.
 *
 * The hint is decorative: an aria-hidden line drawn over the empty field while
 * it is not focused (the real placeholder takes over on focus, and is what
 * assistive technology reads). Only the hint re-renders while it types; the
 * search form itself is never touched. It holds still for reduced motion and
 * pauses off screen or in a background tab.
 */
function TypedHint() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(EXAMPLES[0]!);

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) {
      setText(EXAMPLES[0]!);
      return;
    }
    let word = 0;
    let chars = EXAMPLES[0]!.length;
    let deleting = true;
    let timer = 0;
    let visible = false;

    // Delete the shown example, pause, type the next one, hold it, repeat.
    const tick = () => {
      let delay: number;
      if (deleting) {
        chars -= 1;
        if (chars <= 0) {
          chars = 0;
          deleting = false;
          word = (word + 1) % EXAMPLES.length;
          delay = 320;
        } else delay = 28;
      } else {
        chars += 1;
        if (chars >= EXAMPLES[word]!.length) {
          chars = EXAMPLES[word]!.length;
          deleting = true;
          delay = 2200;
        } else delay = 64;
      }
      setText(EXAMPLES[word]!.slice(0, chars));
      if (visible) timer = window.setTimeout(tick, delay);
    };

    const sync = (onScreen: boolean) => {
      const next = onScreen && document.visibilityState === "visible";
      if (next === visible) return;
      visible = next;
      window.clearTimeout(timer);
      if (visible) timer = window.setTimeout(tick, 1800);
    };
    let onScreen = false;
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      sync(onScreen);
    });
    observer.observe(el);
    const onVisibility = () => sync(onScreen);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <span ref={ref} className="hp-hint" aria-hidden="true">
      <span className="hp-hint-lead">Search</span>
      <span className="hp-hint-text">{text}</span>
      <i className="hp-hint-caret" />
    </span>
  );
}

export function HeroSearch() {
  return (
    <div className="hp-hero-search">
      <SearchForm
        action="/browse"
        placeholder="Search phones, cars, land…"
        className="hp-search"
        iconSubmit
        showSuggestionsOnEmptyFocus={false}
        label="Search the marketplace"
      />
      <TypedHint />
    </div>
  );
}
