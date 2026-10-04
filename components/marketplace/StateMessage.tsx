import Link from "next/link";
import type { ReactNode } from "react";

/** Nothing to show: says why, and what to do next. */
export function EmptyState({
  emoji = "🔎",
  title,
  children,
  actionHref,
  actionLabel,
  actions,
}: {
  emoji?: string;
  title: string;
  children?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  /** Ways out of a dead end. An empty list page should still be navigable. */
  actions?: { label: string; href: string; primary?: boolean }[];
}) {
  const links = actions ?? (actionHref && actionLabel ? [{ label: actionLabel, href: actionHref }] : []);
  return (
    <div className="state" role="status">
      <span className="state-emoji" aria-hidden="true">
        {emoji}
      </span>
      <h2 className="state-title">{title}</h2>
      {children && <p className="state-body">{children}</p>}
      {links.length > 0 && (
        <div className="state-actions">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-sm ${link.primary ? "btn-primary" : "btn-ghost"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** The API did not answer. Distinct from "nothing here", and honest about it. */
export function ApiNotice({ retryHref }: { retryHref: string }) {
  return (
    <div className="state state-warn" role="alert">
      <span className="state-emoji" aria-hidden="true">
        📡
      </span>
      <h2 className="state-title">We can&apos;t reach the listings right now</h2>
      <p className="state-body">
        BROKA&apos;s servers didn&apos;t answer, so nothing is shown here. Nothing has been removed. Try again in a moment.
      </p>
      <Link href={retryHref} className="btn btn-ghost btn-sm" prefetch={false}>
        Try again
      </Link>
    </div>
  );
}
