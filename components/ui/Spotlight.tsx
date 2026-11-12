"use client";

import { useEffect } from "react";

/**
 * Lets cards light up where the pointer is. One passive listener for the whole
 * site writes the pointer position into --mx / --my on the card under it, at
 * most once a frame; the glow itself is CSS (app/experience.css). Mouse and
 * pen only, so touch screens never pay for it.
 */
const SELECTOR = "[data-spotlight], .card, .ccard, .pillar, .wib-pov, .journey-step, .zeno-route-cap, .sell-route-path, .dl-step";

export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${(x - rect.left).toFixed(1)}px`);
      target.style.setProperty("--my", `${(y - rect.top).toFixed(1)}px`);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>(SELECTOR) : null;
      if (!element) return;
      target = element;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
