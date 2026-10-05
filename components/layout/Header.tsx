"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navLinks, navUtility } from "@/data/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";

/**
 * The site header.
 *
 * Structure rules it follows, so the bar stays readable as pages are added:
 *  - Four primary entries. A page is never reachable from two labels, and no
 *    two labels point at the same page (the old "Browse" + "Explore > All
 *    products" pair did both).
 *  - One primary call to action: the app. "Sell" stays a nav entry, so the
 *    seller route is still one click away.
 *  - Exactly one nav entry is marked current, and it is the most specific
 *    match — /browse used to light up two entries at once.
 *  - Menus open on hover as well as click, and every item says what it is.
 */
export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  // Which dropdown is open (by its label), if any. One at a time.
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const dropOpen = openGroup !== null;
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeMenu = () => setMenuOpen(false);

  // Clear header at the top of the page, glass once content scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setOpenGroup(null); }, [pathname]);

  // Escape closes whichever of the dropdown / mobile nav is open
  useEffect(() => {
    if (!dropOpen && !menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenGroup(null);
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dropOpen, menuOpen]);

  // Prevent the page behind the mobile nav from scrolling while it's open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  // A group is current when the page is one of its children. Its own link is
  // one of those children, so a group never double-marks with a sibling entry.
  const isGroupActive = (item: { href: string; children?: { href: string }[] }) =>
    item.children?.length ? Boolean(item.children.some((c) => isActive(c.href))) : isActive(item.href);

  return (
    <>
      <header className="hdr" data-scrolled={scrolled || menuOpen ? "" : undefined}>
        <div className="wrap hdr-inner">
          {/* Logo */}
          <Link href="/" className="hdr-brand" aria-label="BROKA — Home">
            <Image src="/assets/broka-mark.png" alt="" width={40} height={40} className="hdr-mark" priority />
            <span className="hdr-word" aria-hidden="true">
              <span className="hdr-word-name">BROKA</span>
              <span className="hdr-word-tag">Intelligent Commerce</span>
            </span>
          </Link>
          {/* Desktop nav */}
          <nav className="hdr-nav" aria-label="Primary navigation" ref={navRef}>
            {navLinks.map((item) =>
              item.children ? (
                <div
                  className="hdr-dropdown"
                  key={item.label}
                  onMouseEnter={() => setOpenGroup(item.label)}
                  onMouseLeave={() => setOpenGroup((g) => (g === item.label ? null : g))}
                >
                  <Link
                    href={item.href}
                    className={`hdr-dropdown-btn${isGroupActive(item) ? " active" : ""}`}
                    aria-expanded={openGroup === item.label}
                    aria-haspopup="true"
                    aria-current={isGroupActive(item) ? "page" : undefined}
                    onClick={() => setOpenGroup(null)}
                  >
                    {item.label}
                    <ChevronDown className="hdr-dropdown-chevron" size={14} aria-hidden="true" />
                  </Link>
                  <div className={`hdr-dropdown-menu${openGroup === item.label ? " open" : ""}`} role="menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className={isActive(child.href) ? "active" : ""}
                        aria-current={isActive(child.href) ? "page" : undefined}
                      >
                        <span className="hdr-menu-label">{child.label}</span>
                        {child.description && <span className="hdr-menu-desc">{child.description}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hdr-link${isActive(item.href) ? " active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          {/* Actions */}
          <div className="hdr-actions">
            <Link href="/browse" className="hdr-search" aria-label="Search BROKA">
              <Search size={17} aria-hidden="true" />
              <span className="hdr-search-text">Search</span>
            </Link>
            <Link href="/download" className="hdr-cta">
              Get the app
            </Link>
            <button
              className="hdr-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <motion.span
                initial={false}
                animate={{ rotate: reduceMotion ? 0 : menuOpen ? 90 : 0 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ display: "inline-flex" }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile nav: the same groups as the desktop menu, labelled. */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((item) =>
          item.children?.length ? (
            /* A group shows its heading and its pages. The heading is not
               itself a link — every page under it is listed, so a separate
               "all of it" row would just repeat the first one. */
            <div className="mobile-nav-group" key={item.label}>
              <p className="mobile-nav-title">{item.label}</p>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`mobile-nav-child${isActive(child.href) ? " active" : ""}`}
                  onClick={closeMenu}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mobile-nav-group mobile-nav-single" key={item.label}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </div>
          )
        )}
        <div className="mobile-nav-group mobile-nav-utility">
          {navUtility.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-nav-cta">
          <Link href="/download" className="btn btn-primary" onClick={closeMenu}>
            Get the BROKA app
          </Link>
        </div>
      </nav>
    </>
  );
}
