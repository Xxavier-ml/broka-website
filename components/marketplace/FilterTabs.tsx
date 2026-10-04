import Link from "next/link";

export interface FilterTab {
  key: string;
  label: string;
  href: string;
}

/** A row of links that behaves like tabs: the current one is marked, all work without JavaScript. */
export function FilterTabs({ tabs, active, label }: { tabs: FilterTab[]; active: string; label: string }) {
  return (
    <nav className="ftabs" aria-label={label}>
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`ftab${t.key === active ? " active" : ""}`}
          aria-current={t.key === active ? "page" : undefined}
          scroll={false}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
