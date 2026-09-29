import { Search } from "lucide-react";

/**
 * A plain GET form, so search works before any JavaScript loads and the
 * result is an ordinary, shareable URL.
 */
export function SearchForm({
  action,
  value,
  placeholder,
  hidden = {},
  label = "Search",
  className = "",
}: {
  action: string;
  value?: string;
  placeholder: string;
  /** Other query values to keep when searching (the chosen category, say). */
  hidden?: Record<string, string | undefined>;
  label?: string;
  className?: string;
}) {
  return (
    <form action={action} method="get" role="search" className={`sform ${className}`.trim()}>
      <label className="sr-only" htmlFor={`sf-${action}`}>
        {label}
      </label>
      <Search size={18} aria-hidden="true" className="sform-icon" />
      <input
        id={`sf-${action}`}
        name="q"
        type="search"
        defaultValue={value}
        placeholder={placeholder}
        maxLength={100}
        autoComplete="off"
        className="sform-input"
      />
      {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <button type="submit" className="sform-btn">
        Search
      </button>
    </form>
  );
}
