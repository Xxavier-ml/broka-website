import Link from "next/link";
import { categorySlug, categoryVisual } from "@/lib/categories";
import { Sparkles } from "lucide-react";
import { TiltStage } from "./TiltStage";

/**
 * Zeno at the centre of BROKA's marketplace, as in the mockup: the robot in a
 * glowing ring, a tilted orbit with light running round it (behind him at the
 * top, in front at the bottom), and the categories floating on glass tiles.
 *
 * One SVG holds the orbit and Zeno so the orbit can pass behind and in front
 * of him on a single animation timeline. Nothing large inside it animates
 * (only the small travelling lights), so the browser never has to redraw the
 * whole picture: the pulsing aura and the glowing, spinning rings are HTML
 * layers the GPU animates on its own. The tiles and the speech bubble are
 * HTML on top (the tiles are real links). TiltStage turns the whole scene
 * toward the pointer in 3D, and the layers sit at different depths.
 */

// Orbit geometry, in the SVG's 1000 x 940 viewBox.
const CX = 500;
const CY = 480;
const RX = 452;
const RY = 196;
const TILT = -13;
const ORBIT = `M ${CX - RX} ${CY} a ${RX} ${RY} 0 1 0 ${2 * RX} 0 a ${RX} ${RY} 0 1 0 ${-2 * RX} 0`;
const RX2 = 488;
const RY2 = 290;
const ORBIT2 = `M ${CX - RX2} ${CY} a ${RX2} ${RY2} 0 1 0 ${2 * RX2} 0 a ${RX2} ${RY2} 0 1 0 ${-2 * RX2} 0`;

// Fixed lights on the orbit (angle in degrees), like the bright nodes in the mockup.
const NODES = [8, 52, 118, 163, 205, 248, 292, 331];
const nodeAt = (deg: number) => {
  const t = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(t), y: CY + RY * Math.sin(t), back: Math.sin(t) < 0 };
};

// Travelling lights: duration and start offset so they are spread round the ring.
const COMETS = [
  { dur: 14, begin: 0, r: 7, color: "#E9E2FF" },
  { dur: 14, begin: -7, r: 5.5, color: "#7FE4FA" },
  { dur: 21, begin: -3, r: 4.5, color: "#C5B4FF" },
];

// x, y: where each tile sits on wide screens; mx, my: on phones, where the
// scene spans the whole screen width and the outer tiles must come inward.
//
// Only the position is set here. The name, the wording and the emoji come from
// the canonical category list (lib/categories.ts), so a tile, the category rail
// below it and the catalogue page all call the same category the same thing —
// the tiles used to say "Vehicles" and "Businesses" beside chips that said
// "Automobiles" and "Business & Industrial", with two different emoji for
// Electronics and Fashion.
const TILES = [
  { name: "Property", x: 15, y: 20, mx: 14, my: 17, delay: 0, tilt: -6 },
  { name: "Automobiles", x: 56, y: 5, mx: 50, my: 6, delay: -1.4, tilt: 4 },
  { name: "Electronics", x: 90, y: 14, mx: 86, my: 14, delay: -2.9, tilt: 7 },
  { name: "Fashion", x: 89, y: 65, mx: 87, my: 74, delay: -4.1, tilt: 6 },
  { name: "Business & Industrial", x: 63, y: 91, mx: 52, my: 95, delay: -2.2, tilt: -5 },
  { name: "Agriculture", x: 17, y: 77, mx: 13, my: 72, delay: -3.5, tilt: -7 },
] as const;

function Comet({ c, back }: { c: (typeof COMETS)[number]; back: boolean }) {
  // Drawn twice (behind and in front of Zeno, each clipped to its half) on
  // the same timeline, so it looks like one light going round.
  return (
    <g clipPath={`url(#${back ? "zo-back" : "zo-front"})`}>
      <g transform={`rotate(${TILT} ${CX} ${CY})`}>
        <g>
          <circle r={c.r * 5} fill="url(#zo-glow)" opacity="0.9" />
          <circle r={c.r} fill={c.color} />
          <animateMotion dur={`${c.dur}s`} begin={`${c.begin}s`} repeatCount="indefinite" path={ORBIT} />
        </g>
      </g>
    </g>
  );
}

function OrbitHalf({ back }: { back: boolean }) {
  return (
    <g clipPath={`url(#${back ? "zo-back" : "zo-front"})`}>
      <g transform={`rotate(${TILT} ${CX} ${CY})`}>
        {/* Wide soft glow under a crisp line: a ring of light, not a wire. */}
        <path d={ORBIT} fill="none" stroke="url(#zo-orbit)" strokeWidth="14" opacity="0.18" />
        <path d={ORBIT} fill="none" stroke="url(#zo-orbit)" strokeWidth="2.6" opacity={back ? 0.75 : 1} />
        {NODES.map((deg) => {
          const n = nodeAt(deg);
          return (
            <g key={deg}>
              <circle cx={n.x} cy={n.y} r="26" fill="url(#zo-glow)" />
              <circle cx={n.x} cy={n.y} r="6.5" fill="#F3EEFF" />
            </g>
          );
        })}
      </g>
    </g>
  );
}

export function ZenoOrbit() {
  return (
    <TiltStage className="zo">
      <div className="zo-layer zo-layer-scene">
        <div className="zo-aura" aria-hidden="true" />
        <svg viewBox="0 0 1000 940" className="zo-svg" aria-hidden="true">
          <defs>
            <linearGradient id="zo-orbit" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#B06BFF" />
              <stop offset="0.5" stopColor="#8B6BFF" />
              <stop offset="1" stopColor="#4FA3FF" />
            </linearGradient>
            <radialGradient id="zo-glow">
              <stop offset="0" stopColor="#B8A4FF" stopOpacity="0.95" />
              <stop offset="0.3" stopColor="#8B6BFF" stopOpacity="0.45" />
              <stop offset="1" stopColor="#8B6BFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="zo-fade">
              <stop offset="0.8" stopColor="#fff" />
              <stop offset="0.93" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="zo-mask">
              <circle cx={CX} cy={CY} r="300" fill="url(#zo-fade)" />
            </mask>
            <clipPath id="zo-back">
              <rect x="0" y="0" width="1000" height={CY} />
            </clipPath>
            <clipPath id="zo-front">
              <rect x="0" y={CY} width="1000" height={940 - CY} />
            </clipPath>
            <linearGradient id="zo-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#C57BFF" />
              <stop offset="0.5" stopColor="#7B5CFF" />
              <stop offset="1" stopColor="#3FA0FF" />
            </linearGradient>
          </defs>

          <g transform={`rotate(10 ${CX} ${CY})`} opacity="0.45">
            <path d={ORBIT2} fill="none" stroke="#7C6BFF" strokeWidth="1.4" strokeDasharray="3 12" />
          </g>

          <OrbitHalf back />
          {COMETS.map((c, i) => (
            <Comet key={`b${i}`} c={c} back />
          ))}

          {/* Zeno, faded softly at the edge of his own ring. */}
          <image href="/assets/zeno-full.webp" x={CX - 300} y={CY - 290} width="600" height="600" mask="url(#zo-mask)" />
          <circle cx={CX} cy={CY - 6} r="236" fill="none" stroke="url(#zo-ring)" strokeWidth="3" />

          <OrbitHalf back={false} />
          {COMETS.map((c, i) => (
            <Comet key={`f${i}`} c={c} back={false} />
          ))}
        </svg>
        <div className="zo-ring-glow" aria-hidden="true" />
        <div className="zo-ring-spin" aria-hidden="true" />
      </div>

      <div className="zo-layer zo-layer-bubble" aria-hidden="true">
        <div className="zo-bubble">
          <span className="zo-bubble-who">
            <Sparkles size={14} /> Zeno
          </span>
          <span className="zo-bubble-text">
            Finds. Negotiates.{" "}
            <br />
            Gets you better deals.
          </span>
        </div>
      </div>

      <nav className="zo-layer zo-layer-tiles" aria-label="Browse by category">
        {TILES.map((t) => (
          <Link
            key={t.name}
            /* Straight to the category page. This used to go through
               /search?category=, which redirects here anyway. */
            href={`/browse/${categorySlug(t.name)}`}
            className="zo-tile"
            style={{
              ["--x" as string]: `${t.x}%`,
              ["--y" as string]: `${t.y}%`,
              ["--mx" as string]: `${t.mx}%`,
              ["--my" as string]: `${t.my}%`,
            }}
          >
            <span className="zo-tile-card" style={{ animationDelay: `${t.delay}s`, ["--tilt" as string]: `${t.tilt}deg` }}>
              <span className="zo-tile-emoji" aria-hidden="true">
                {categoryVisual(t.name).emoji}
              </span>
              <span className="zo-tile-label">{categoryVisual(t.name).name}</span>
            </span>
          </Link>
        ))}
      </nav>
    </TiltStage>
  );
}
