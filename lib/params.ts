/** The first value of a query parameter (Next gives an array when it repeats), trimmed and capped. */
export function firstParam(v: string | string[] | undefined, max = 100): string | undefined {
  const s = (Array.isArray(v) ? v[0] : v)?.trim();
  return s ? s.slice(0, max) : undefined;
}

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** "/path?a=1&b=2" from the values that are set. */
export function withQuery(path: string, query: Record<string, string | number | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== "") p.set(k, String(v));
  const qs = p.toString();
  return qs ? `${path}?${qs}` : path;
}
