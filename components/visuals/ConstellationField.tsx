import { cn } from "@/lib/utils";

/**
 * Interconnected node field — the signature motif from the BROKA app splash.
 *
 * Matches the splash's actual structure rather than a uniform scatter: nodes
 * form dense constellations around a handful of cluster centres, with a few
 * bright "hub" nodes carrying a bloom filter, plus sparse drifting singles.
 *
 * Deliberately a server component with no hooks — positions come from a seeded
 * PRNG evaluated at module scope, so server and client emit identical SVG (no
 * hydration mismatch) and no JavaScript ships for it. Twinkle is pure CSS.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VIEW = 1000;
const LINK_DISTANCE = 190;

type Hue = "violet" | "cyan" | "blue" | "soft";
type Node = { x: number; y: number; r: number; hue: Hue; delay: number; hub: boolean };

const HUE_COLOR: Record<Hue, string> = {
  violet: "#8B6BFF",
  cyan: "#3FD8F5",
  blue: "#4D7BFF",
  soft: "#C4BAFF",
};

/** Cluster centres, roughly echoing the splash's constellation placement. */
const CLUSTERS = [
  { cx: 120, cy: 150, n: 13, spread: 150 },
  { cx: 90, cy: 520, n: 11, spread: 140 },
  { cx: 820, cy: 230, n: 9, spread: 160 },
  { cx: 700, cy: 720, n: 10, spread: 170 },
  { cx: 420, cy: 380, n: 8, spread: 200 },
  { cx: 930, cy: 620, n: 7, spread: 130 },
];

const HUES: Hue[] = ["violet", "cyan", "blue", "soft"];

function buildField() {
  const rand = mulberry32(20260914);
  const nodes: Node[] = [];

  const round = (v: number) => Math.round(v * 100) / 100;
  const clamp = (v: number) => Math.max(6, Math.min(VIEW - 6, v));

  for (const c of CLUSTERS) {
    for (let i = 0; i < c.n; i++) {
      // Two samples averaged gives a soft centre-weighted spread, so clusters
      // look dense in the middle and thin at the edges.
      const ox = ((rand() + rand()) / 2 - 0.5) * 2 * c.spread;
      const oy = ((rand() + rand()) / 2 - 0.5) * 2 * c.spread;
      const hub = rand() > 0.82;
      nodes.push({
        x: round(clamp(c.cx + ox)),
        y: round(clamp(c.cy + oy)),
        r: round(hub ? 5 + rand() * 3.5 : 2 + rand() * 2.6),
        hue: HUES[Math.floor(rand() * HUES.length)],
        delay: Math.round(rand() * 7000) / 1000,
        hub,
      });
    }
  }

  // Sparse singles in the open space between clusters.
  for (let i = 0; i < 16; i++) {
    const hub = rand() > 0.88;
    nodes.push({
      x: round(rand() * VIEW),
      y: round(rand() * VIEW),
      r: round(hub ? 4.5 + rand() * 2.5 : 1.5 + rand() * 1.8),
      hue: HUES[Math.floor(rand() * HUES.length)],
      delay: Math.round(rand() * 7000) / 1000,
      hub,
    });
  }

  const links: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK_DISTANCE) {
        links.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          o: Math.round((1 - d / LINK_DISTANCE) * 0.45 * 1000) / 1000,
        });
      }
    }
  }

  return { nodes, links };
}

const FIELD = buildField();

export function ConstellationField({
  className,
  opacity = 0.75,
  id = "cf",
}: {
  className?: string;
  opacity?: number;
  /** Unique per instance — SVG filter ids must not collide across the page. */
  id?: string;
}) {
  const glowId = `${id}-glow`;

  return (
    <div className={cn("constellation", className)} aria-hidden="true" style={{ opacity }}>
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <filter id={glowId} x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {FIELD.links.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#8B6BFF"
              strokeWidth="1"
              opacity={l.o}
            />
          ))}
        </g>

        <g>
          {FIELD.nodes.map((n, i) => (
            <circle
              key={i}
              className="constellation-node"
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={HUE_COLOR[n.hue]}
              filter={n.hub ? `url(#${glowId})` : undefined}
              style={{ animationDelay: `${n.delay}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
