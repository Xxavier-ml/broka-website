/**
 * A dotted map of Kenya with a pulsing beacon on Nairobi and a few linked
 * towns: "Kenya's marketplace", as in the app artwork. The dots are laid out
 * on a grid clipped to a simplified outline, computed once at module load
 * (deterministic, so the server and the browser draw the same thing), and the
 * pulse is CSS. Decorative only; hidden from assistive technology.
 */

// Simplified border of Kenya as [longitude, latitude]. Recognisable, not survey-grade.
const OUTLINE: [number, number][] = [
  [33.93, 0.1], [34.1, 0.45], [34.45, 1.1], [35.0, 1.9], [34.55, 3.2], [34.0, 4.22], [34.9, 4.45],
  [35.95, 5.03], [36.85, 4.45], [38.0, 3.6], [39.05, 3.52], [40.0, 4.2], [41.0, 3.95], [41.9, 3.98],
  [40.99, 2.8], [40.99, -0.85], [41.56, -1.68], [40.9, -2.3], [40.12, -3.22], [39.66, -4.05],
  [39.22, -4.67], [38.6, -4.0], [37.68, -3.4], [37.6, -3.1], [36.8, -2.6], [36.1, -2.4], [35.1, -1.65],
  [34.0, -1.05],
];

const TOWNS = {
  nairobi: { lon: 36.82, lat: -1.29 },
  mombasa: { lon: 39.67, lat: -4.05 },
  kisumu: { lon: 34.77, lat: -0.09 },
  nakuru: { lon: 36.07, lat: -0.3 },
  eldoret: { lon: 35.27, lat: 0.51 },
  garissa: { lon: 39.64, lat: -0.45 },
};

const LON0 = 33.7;
const LAT0 = 5.2;
const SCALE = 46; // px per degree
const W = Math.round((42.1 - LON0) * SCALE);
const H = Math.round((LAT0 + 4.9) * SCALE);
const project = (lon: number, lat: number): [number, number] => [(lon - LON0) * SCALE, (LAT0 - lat) * SCALE];

function inside(lon: number, lat: number) {
  let c = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i]!;
    const [xj, yj] = OUTLINE[j]!;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const DOTS: { x: number; y: number; d: number }[] = [];
{
  const step = 0.2; // degrees between dots
  let n = 0;
  for (let lat = 5.1; lat > -4.8; lat -= step) {
    for (let lon = 33.8; lon < 42; lon += step) {
      if (!inside(lon, lat)) continue;
      const [x, y] = project(lon, lat);
      DOTS.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, d: (n++ % 17) * 0.37 });
    }
  }
}

const HUB = project(TOWNS.nairobi.lon, TOWNS.nairobi.lat);
const SPOKES = (["mombasa", "kisumu", "nakuru", "eldoret", "garissa"] as const).map((k) => ({
  key: k,
  p: project(TOWNS[k].lon, TOWNS[k].lat),
}));

export function KenyaBeacon() {
  return (
    <div className="kenya" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <g>
          {DOTS.map((d, i) => (
            <circle key={i} className="kenya-dot" cx={d.x} cy={d.y} r="1.55" style={{ animationDelay: `${d.d}s` }} />
          ))}
        </g>
        <g className="kenya-links">
          {SPOKES.map((s) => (
            <line key={s.key} x1={HUB[0]} y1={HUB[1]} x2={s.p[0]} y2={s.p[1]} />
          ))}
        </g>
        {SPOKES.map((s, i) => (
          <circle key={s.key} className="kenya-town" cx={s.p[0]} cy={s.p[1]} r="3.4" style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        <g transform={`translate(${HUB[0]} ${HUB[1]})`}>
          <circle className="kenya-ripple" r="8" />
          <circle className="kenya-ripple kenya-ripple-2" r="8" />
          <circle className="kenya-ripple kenya-ripple-3" r="8" />
          <circle className="kenya-hub-glow" r="14" />
          <circle className="kenya-hub" r="5" />
        </g>
      </svg>
    </div>
  );
}
