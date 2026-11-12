import { qrMatrix } from "@/lib/qrcode";

/**
 * A QR Code drawn as SVG on the server. Dark modules on a light tile, because
 * not every phone camera reads inverted codes. The three finder patterns are
 * drawn as rounded squares; every other module stays square so the code
 * scans from across a desk.
 */
export function QrCode({ value, title, className = "" }: { value: string; title: string; className?: string }) {
  const modules = qrMatrix(value, "M");
  const size = modules.length;
  const quiet = 3;
  const view = size + quiet * 2;
  const inFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);

  // Runs of dark modules in each row become one rectangle each.
  let path = "";
  modules.forEach((row, y) => {
    let x = 0;
    while (x < size) {
      if (!row[x] || inFinder(x, y)) {
        x++;
        continue;
      }
      const start = x;
      while (x < size && row[x] && !inFinder(x, y)) x++;
      path += `M${start + quiet} ${y + quiet}h${x - start}v1h${start - x}z`;
    }
  });

  const finders = [
    [quiet, quiet],
    [quiet + size - 7, quiet],
    [quiet, quiet + size - 7],
  ];

  return (
    <svg
      viewBox={`0 0 ${view} ${view}`}
      className={`qr ${className}`.trim()}
      role="img"
      aria-label={title}
      shapeRendering="crispEdges"
    >
      <rect width={view} height={view} rx="3" fill="#f6f4ff" />
      <path d={path} fill="#100d28" />
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`} shapeRendering="geometricPrecision">
          <path
            d={`M${x! + 1.6} ${y}h3.8a1.6 1.6 0 0 1 1.6 1.6v3.8a1.6 1.6 0 0 1 -1.6 1.6h-3.8a1.6 1.6 0 0 1 -1.6 -1.6v-3.8a1.6 1.6 0 0 1 1.6 -1.6zM${x! + 1.9} ${y! + 1}a0.9 0.9 0 0 0 -0.9 0.9v3.2a0.9 0.9 0 0 0 0.9 0.9h3.2a0.9 0.9 0 0 0 0.9 -0.9v-3.2a0.9 0.9 0 0 0 -0.9 -0.9z`}
            fill="#100d28"
            fillRule="evenodd"
          />
          <rect x={x! + 2} y={y! + 2} width="3" height="3" rx="0.8" fill="#5b3fe0" />
        </g>
      ))}
    </svg>
  );
}
