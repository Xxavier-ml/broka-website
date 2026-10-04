"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { useState, type CSSProperties } from "react";

export type CategoryRailItem = {
  key: string;
  href: string;
  label: string;
  emoji?: string;
  count?: number;
  active: boolean;
};

export function CategoryRail({
  items,
  ariaLabel = "Categories",
  className = "",
}: {
  items: CategoryRailItem[];
  ariaLabel?: string;
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const duration = `${Math.max(56, Math.min(168, items.length * 7))}s`;
  const style = { "--category-ticker-duration": duration } as CSSProperties;

  const renderItems = (copy = false) => items.map((item) => (
    <Link
      key={`${copy ? "copy-" : ""}${item.key}`}
      href={item.href}
      className={`chip${item.active ? " active" : ""}`}
      aria-current={!copy && item.active ? "page" : undefined}
      tabIndex={copy ? -1 : undefined}
      scroll={false}
    >
      {item.emoji && <span aria-hidden="true">{item.emoji}</span>}
      {item.label}
      {item.count != null && <span className="chip-count">{item.count.toLocaleString("en-KE")}</span>}
    </Link>
  ));

  return (
    <div className={`category-ticker${className ? ` ${className}` : ""}${paused ? " is-paused" : ""}`} style={style}>
      <div
        className="category-ticker-viewport"
        role="region"
        aria-label={`${ariaLabel}; scroll horizontally to explore`}
        tabIndex={0}
        onPointerDown={() => setPaused(true)}
      >
        <div className="category-ticker-track">
          <nav className="category-ticker-group" aria-label={ariaLabel}>
            {renderItems()}
          </nav>
          <div className="category-ticker-group category-ticker-group-copy" aria-hidden="true">
            {renderItems(true)}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="category-ticker-toggle"
        aria-label={paused ? "Resume category movement" : "Pause category movement"}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        <span className="sr-only">{paused ? "Resume category movement" : "Pause category movement"}</span>
      </button>
    </div>
  );
}
