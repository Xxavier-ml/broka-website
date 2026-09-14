"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's prefers-reduced-motion setting live, including changes
 * made while the page is open.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * Conservative signal for whether this device should get the full WebGL
 * hero visualization instead of the lightweight SVG fallback. Errs toward
 * the SVG whenever it can't be confident: small viewports, low core counts,
 * data-saver mode, and reduced-motion preference all fall back to SVG.
 *
 * Returns false during server render and on first paint (no `window` yet),
 * then updates after mount — this intentionally avoids any SSR/client
 * mismatch rather than guessing.
 */
export function useCanRender3D() {
  const reducedMotion = usePrefersReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const smallViewport = window.innerWidth < 768;
    const lowCores =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;

    type NavigatorWithConnection = Navigator & {
      connection?: { saveData?: boolean };
    };
    const nav = navigator as NavigatorWithConnection;
    const saveData = nav.connection?.saveData === true;

    setCapable(!smallViewport && !lowCores && !saveData);
  }, []);

  return capable && !reducedMotion;
}
