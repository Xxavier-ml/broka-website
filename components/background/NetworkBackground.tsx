"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";

/**
 * BROKA's living network: the connected-dots identity from the app's splash
 * screen, animated behind every page.
 *
 *  - nodes drift slowly and link to their neighbours; links fade with distance,
 *    so the mesh forms and dissolves as the nodes move
 *  - small "packets" travel along links (deals moving between people) and
 *    ring the node they reach
 *  - a few bright hub nodes carry a bloom; the pointer lights up nearby nodes
 *  - nodes sit at different depths, so pointer and scroll move them by
 *    different amounts (parallax)
 *
 * It is one <canvas>, cheap by construction: node count scales with the
 * screen area, glows are pre-rendered sprites, the loop stops while the tab is
 * hidden, and with reduced motion it draws a single still frame and never
 * animates. It is decoration only (aria-hidden, no pointer events).
 */

type Hue = { core: string; glow: string; link: [number, number, number] };

const HUES: Hue[] = [
  { core: "#B8A6FF", glow: "139,107,255", link: [139, 107, 255] }, // violet
  { core: "#7FE4FA", glow: "63,216,245", link: [63, 216, 245] }, // cyan
  { core: "#8FB0FF", glow: "77,123,255", link: [77, 123, 255] }, // blue
  { core: "#E2DBFF", glow: "196,186,255", link: [196, 186, 255] }, // soft
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Depth 0.35 (far) to 1 (near): scales size, speed, brightness and parallax. */
  z: number;
  hue: number;
  hub: boolean;
  phase: number;
  // Screen position this frame (after parallax), reused by links and packets.
  px: number;
  py: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
  hue: number;
}

interface Pulse {
  x: number;
  y: number;
  t: number;
  hue: number;
}

/** A soft glow, drawn once per colour and stamped for every hub and packet. */
function makeSprite(rgb: string): HTMLCanvasElement {
  const size = 96;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb},0.95)`);
  grad.addColorStop(0.18, `rgba(${rgb},0.5)`);
  grad.addColorStop(0.55, `rgba(${rgb},0.12)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const sprites = HUES.map((h) => makeSprite(h.glow));
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    type Nav = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const nav = navigator as Nav;
    const lowPower =
      nav.connection?.saveData === true ||
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let linkDist = 150;
    let particles: Particle[] = [];
    const packets: Packet[] = [];
    const pulses: Pulse[] = [];
    // Pointer, eased so nodes glide toward it rather than snapping.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, nx: 0, ny: 0, tnx: 0, tny: 0, active: false };
    let scrollY = window.scrollY;
    let raf = 0;
    let last = 0;
    let running = false;
    let spawnIn = 0.8;

    function build() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const small = w < 700;
      const area = w * h;
      let count = Math.round(area / (small ? 21000 : 15500));
      count = Math.max(24, Math.min(small ? 46 : 105, count));
      if (lowPower) count = Math.round(count * 0.55);
      linkDist = Math.max(105, Math.min(185, Math.min(w, h) * 0.2));

      particles = Array.from({ length: count }, () => {
        const z = rand(0.35, 1);
        const hub = Math.random() < 0.11;
        const speed = rand(5, 16) * z; // px per second
        const ang = rand(0, Math.PI * 2);
        return {
          x: rand(0, w),
          y: rand(0, h),
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          r: hub ? rand(2.6, 4.2) * (0.6 + z * 0.5) : rand(1, 2.1) * (0.6 + z * 0.6),
          z,
          hue: Math.floor(Math.random() * HUES.length),
          hub,
          phase: rand(0, Math.PI * 2),
          px: 0,
          py: 0,
        };
      });
      packets.length = 0;
      pulses.length = 0;
    }

    function place() {
      // Parallax: pointer shifts nodes by depth; scrolling drifts them upward at a fraction of page speed.
      const mx = pointer.nx * 26;
      const my = pointer.ny * 18;
      const margin = 60;
      const span = h + margin * 2;
      for (const p of particles) {
        const shiftY = -scrollY * 0.07 * p.z;
        p.px = p.x - mx * p.z;
        p.py = ((((p.y + shiftY - my * p.z + margin) % span) + span) % span) - margin;
      }
    }

    function step(dt: number) {
      const margin = 60;
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        // Wrap just outside the screen, so nodes never blink out in view.
        if (p.x < -margin) p.x = w + margin;
        else if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        else if (p.y > h + margin) p.y = -margin;
      }
      // Ease the pointer.
      const k = 1 - Math.pow(0.001, dt);
      pointer.x += (pointer.tx - pointer.x) * k;
      pointer.y += (pointer.ty - pointer.y) * k;
      pointer.nx += (pointer.tnx - pointer.nx) * k * 0.6;
      pointer.ny += (pointer.tny - pointer.ny) * k * 0.6;

      // Packets travel along links; arrival rings the node.
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i]!;
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          const b = particles[pk.b];
          if (b) pulses.push({ x: b.px, y: b.py, t: 0, hue: pk.hue });
          packets.splice(i, 1);
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i]!.t += dt / 1.6;
        if (pulses[i]!.t >= 1) pulses.splice(i, 1);
      }
      spawnIn -= dt;
      if (spawnIn <= 0 && packets.length < (w < 700 ? 4 : 9)) {
        spawnIn = rand(0.35, 1.1);
        spawnPacket();
      }
    }

    function spawnPacket() {
      // Pick a random node and one of its linked neighbours that is on screen.
      for (let tries = 0; tries < 12; tries++) {
        const a = Math.floor(Math.random() * particles.length);
        const pa = particles[a]!;
        if (pa.px < 0 || pa.px > w || pa.py < 0 || pa.py > h) continue;
        const near: number[] = [];
        for (let j = 0; j < particles.length; j++) {
          if (j === a) continue;
          const pb = particles[j]!;
          const dx = pa.px - pb.px;
          const dy = pa.py - pb.py;
          if (dx * dx + dy * dy < linkDist * linkDist) near.push(j);
        }
        if (near.length) {
          packets.push({
            a,
            b: near[Math.floor(Math.random() * near.length)]!,
            t: 0,
            speed: rand(0.35, 0.7),
            hue: pa.hue,
          });
          return;
        }
      }
    }

    function draw(time: number) {
      const c = ctx!;
      c.clearRect(0, 0, w, h);
      const D2 = linkDist * linkDist;

      // Links.
      c.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const d2 = dx * dx + dy * dy;
          if (d2 >= D2) continue;
          const f = 1 - Math.sqrt(d2) / linkDist;
          const alpha = f * f * 0.42 * Math.min(a.z, b.z) + 0.02;
          const [r, g, bl] = HUES[a.hue]!.link;
          c.strokeStyle = `rgba(${r},${g},${bl},${alpha.toFixed(3)})`;
          c.beginPath();
          c.moveTo(a.px, a.py);
          c.lineTo(b.px, b.py);
          c.stroke();
        }
      }

      // The pointer joins the mesh: links to the nearest nodes light up.
      if (pointer.active) {
        const R = 170;
        for (const p of particles) {
          const dx = p.px - pointer.x;
          const dy = p.py - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > R) continue;
          const f = 1 - d / R;
          c.strokeStyle = `rgba(184,166,255,${(f * 0.5).toFixed(3)})`;
          c.beginPath();
          c.moveTo(pointer.x, pointer.y);
          c.lineTo(p.px, p.py);
          c.stroke();
        }
      }

      // Nodes and hub blooms, drawn additively so overlaps glow.
      c.globalCompositeOperation = "lighter";
      for (const p of particles) {
        if (p.px < -20 || p.px > w + 20 || p.py < -20 || p.py > h + 20) continue;
        const tw = 0.6 + 0.4 * Math.sin(time * 0.0011 + p.phase);
        let boost = 0;
        if (pointer.active) {
          const dx = p.px - pointer.x;
          const dy = p.py - pointer.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170) boost = 1 - d / 170;
        }
        const glowR = (p.hub ? 26 : 9) * (0.7 + p.z * 0.5) * (1 + boost * 0.9);
        c.globalAlpha = Math.min(1, (p.hub ? 0.5 : 0.28) * tw * (0.5 + p.z * 0.5) + boost * 0.4);
        c.drawImage(sprites[p.hue]!, p.px - glowR, p.py - glowR, glowR * 2, glowR * 2);
        c.globalAlpha = Math.min(1, (0.55 + 0.45 * tw) * (0.5 + p.z * 0.5) + boost * 0.3);
        c.fillStyle = HUES[p.hue]!.core;
        c.beginPath();
        c.arc(p.px, p.py, p.r * (1 + boost * 0.5), 0, Math.PI * 2);
        c.fill();
      }

      // Packets: a bright head with a short fading tail.
      for (const pk of packets) {
        const a = particles[pk.a];
        const b = particles[pk.b];
        if (!a || !b) continue;
        const e = pk.t < 0.5 ? 2 * pk.t * pk.t : 1 - Math.pow(-2 * pk.t + 2, 2) / 2;
        const x = a.px + (b.px - a.px) * e;
        const y = a.py + (b.py - a.py) * e;
        const tail = Math.max(0, e - 0.16);
        const tx = a.px + (b.px - a.px) * tail;
        const ty = a.py + (b.py - a.py) * tail;
        const [r, g, bl] = HUES[pk.hue]!.link;
        const grad = c.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0.95)`);
        c.globalAlpha = 1;
        c.strokeStyle = grad;
        c.lineWidth = 1.8;
        c.beginPath();
        c.moveTo(tx, ty);
        c.lineTo(x, y);
        c.stroke();
        c.globalAlpha = 0.95;
        c.drawImage(sprites[pk.hue]!, x - 11, y - 11, 22, 22);
      }
      c.globalCompositeOperation = "source-over";
      c.globalAlpha = 1;

      // Arrival rings.
      for (const pl of pulses) {
        const [r, g, bl] = HUES[pl.hue]!.link;
        c.strokeStyle = `rgba(${r},${g},${bl},${((1 - pl.t) * 0.55).toFixed(3)})`;
        c.lineWidth = 1.2;
        c.beginPath();
        c.arc(pl.x, pl.y, 4 + pl.t * 34, 0, Math.PI * 2);
        c.stroke();
      }
    }

    function frame(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      step(dt);
      place();
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    function stillFrame() {
      place();
      draw(0);
    }

    const onResize = () => {
      build();
      if (reduced) stillFrame();
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduced) stillFrame();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.active = true;
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.tnx = e.clientX / w - 0.5;
      pointer.tny = e.clientY / h - 0.5;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.tnx = 0;
      pointer.tny = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };

    build();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!coarse && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) stillFrame();
    else start();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div className="netbg" aria-hidden="true">
      <div className="netbg-glow netbg-glow-a" />
      <div className="netbg-glow netbg-glow-b" />
      <div className="netbg-glow netbg-glow-c" />
      <canvas ref={ref} className="netbg-canvas" />
      <div className="netbg-vignette" />
    </div>
  );
}
