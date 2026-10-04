/**
 * A glowing dotted map of Kenya with a pulsing beacon on Nairobi and links
 * out to other towns: "Kenya's marketplace", as in the mockup. The dots are a
 * grid clipped to a simplified border, computed once at module load
 * (deterministic, so server and browser draw the same thing). They twinkle in
 * four groups rather than one by one, which keeps the animation cheap.
 * Decorative only.
 */

// Simplified border of Kenya as [longitude, latitude]. Recognisable, not survey-grade.
const OUTLINE: [number, number][] = [
  [33.93, 0.1], [34.1, 0.45], [34.45, 1.1], [35.0, 1.9], [34.55, 3.2], [34.0, 4.22], [34.9, 4.45],
  [35.95, 5.03], [36.85, 4.45], [38.0, 3.6], [39.05, 3.52], [40.0, 4.2], [41.0, 3.95], [41.9, 3.98],
  [40.99, 2.8], [40.99, -0.85], [41.56, -1.68], [40.9, -2.3], [40.12, -3.22], [39.66, -4.05],
  [39.22, -4.67], [38.6, -4.0], [37.68, -3.4], [37.6, -3.1], [36.8, -2.6], [36.1, -2.4], [35.1, -1.65],
  [34.0, -1.05],
];

const TOWNS: Record<string, [number, number]> = {
  nairobi: [36.82, -1.29],
  mombasa: [39.67, -4.05],
  kisumu: [34.77, -0.09],
  nakuru: [36.07, -0.3],
  eldoret: [35.27, 0.51],
  garissa: [39.64, -0.45],
  lodwar: [35.6, 3.12],
  marsabit: [37.99, 2.33],
};

const LON0 = 33.7;
const LAT0 = 5.2;
const S = 46; // px per degree
const W = Math.round((42.1 - LON0) * S);
const H = Math.round((LAT0 + 4.9) * S);
const at = (lon: number, lat: number): [number, number] => [
  Math.round((lon - LON0) * S * 10) / 10,
  Math.round((LAT0 - lat) * S * 10) / 10,
];

function inside(lon: number, lat: number) {
  let c = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i]!;
    const [xj, yj] = OUTLINE[j]!;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const GROUPS: [number, number][][] = [[], [], [], []];
{
  let n = 0;
  for (let lat = 5.1; lat > -4.8; lat -= 0.19) {
    for (let lon = 33.8; lon < 42; lon += 0.19) {
      if (inside(lon, lat)) GROUPS[(n++ * 7) % 4]!.push(at(lon, lat));
    }
  }
}
const OUTLINE_PATH = `M ${OUTLINE.map(([lon, lat]) => at(lon, lat).join(" ")).join(" L ")} Z`;
const HUB = at(...TOWNS.nairobi!);
const SPOKES = Object.entries(TOWNS)
  .filter(([k]) => k !== "nairobi")
  .map(([k, [lon, lat]]) => ({ k, p: at(lon, lat) }));

const VIEW = `0 0 ${W} ${H}`;
const hubLeft = `${(HUB[0] / W) * 100}%`;
const hubTop = `${(HUB[1] / H) * 100}%`;

function Dots({ groups, className }: { groups: [number, number][][]; className: string }) {
  return (
    <svg viewBox={VIEW} className={`kmap-layer kmap-dots ${className}`} preserveAspectRatio="xMidYMid meet">
      {groups.flat().map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" />
      ))}
    </svg>
  );
}

export function KenyaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`kmap ${className}`.trim()} aria-hidden="true">
      <svg viewBox={VIEW} className="kmap-layer" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="km-hub">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.25" stopColor="#8FE8FF" />
            <stop offset="1" stopColor="#4F7DFF" stopOpacity="0" />
          </radialGradient>
          <filter id="km-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {/* Outline: a blurred copy for the glow under a crisp line. Static, so the blur is drawn once. */}
        <path d={OUTLINE_PATH} fill="rgba(60, 90, 255, 0.10)" stroke="#5A7DFF" strokeWidth="4" filter="url(#km-blur)" opacity="0.8" />
        <path d={OUTLINE_PATH} fill="none" stroke="#7C9BFF" strokeWidth="1.3" opacity="0.75" />
      </svg>
      <Dots groups={[GROUPS[0]!, GROUPS[1]!]} className="kmap-dots-a" />
      <Dots groups={[GROUPS[2]!, GROUPS[3]!]} className="kmap-dots-b" />
      <svg viewBox={VIEW} className="kmap-layer" preserveAspectRatio="xMidYMid meet">
        <g className="kmap-links">
          {SPOKES.map((s) => (
            <line key={s.k} x1={HUB[0]} y1={HUB[1]} x2={s.p[0]} y2={s.p[1]} />
          ))}
        </g>
        {SPOKES.map((s) => (
          <g key={s.k}>
            <circle cx={s.p[0]} cy={s.p[1]} r="11" fill="url(#km-hub)" opacity="0.6" />
            <circle cx={s.p[0]} cy={s.p[1]} r="3.4" fill="#C9F4FF" />
          </g>
        ))}
        <g transform={`translate(${HUB[0]} ${HUB[1]})`}>
          <circle r="34" fill="url(#km-hub)" opacity="0.8" />
          <circle r="13" fill="none" stroke="#9FEFFF" strokeWidth="2" />
          <circle r="6" fill="#fff" />
        </g>
      </svg>
      {/* Nairobi's beacon: HTML rings, animated by the GPU. */}
      <span className="kmap-ripple" style={{ left: hubLeft, top: hubTop }} />
      <span className="kmap-ripple kmap-ripple-2" style={{ left: hubLeft, top: hubTop }} />
      <span className="kmap-ripple kmap-ripple-3" style={{ left: hubLeft, top: hubTop }} />
    </div>
  );
}
