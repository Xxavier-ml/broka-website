import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav className="pager" aria-label="Pages">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className="btn btn-ghost btn-sm" rel="prev">
          <ChevronLeft size={14} aria-hidden="true" /> Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="pager-count" aria-current="page">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} className="btn btn-ghost btn-sm" rel="next">
          Next <ChevronRight size={14} aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
