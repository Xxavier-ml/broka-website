"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { ArrowRight, Clock3, MapPin, Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatUnitPrice } from "@/lib/format";
import { MobileFilterDrawer, type MobileFilterDrawerProps } from "./MobileFilterDrawer";

interface Suggestion {
  id: string;
  name: string;
  category?: string | null;
  location?: string | null;
  price?: number | null;
  priceUnit?: string | null;
}

/** One row of the menu that Up/Down can highlight and Enter can pick. */
interface MenuOption {
  key: string;
  select: () => void;
}

const RECENT_SEARCHES_KEY = "broka:recent-searches";
const MAX_RECENT_SEARCHES = 6;
const DEFAULT_TRENDING_SEARCHES = ["Phones", "Cars", "Laptops", "Apartments", "Land", "Furniture"];
const SUGGESTION_DEBOUNCE_MS = 220;

function readRecentSearches() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === "string").slice(0, MAX_RECENT_SEARCHES) : [];
  } catch {
    return [];
  }
}

/** A progressive GET search form with BROKA API autocomplete, local history, and popular searches. */
export function SearchForm({
  action,
  value,
  placeholder,
  hidden = {},
  label = "Search",
  className = "",
  iconSubmit = false,
  showSuggestionsOnEmptyFocus = true,
  filters,
  filterRowClassName = "",
}: {
  action: string;
  value?: string;
  placeholder: string;
  hidden?: Record<string, string | undefined>;
  label?: string;
  className?: string;
  iconSubmit?: boolean;
  /** Whether to show recent/trending suggestions before the visitor types. */
  showSuggestionsOnEmptyFocus?: boolean;
  filters?: Omit<MobileFilterDrawerProps, "q" | "iconOnly">;
  filterRowClassName?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const shellRef = useRef<HTMLDivElement>(null);
  // Suggestions are fetched only for text the visitor typed. A query that
  // came with the page, or one just picked from the menu, used to fetch them
  // too and force the menu open over the results.
  const [typed, setTyped] = useState(false);
  // Popular searches change slowly; one request per page view is enough.
  const trendingLoadedRef = useRef(false);
  const [query, setQuery] = useState(value ?? "");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>(DEFAULT_TRENDING_SEARCHES);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  // The text the current `suggestions` answer. While it differs from what is
  // in the box, a newer request is on its way and the rows shown are stale.
  const [suggestionsFor, setSuggestionsFor] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  // Results pages render on the server, so a search can take a moment to
  // arrive. The pending state shows that the search was taken.
  const [navigating, startNavigation] = useTransition();
  const shellClass = `sform-shell${className.includes("sform-lg") ? " sform-shell-lg" : ""}${navigating ? " sform-pending" : ""}`;
  const trimmedQuery = query.trim();
  const focusMenuOpen = showSuggestionsOnEmptyFocus && open && trimmedQuery.length === 0;
  // Once two characters are typed the menu stays open with a "Search for"
  // row, so it no longer flickers shut between keystrokes or vanishes when
  // nothing matches.
  const suggestionsOpen = open && typed && trimmedQuery.length >= 2;
  const menuOpen = focusMenuOpen || suggestionsOpen;
  const suggestionsLoading = suggestionsOpen && suggestionsFor !== trimmedQuery;
  const suggestionsId = `${inputId}-suggestions`;
  // A term can be both recent and popular; list it once.
  const recentKeys = new Set(recentSearches.map((term) => term.toLowerCase()));
  const popularSearches = trendingSearches.filter((term) => !recentKeys.has(term.toLowerCase()));

  const buildHref = (term: string) => {
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    Object.entries(hidden).forEach(([key, item]) => { if (item) params.set(key, item); });
    const search = params.toString();
    return search ? `${action}?${search}` : action;
  };

  const recordSearch = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    // Start from what is stored, not from state: the state is only loaded when
    // the empty-box menu opens, so searching before that (on the homepage, or
    // after editing a query that came with the page) overwrote the history.
    const next = [cleaned, ...readRecentSearches().filter((item) => item.toLowerCase() !== cleaned.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(next);
    try { window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next)); } catch { /* storage can be unavailable in private browsing */ }
    void fetch("/api/search-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: cleaned }),
      keepalive: true,
    }).catch(() => undefined);
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const go = (href: string) => {
    closeMenu();
    startNavigation(() => router.push(href));
  };

  const searchFor = (term: string) => {
    const cleaned = term.trim();
    recordSearch(cleaned);
    setTyped(false);
    setQuery(cleaned);
    go(buildHref(cleaned));
  };

  /** A product row opens that product, not a text search for its name. */
  const openListing = (suggestion: Suggestion) => {
    recordSearch(trimmedQuery);
    setTyped(false);
    go(`/listings/${encodeURIComponent(suggestion.id)}`);
  };

  const options: MenuOption[] = suggestionsOpen
    ? [
        { key: "search", select: () => searchFor(trimmedQuery) },
        ...suggestions.map((suggestion) => ({ key: `listing-${suggestion.id}`, select: () => openListing(suggestion) })),
      ]
    : focusMenuOpen
      ? [...recentSearches, ...popularSearches].map((term) => ({ key: `term-${term}`, select: () => searchFor(term) }))
      : [];
  const optionId = (index: number) => `${inputId}-option-${index}`;
  const activeOption = menuOpen ? options[activeIndex] : undefined;

  useEffect(() => {
    setTyped(false);
    setQuery(value ?? "");
  }, [value]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (shellRef.current?.contains(event.target as Node)) return;
      setOpen(false);
      setActiveIndex(-1);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // A highlight belongs to the list it was made in. When the list changes
  // (new suggestions, the other menu, popular searches arriving), Enter must
  // not pick whatever now sits at the old position.
  const optionKeys = options.map((option) => option.key).join("|");
  useEffect(() => {
    setActiveIndex(-1);
  }, [optionKeys]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2 || !typed) {
      setSuggestions([]);
      setSuggestionsFor("");
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal, headers: { Accept: "application/json" } });
        const data = response.ok ? ((await response.json()) as { items?: Suggestion[] }) : { items: [] };
        if (controller.signal.aborted) return;
        // The same listing can come back twice; React keys need it once.
        const seen = new Set<string>();
        setSuggestions((data.items ?? []).filter((item) => !seen.has(item.id) && seen.add(item.id)));
        setSuggestionsFor(trimmed);
      } catch {
        if (controller.signal.aborted) return;
        setSuggestions([]);
        setSuggestionsFor(trimmed);
      }
    }, SUGGESTION_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, typed]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Without JavaScript the form still submits as a plain GET. With it, the
    // search stays a client navigation: no full reload, and the page
    // transition plays.
    event.preventDefault();
    if (activeOption) activeOption.select();
    else searchFor(query);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && !menuOpen) {
      // A closed menu (after Escape, say) opens again on Down, as a combobox should.
      event.preventDefault();
      openFocusMenu();
    } else if (event.key === "ArrowDown" && options.length) {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % options.length);
    } else if (event.key === "ArrowUp" && options.length) {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? options.length - 1 : current - 1));
    } else if (event.key === "Escape") {
      event.preventDefault();
      if (menuOpen) {
        // With the menu open, Escape only closes it.
        closeMenu();
      } else if (query) {
        // With it closed, Escape clears the box (as the browser would) but
        // does not pop the empty-box menu open again.
        setTyped(false);
        setQuery("");
      }
    } else if (event.key === "Tab") {
      closeMenu();
    }
  };

  /** The empty-box menu: this device's recent searches, then what is popular. */
  const openEmptyMenu = () => {
    if (!showSuggestionsOnEmptyFocus) {
      closeMenu();
      return;
    }
    setRecentSearches(readRecentSearches());
    setOpen(true);
    if (trendingLoadedRef.current) return;
    trendingLoadedRef.current = true;
    void fetch("/api/search-trending", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() as Promise<{ items?: string[] }> : null)
      .then((data) => { if (data?.items?.length) setTrendingSearches(data.items); })
      .catch(() => { trendingLoadedRef.current = false; });
  };

  const openFocusMenu = () => {
    if (!query.trim()) openEmptyMenu();
    else if (typed && query.trim().length >= 2) setOpen(true);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    try { window.localStorage.removeItem(RECENT_SEARCHES_KEY); } catch { /* storage can be unavailable */ }
  };

  /** Shared props for every pickable row. Rows are not in the Tab order: focus stays in the box. */
  const optionProps = (index: number, extraClass: string) => ({
    type: "button" as const,
    id: optionId(index),
    role: "option",
    tabIndex: -1,
    "aria-selected": index === activeIndex,
    className: `${extraClass}${index === activeIndex ? " active" : ""}`,
    onMouseDown: (event: React.MouseEvent) => event.preventDefault(),
    onClick: () => options[index]?.select(),
    onMouseEnter: () => setActiveIndex(index),
  });

  const searchField = (
    <div
      ref={shellRef}
      className={shellClass}
      onBlur={(event) => {
        // Focus leaving the search area closes the menu (pointer clicks are
        // handled by the document listener above).
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeMenu();
      }}
    >
      <form action={action} method="get" role="search" className={`sform ${className}`.trim()} onSubmit={onSubmit} aria-busy={navigating || undefined}>
        <label className="sr-only" htmlFor={inputId}>{label}</label>
        {filters ? (
          <button type="submit" className="sform-search-submit" aria-label={label}>
            <Search size={19} aria-hidden="true" />
          </button>
        ) : (
          <Search size={18} aria-hidden="true" className="sform-icon" />
        )}
        <input
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(event) => {
            const next = event.target.value;
            setTyped(true);
            setQuery(next);
            // Emptying the box shows the recent and popular searches again.
            if (!next.trim()) openEmptyMenu();
            else setOpen(next.trim().length >= 2);
          }}
          onFocus={openFocusMenu}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          maxLength={100}
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls={suggestionsId}
          aria-expanded={menuOpen}
          aria-activedescendant={activeOption ? optionId(activeIndex) : undefined}
          className="sform-input"
        />
        {Object.entries(hidden).map(([key, item]) => (item ? <input key={key} type="hidden" name={key} value={item} /> : null))}
        {!filters && (iconSubmit ? (
          <button type="submit" className="sform-btn sform-btn-icon" aria-label="Search"><ArrowRight size={18} aria-hidden="true" /></button>
        ) : (
          <button type="submit" className="sform-btn">Search</button>
        ))}
      </form>
      <div className="sform-suggestions" hidden={!menuOpen}>
        {focusMenuOpen && recentSearches.length > 0 && (
          <div className="sform-menu-heading">
            <p className="sform-suggestions-label"><Clock3 size={13} aria-hidden="true" /> Recent searches</p>
            <button type="button" className="sform-menu-clear" onMouseDown={(event) => event.preventDefault()} onClick={clearRecent}>Clear</button>
          </div>
        )}
        <div
          id={suggestionsId}
          className="sform-suggestions-list"
          role="listbox"
          aria-label={focusMenuOpen ? "Recent and popular searches" : "Search suggestions"}
          aria-busy={suggestionsLoading || undefined}
        >
          {menuOpen && (suggestionsOpen ? (
            <>
              <button {...optionProps(0, "sform-suggestion sform-suggestion-query")}>
                <span className="sform-suggestion-icon" aria-hidden="true"><Search size={15} /></span>
                <span className="sform-suggestion-copy"><strong>Search for “{trimmedQuery}”</strong><small>All matching listings</small></span>
                <ArrowRight size={15} aria-hidden="true" className="sform-suggestion-go" />
              </button>
              {suggestions.length > 0 && <div className="sform-suggestions-label" role="presentation">Matching products</div>}
              {suggestions.map((suggestion, index) => (
                <button key={suggestion.id} {...optionProps(index + 1, `sform-suggestion${suggestionsLoading ? " stale" : ""}`)}>
                  <span className="sform-suggestion-icon" aria-hidden="true"><Search size={15} /></span>
                  <span className="sform-suggestion-copy"><strong>{suggestion.name}</strong><small>{suggestion.category ?? "Marketplace listing"}{suggestion.location ? <><span aria-hidden="true"> · </span><MapPin size={11} aria-hidden="true" /> {suggestion.location}</> : null}</small></span>
                  {suggestion.price != null && <span className="sform-suggestion-price">{formatUnitPrice(suggestion.price, suggestion.priceUnit)}</span>}
                </button>
              ))}
              <div className="sform-suggestions-hint" role="presentation" aria-live="polite">
                {suggestionsLoading
                  ? "Looking for matching products…"
                  : suggestions.length === 0
                    ? "No product names match yet. Press Enter to search all listings."
                    : "Use ↑ ↓ to navigate · Enter to open"}
              </div>
            </>
          ) : (
            <>
              {recentSearches.length > 0 && (
                <div className="sform-menu-section" role="group" aria-label="Recent searches">
                  {recentSearches.map((term, index) => <button key={term} {...optionProps(index, "sform-search-chip")}><Clock3 size={14} aria-hidden="true" /> <span>{term}</span></button>)}
                </div>
              )}
              {popularSearches.length > 0 && (
                <div className="sform-menu-section" role="group" aria-label="Popular on BROKA">
                  <div className="sform-suggestions-label" role="presentation"><TrendingUp size={13} aria-hidden="true" /> Popular on BROKA</div>
                  <div className="sform-trending-grid">
                    {popularSearches.map((term, index) => <button key={term} {...optionProps(recentSearches.length + index, "sform-search-chip")}><Search size={14} aria-hidden="true" /> <span>{term}</span></button>)}
                  </div>
                </div>
              )}
              {recentSearches.length === 0 && <div className="sform-suggestions-hint" role="presentation">Your recent searches will appear here on this device.</div>}
            </>
          ))}
        </div>
      </div>
    </div>
  );

  if (!filters) return searchField;

  return (
    <div className={`search-control-row ${filterRowClassName}`.trim()}>
      {searchField}
      <MobileFilterDrawer {...filters} q={trimmedQuery || undefined} iconOnly />
    </div>
  );
}
