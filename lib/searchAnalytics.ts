const FALLBACK_TRENDS = ["Phones", "Cars", "Laptops", "Apartments", "Land", "Furniture"];
const counts = new Map<string, { label: string; count: number; lastSeen: number }>();

function normalize(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9&'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

export function recordSearchQuery(query: string) {
  const normalized = normalize(query);
  if (normalized.length < 2 || normalized.split(" ").every((word) => word.length < 2)) return;
  const current = counts.get(normalized);
  counts.set(normalized, {
    label: query.trim().replace(/\s+/g, " ").slice(0, 80),
    count: (current?.count ?? 0) + 1,
    lastSeen: Date.now(),
  });
}

export function getTrendingSearches(limit = 6) {
  const ranked = [...counts.entries()]
    .sort(([, a], [, b]) => b.count - a.count || b.lastSeen - a.lastSeen)
    .map(([, value]) => value.label);
  return [...ranked, ...FALLBACK_TRENDS.filter((term) => !ranked.some((item) => item.toLowerCase() === term.toLowerCase()))].slice(0, limit);
}

export { FALLBACK_TRENDS };
