"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: number;
  phase: number;
};

/**
 * Responsive BROKA background animation.
 * Desktop and mobile use separate generated loops so particle density can adapt
 * instead of relying on a cropped desktop video on narrow screens. The canvas
 * adds a very restrained pointer-reactive layer above the video.
 */
export function VideoBackground() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = performance.now();

    const random = (min: number, max: number) => min + Math.random() * (max - min);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.35 : 1.6);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(105, Math.max(34, (width * height) / 18500)));
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: random(0, width),
          y: random(0, height),
          vx: random(-0.08, 0.08),
          vy: random(-0.07, 0.07),
          radius: random(0.7, 1.8),
          alpha: random(0.18, 0.55),
          hue: Math.random() > 0.62 ? 205 : 260,
          phase: random(0, Math.PI * 2),
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const draw = (now: number) => {
      const delta = Math.min(32, now - last);
      last = now;
      const seconds = now / 1000;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        let glow = 0;
        let hoverHue = particle.hue;
        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150 && distance > 0.001) {
            const force = (1 - distance / 150) * 0.16;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
            glow = 1 - distance / 150;
            // Sweep the BROKA palette from violet through electric blue to cyan
            // based on pointer position, then blend nearby particles toward it.
            const palettePosition = Math.max(0, Math.min(1, pointer.x / Math.max(1, width)));
            hoverHue = 260 - palettePosition * 70;
          }
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;

        const pulse = 0.82 + Math.sin(seconds * 0.55 + particle.phase) * 0.18;
        const alpha = Math.min(0.85, particle.alpha * pulse + glow * 0.28);
        const radius = particle.radius + glow * 1.6;
        const hue = particle.hue + (hoverHue - particle.hue) * glow * 0.82;
        const saturation = 88 + glow * 12;
        const lightness = 62 + glow * 12;
        const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 5.5);
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness + 16}%, ${alpha})`);
        gradient.addColorStop(0.28, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.42})`);
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness - 2}%, 0)`);
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 5.5, 0, Math.PI * 2);
        context.fill();
      }

      // Connect only nearby points, keeping the layer quiet and inexpensive.
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 145) continue;
          const alpha = (1 - distance / 145) * 0.075;
          context.strokeStyle = `rgba(129, 117, 255, ${alpha})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced]);

  return (
    <div className="netbg" aria-hidden="true">
      <video
        className="netbg-video"
        autoPlay={!reduced}
        loop
        muted
        playsInline
        preload="none"
        poster="/broka-bg-mobile-poster.webp"
      >
        <source media="(min-width: 760px)" src="/broka-bg-desktop.mp4" type="video/mp4" />
        <source src="/broka-bg-mobile.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className="netbg-particles" />
      {reduced && (
        <picture className="netbg-poster">
          <source media="(min-width: 760px)" srcSet="/broka-bg-desktop-poster.webp" />
          <img src="/broka-bg-mobile-poster.webp" alt="" />
        </picture>
      )}
    </div>
  );
}
