const FALLBACK_TRENDS = ["Phones", "Cars", "Laptops", "Apartments", "Land", "Furniture"];

/**
 * Distinct phrases kept in memory. The endpoint is public, so without a cap
 * every new phrase anyone posts would grow the process's memory for good.
 * When it is full, the least searched (then the oldest) phrase makes way.
 */
const MAX_TRACKED_PHRASES = 500;

/**
 * Searches a phrase needs before "Popular on BROKA" shows it to every visitor.
 * One person's one-off search, which can be anything they typed, never is.
 */
const MIN_TRENDING_COUNT = 3;

const counts = new Map<string, { label: string; count: number; lastSeen: number }>();

function normalize(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9&'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

/** Email addresses and phone numbers are never counted: popular phrases are shown publicly. */
function looksLikeContactDetails(query: string) {
  return query.includes("@") || /\d{7,}/.test(query.replace(/[\s().+-]/g, ""));
}

function evictWeakestPhrase() {
  let weakestKey: string | undefined;
  let weakest: { count: number; lastSeen: number } | undefined;
  for (const [key, entry] of counts) {
    if (!weakest || entry.count < weakest.count || (entry.count === weakest.count && entry.lastSeen < weakest.lastSeen)) {
      weakestKey = key;
      weakest = entry;
    }
  }
  if (weakestKey !== undefined) counts.delete(weakestKey);
}

export function recordSearchQuery(query: string) {
  if (query.length > 200 || looksLikeContactDetails(query)) return;
  const normalized = normalize(query);
  if (normalized.length < 2 || normalized.split(" ").every((word) => word.length < 2)) return;
  const current = counts.get(normalized);
  if (!current && counts.size >= MAX_TRACKED_PHRASES) evictWeakestPhrase();
  counts.set(normalized, {
    label: query.trim().replace(/\s+/g, " ").slice(0, 80),
    count: (current?.count ?? 0) + 1,
    lastSeen: Date.now(),
  });
}

export function getTrendingSearches(limit = 6) {
  const ranked = [...counts.values()]
    .filter((entry) => entry.count >= MIN_TRENDING_COUNT)
    .sort((a, b) => b.count - a.count || b.lastSeen - a.lastSeen)
    .map((entry) => entry.label);
  return [...ranked, ...FALLBACK_TRENDS.filter((term) => !ranked.some((item) => item.toLowerCase() === term.toLowerCase()))].slice(0, limit);
}

export { FALLBACK_TRENDS };
