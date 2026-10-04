import Link from "next/link";
import { BadgeCheck, ChevronRight, Star, Store as StoreIcon } from "lucide-react";
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
  store,
}: {
  name: string | null;
  verified: boolean;
  rating: number | null;
  deals: number;
  store?: { name: string; slug: string } | null;
}) {
  const shown = name?.trim() || "BROKA seller";
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
      <h2 className="detail-h" id="desc-h">
        Description
      </h2>
      <div className="prose">
        {paragraphs.map((p, i) => (
          <p key={i} style={{ whiteSpace: "pre-line" }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
