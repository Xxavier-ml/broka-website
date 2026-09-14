/**
 * Beaded flow lines — the woven particle mesh from the bottom of the BROKA
 * app splash. Pure SVG + CSS (server component, no JS shipped): the "beads"
 * are a dashed stroke with round linecaps, and the drift is a slow CSS
 * transform on each layer.
 */

const CURVES = [
  { d: "M0,120 C 180,40 360,180 540,100 S 900,30 1200,110", delay: "0s", opacity: 0.55 },
  { d: "M0,150 C 200,80 380,200 560,130 S 920,70 1200,140", delay: "-7s", opacity: 0.4 },
  { d: "M0,90 C 220,170 400,50 580,140 S 940,160 1200,80", delay: "-14s", opacity: 0.3 },
  { d: "M0,180 C 160,120 340,220 520,170 S 880,120 1200,190", delay: "-21s", opacity: 0.25 },
];

export function FlowMesh({ flip = false }: { flip?: boolean }) {
  return (
    <div className="flowmesh" aria-hidden="true" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <svg viewBox="0 0 1200 240" preserveAspectRatio="none" width="100%" height="100%">
        {CURVES.map((c, i) => (
          <path
            key={i}
            className="flowmesh-line"
            d={c.d}
            fill="none"
            stroke={i % 2 === 0 ? "var(--c-c)" : "var(--c-v-light)"}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="0.5 6"
            opacity={c.opacity}
            style={{ animationDelay: c.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
