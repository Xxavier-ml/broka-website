import Link from "next/link";

/**
 * Glass category tiles that drift around the hero visual, like the tiles
 * orbiting Zeno in BROKA's app artwork. Each one is a real link into the
 * marketplace search for that category. Pure CSS motion (see .htile), so no
 * JavaScript ships for it.
 */
const TILES = [
  { name: "Automobiles", label: "Vehicles", emoji: "🚗", pos: { top: "9%", left: "44%" }, delay: "0s", tilt: "-4deg" },
  { name: "Property", label: "Property", emoji: "🏠", pos: { top: "20%", left: "6%" }, delay: "-1.6s", tilt: "5deg" },
  { name: "Electronics", label: "Electronics", emoji: "🎮", pos: { top: "22%", right: "3%" }, delay: "-3.1s", tilt: "-6deg" },
  { name: "Fashion", label: "Fashion", emoji: "👜", pos: { top: "58%", right: "4%" }, delay: "-4.4s", tilt: "6deg" },
  { name: "Agriculture", label: "Agriculture", emoji: "🌱", pos: { bottom: "15%", left: "12%" }, delay: "-2.3s", tilt: "-5deg" },
  { name: "Business & Industrial", label: "Businesses", emoji: "🏢", pos: { bottom: "7%", left: "48%" }, delay: "-5.2s", tilt: "4deg" },
] as const;

export function FloatingCategories() {
  return (
    <nav className="htiles" aria-label="Browse by category">
      {TILES.map((t) => (
        <Link
          key={t.name}
          href={`/search?category=${encodeURIComponent(t.name)}`}
          className="htile"
          style={{ ...t.pos, animationDelay: t.delay, ["--tilt" as string]: t.tilt }}
        >
          <span className="htile-emoji" aria-hidden="true">
            {t.emoji}
          </span>
          <span className="htile-label">{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
