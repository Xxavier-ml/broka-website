// Display formatting shared by the listing pages. Safe on server and client.

const kes = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

/** "KES 18,000" */
export function formatKes(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "—";
  return `KES ${kes.format(Math.round(amount))}`;
}

/**
 * "KES 3,500 / bag" when the price is for one unit (a listing's price_unit).
 * A per-bag price shown bare reads as the price of the whole lot.
 */
export function formatUnitPrice(price: number, unit: string | null | undefined): string {
  return unit ? `${formatKes(price)} / ${unit}` : formatKes(price);
}

/**
 * "Starehe, Nairobi" from whichever parts exist. A part already named inside
 * an earlier one is dropped: a listing's free-text location "Westlands,
 * Nairobi" plus its county "Nairobi" reads "Westlands, Nairobi", not twice.
 */
export function placeLine(...parts: Array<string | null | undefined>): string | null {
  const kept: string[] = [];
  const words = (text: string) => text.toLowerCase().split(",").map((w) => w.trim());
  for (const p of parts) {
    const v = p?.trim();
    if (!v) continue;
    const covered = kept.some((k) => words(k).includes(v.toLowerCase()));
    if (!covered) kept.push(v);
  }
  return kept.length ? kept.join(", ") : null;
}

/**
 * Timestamps from the API are naive UTC ("2026-09-29T12:00:00", no zone), and
 * JavaScript reads a zone-less ISO string as *local* time. Treat them as UTC.
 */
export function parseUtc(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(iso);
  const d = new Date(hasZone ? iso : `${iso}Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

const monthYear = new Intl.DateTimeFormat("en-KE", { month: "long", year: "numeric", timeZone: "UTC" });

/** "January 2025" */
export function monthYearOf(iso: string | null | undefined): string | null {
  const d = parseUtc(iso);
  return d ? monthYear.format(d) : null;
}

export function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Shortened text for meta descriptions: whole words, at most `max` characters. */
export function clip(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** "New", "Used", "Refurbished" */
export function conditionLabel(condition: string | null | undefined): string | null {
  const c = condition?.trim().toLowerCase();
  return c ? c[0]!.toUpperCase() + c.slice(1) : null;
}

/** Turns an attribute key like "screen_size" into "Screen size". */
export function humanizeKey(key: string): string {
  const spaced = key.replace(/[_-]+/g, " ").trim();
  return spaced ? spaced[0]!.toUpperCase() + spaced.slice(1) : key;
}

/** A scalar attribute value as text, or null for anything that should not be shown. */
export function attributeText(value: unknown): string | null {
  if (typeof value === "string") return value.trim() || null;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    const items = value.filter((v) => typeof v === "string" || typeof v === "number");
    return items.length ? items.join(", ") : null;
  }
  return null;
}
