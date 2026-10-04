"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

/**
 * Turns its contents toward the pointer in 3D (children placed at different
 * depths with translateZ then separate as it turns). Without a mouse, or with
 * reduced motion, CSS gives it a slow idle sway instead, or holds it still.
 * Writes two CSS variables; no re-renders.
 */
export function TiltStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let active = false;

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
      if (active || Math.abs(x) > 0.002 || Math.abs(y) > 0.002) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        el.classList.remove("tracking");
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      // Follow the pointer anywhere in the hero, strongest near the scene.
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      active = true;
      el.classList.add("tracking");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      active = false;
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const host = el.closest("section") ?? el;
    host.addEventListener("pointermove", onMove as EventListener, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={`tilt ${className}`.trim()}>
      <div className="tilt-inner">{children}</div>
    </div>
  );
}
