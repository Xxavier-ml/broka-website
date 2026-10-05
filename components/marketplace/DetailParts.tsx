import Link from "next/link";
import { BadgeCheck, ChevronRight, Clock3, Star, Store as StoreIcon } from "lucide-react";
import { attributeText, humanizeKey, plural } from "@/lib/format";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`}>
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
            {i < items.length - 1 && <ChevronRight size={13} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Who is selling: the trust facts the API makes public, and never a phone number. */
export function SellerCard({
  name,
  verified,
  rating,
  deals,
  dcr,
  dcrProvisional,
  responseMinutes,
  dealTimeMinutes,
  timedDeals,
  store,
}: {
  name: string | null;
  verified: boolean;
  rating: number | null;
  deals: number;
  dcr?: number | null;
  dcrProvisional?: boolean;
  responseMinutes?: number | null;
  dealTimeMinutes?: number | null;
  timedDeals?: number;
  store?: { name: string; slug: string } | null;
}) {
  const shown = name?.trim() || "BROKA seller";
  const formatMinutes = (minutes: number | null | undefined) => {
    if (minutes == null || !Number.isFinite(minutes)) return "—";
    if (minutes < 60) return `${Math.round(minutes)}m`;
    if (minutes < 1440) return `${(minutes / 60).toFixed(1)}h`;
    return `${(minutes / 1440).toFixed(1)}d`;
  };
  const metricTone = (value: number | null | undefined, good: number, poor: number, lowerIsBetter = false) => {
    if (value == null) return "unknown";
    if (lowerIsBetter) return value <= good ? "good" : value >= poor ? "poor" : "fair";
    return value >= good ? "good" : value < poor ? "poor" : "fair";
  };
  return (
    <section className="seller" aria-labelledby="seller-h">
      <h2 className="detail-h" id="seller-h">
        Seller
      </h2>
      <div className="seller-row">
        <span className="seller-avatar" aria-hidden="true">
          {shown.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <p className="seller-name">
            {shown}
            {verified && <BadgeCheck size={16} className="scard-verified" aria-label="Verified seller" />}
          </p>
          <p className="seller-facts">
            {rating ? (
              <span>
                <Star size={13} aria-hidden="true" /> {rating.toFixed(1)}
              </span>
            ) : null}
            <span>{plural(deals, "completed deal")}</span>
          </p>
        </div>
      </div>
      <div className="seller-standing" aria-label="Seller standing">
        <div className={`seller-metric seller-metric-rating ${metricTone(rating, 8, 6)}`}>
          <span>RATING</span>
          <strong>{rating == null ? "—" : rating.toFixed(1)}{rating == null ? "" : <small>/10</small>}</strong>
          <em>{rating == null ? "Not rated yet" : "BROKA rating"}</em>
        </div>
        <div className={`seller-metric seller-metric-dcr ${metricTone(dcr, 90, 70)}`}>
          <span>COMPLETION</span>
          <strong>{dcr == null ? "—" : `${Math.round(dcr)}%`}</strong>
          <em>{dcr == null ? "No deals yet" : dcrProvisional ? "Early · few deals" : "of deals completed"}</em>
        </div>
        <div className={`seller-metric seller-metric-response ${metricTone(responseMinutes, 30, 180, true)}`}>
          <span>REPLIES IN</span>
          <strong>{formatMinutes(responseMinutes)}</strong>
          <em>{responseMinutes == null ? "Not measured yet" : "typical reply"}</em>
        </div>
        <div className={`seller-metric seller-metric-dealtime ${metricTone(dealTimeMinutes, 2880, 10080, true)}`}>
          <span><Clock3 size={11} aria-hidden="true" /> AVG DEAL TIME</span>
          <strong>{formatMinutes(dealTimeMinutes)}</strong>
          <em>{dealTimeMinutes == null ? "No completed deals" : `agreed to paid · ${timedDeals || 0} deal${timedDeals === 1 ? "" : "s"}`}</em>
        </div>
      </div>
      <p className="seller-standing-note">Measured by BROKA from the seller&apos;s deals and chats</p>
      {store && (
        <Link href={`/stores/${store.slug}`} className="seller-store">
          <StoreIcon size={15} aria-hidden="true" /> Visit {store.name}
        </Link>
      )}
    </section>
  );
}

/** The listing's category-specific details (brand, RAM, make, year...). */
export function AttributeTable({ attributes }: { attributes: Record<string, unknown> | null }) {
  const rows = Object.entries(attributes ?? {})
    .map(([k, v]) => [humanizeKey(k), attributeText(v)] as const)
    .filter((r): r is readonly [string, string] => r[1] !== null);
  if (!rows.length) return null;
  return (
    <section aria-labelledby="specs-h">
      <h2 className="detail-h" id="specs-h">
        Details
      </h2>
      <dl className="specs">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Facts({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="facts">
      {items.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Seller-written text, shown as paragraphs. It is plain text, never HTML. */
export function Description({ text }: { text: string | null }) {
  const paragraphs = (text ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (!paragraphs.length) return null;
  return (
    <section aria-labelledby="desc-h">
      <div className="detail-description-heading">
        <div>
          <span className="detail-section-label">PRODUCT CONTEXT</span>
          <h2 className="detail-h" id="desc-h">
            About this listing
          </h2>
        </div>
        <span className="detail-description-signal">SELLER NOTES</span>
      </div>
      <div className="prose prose-app">
        <span className="prose-app-mark" aria-hidden="true">“</span>
        <div className="prose-app-copy">
          {paragraphs.map((p, i) => (
            <p key={i} style={{ whiteSpace: "pre-line" }}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
