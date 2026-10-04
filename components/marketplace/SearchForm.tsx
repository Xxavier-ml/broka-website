"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Clock3, MapPin, Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { MobileFilterDrawer, type MobileFilterDrawerProps } from "./MobileFilterDrawer";

interface Suggestion {
  id: string;
  name: string;
  category?: string | null;
  location?: string | null;
  price?: number | null;
  priceUnit?: string | null;
}

const RECENT_SEARCHES_KEY = "broka:recent-searches";
const MAX_RECENT_SEARCHES = 6;
const DEFAULT_TRENDING_SEARCHES = ["Phones", "Cars", "Laptops", "Apartments", "Land", "Furniture"];

function readRecentSearches() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]");
    return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === "string").slice(0, MAX_RECENT_SEARCHES) : [];
  } catch {
    return [];
  }
}

/** A progressive GET search form with Railway autocomplete, local history, and popular searches. */
export function SearchForm({
  action,
  value,
  placeholder,
  hidden = {},
  label = "Search",
  className = "",
  iconSubmit = false,
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
  filters?: Omit<MobileFilterDrawerProps, "q" | "iconOnly">;
  filterRowClassName?: string;
}) {
  const router = useRouter();
  const inputId = useId();
  const shellRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const [query, setQuery] = useState(value ?? "");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>(DEFAULT_TRENDING_SEARCHES);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const shellClass = `sform-shell${className.includes("sform-lg") ? " sform-shell-lg" : ""}`;
  const trimmedQuery = query.trim();
  const focusMenuOpen = open && trimmedQuery.length === 0;
  const suggestionsOpen = open && trimmedQuery.length >= 2 && suggestions.length > 0;
  const menuOpen = focusMenuOpen || suggestionsOpen;
  const suggestionsId = `${inputId}-suggestions`;
  const activeOptions = suggestionsOpen
    ? suggestions.map((suggestion) => suggestion.name)
    : focusMenuOpen
      ? [...recentSearches, ...trendingSearches]
      : [];

  useEffect(() => {
    setQuery(value ?? "");
  }, [value]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    requestRef.current?.abort();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }
    const controller = new AbortController();
    requestRef.current = controller;
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok) return;
        const data = (await response.json()) as { items?: Suggestion[] };
        if (!controller.signal.aborted) {
          setSuggestions(data.items ?? []);
          setActiveIndex(-1);
          setOpen(true);
        }
      } catch {
        if (!controller.signal.aborted) setSuggestions([]);
      }
    }, 220);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const recordSearch = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    const next = [cleaned, ...recentSearches.filter((item) => item.toLowerCase() !== cleaned.toLowerCase())].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(next);
    try { window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next)); } catch { /* storage can be unavailable in private browsing */ }
    void fetch("/api/search-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: cleaned }),
      keepalive: true,
    }).catch(() => undefined);
  };

  const navigateTo = (term: string) => {
    const params = new URLSearchParams({ q: term });
    Object.entries(hidden).forEach(([key, item]) => { if (item) params.set(key, item); });
    recordSearch(term);
    setQuery(term);
    setOpen(false);
    router.push(`${action}?${params.toString()}`);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const activeOption = activeOptions[activeIndex];
    if (menuOpen && activeOption) {
      event.preventDefault();
      navigateTo(activeOption);
      return;
    }
    recordSearch(query);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && activeOptions.length) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => (current + 1) % activeOptions.length);
    } else if (event.key === "ArrowUp" && activeOptions.length) {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + activeOptions.length) % activeOptions.length);
    } else if (event.key === "Enter" && activeOptions[activeIndex]) {
      event.preventDefault();
      navigateTo(activeOptions[activeIndex]!);
    } else if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const openFocusMenu = () => {
    if (!query.trim()) {
      setRecentSearches(readRecentSearches());
      setOpen(true);
      void fetch("/api/search-trending", { headers: { Accept: "application/json" } })
        .then((response) => response.ok ? response.json() as Promise<{ items?: string[] }> : null)
        .then((data) => { if (data?.items?.length) setTrendingSearches(data.items); })
        .catch(() => undefined);
    } else if (suggestions.length) {
      setOpen(true);
    }
  };

  const clearRecent = () => {
    setRecentSearches([]);
    try { window.localStorage.removeItem(RECENT_SEARCHES_KEY); } catch { /* storage can be unavailable */ }
  };

  const searchField = (
    <div ref={shellRef} className={shellClass}>
      <form action={action} method="get" role="search" className={`sform ${className}`.trim()} onSubmit={onSubmit}>
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
          onChange={(event) => { const next = event.target.value; setQuery(next); setOpen(next.trim().length === 0 || next.trim().length >= 2); }}
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
          aria-activedescendant={activeOptions[activeIndex] ? `${inputId}-suggestion-${activeIndex}` : undefined}
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
        <div id={suggestionsId} className="sform-suggestions-list" role="listbox" aria-label={focusMenuOpen ? "Recent and popular searches" : "Suggested products"}>
          {menuOpen && (suggestionsOpen ? (
            <>
              <div className="sform-suggestions-label" role="presentation">Matching products</div>
              {suggestions.map((suggestion, index) => (
                <button
                  type="button"
                  key={suggestion.id}
                  id={`${inputId}-suggestion-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`sform-suggestion${index === activeIndex ? " active" : ""}`}
                  onMouseDown={(event) => { event.preventDefault(); navigateTo(suggestion.name); }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="sform-suggestion-icon" aria-hidden="true"><Search size={15} /></span>
                  <span className="sform-suggestion-copy"><strong>{suggestion.name}</strong><small>{suggestion.category ?? "Marketplace listing"}{suggestion.location ? <><span aria-hidden="true"> · </span><MapPin size={11} /> {suggestion.location}</> : null}</small></span>
                  {suggestion.price != null && <span className="sform-suggestion-price">KSh {suggestion.price.toLocaleString("en-KE")}</span>}
                </button>
              ))}
              <div className="sform-suggestions-hint" role="presentation">Use ↑ ↓ to navigate · Enter to search</div>
            </>
          ) : (
            <>
              {recentSearches.length > 0 && (
                <div className="sform-menu-section" role="group" aria-label="Recent searches">
                  {recentSearches.map((term, index) => <button type="button" role="option" aria-selected={index === activeIndex} id={`${inputId}-suggestion-${index}`} key={term} className="sform-search-chip" onMouseDown={(event) => { event.preventDefault(); navigateTo(term); }} onMouseEnter={() => setActiveIndex(index)}><Clock3 size={14} aria-hidden="true" /> <span>{term}</span></button>)}
                </div>
              )}
              <div className="sform-menu-section" role="group" aria-label="Popular on BROKA">
                <div className="sform-suggestions-label" role="presentation"><TrendingUp size={13} aria-hidden="true" /> Popular on BROKA</div>
                <div className="sform-trending-grid">
                  {trendingSearches.map((term, index) => {
                    const optionIndex = recentSearches.length + index;
                    return <button type="button" role="option" aria-selected={optionIndex === activeIndex} id={`${inputId}-suggestion-${optionIndex}`} key={term} className="sform-search-chip" onMouseDown={(event) => { event.preventDefault(); navigateTo(term); }} onMouseEnter={() => setActiveIndex(optionIndex)}><Search size={14} aria-hidden="true" /> <span>{term}</span></button>;
                  })}
                </div>
              </div>
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
