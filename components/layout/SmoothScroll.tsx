"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

/**
 * Momentum smooth-scrolling. Deliberately skipped when the user has asked
 * for reduced motion — hijacking scroll is exactly the kind of thing that
 * setting exists to opt out of.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let destroy: (() => void) | null = null;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.09 });
      destroy = () => lenis.destroy();

      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }).catch(() => undefined);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      destroy?.();
    };
  }, [reduced]);

  return null;
}
