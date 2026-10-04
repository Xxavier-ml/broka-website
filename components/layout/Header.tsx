"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";

export function Header() {
  const pathname = usePathname();
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
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  // A group is active when the page is any of its children (or its own link).
  const isGroupActive = (item: { href: string; children?: { href: string }[] }) =>
    isActive(item.href) || Boolean(item.children?.some((c) => isActive(c.href)));

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
                <div className="hdr-dropdown" key={item.label}>
                  <button
                    className={`hdr-dropdown-btn${isGroupActive(item) ? " active" : ""}`}
                    aria-expanded={openGroup === item.label}
                    aria-haspopup="true"
                    onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: openGroup === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ display: "inline-flex" }}
                    >
                      <ChevronDown className="hdr-dropdown-chevron" size={14} />
                    </motion.span>
                  </button>
                  <div className={`hdr-dropdown-menu${openGroup === item.label ? " open" : ""}`} role="menu">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} role="menuitem">
                        {child.label}
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
            <Link href="/sell" className="hdr-cta">
              Start selling
            </Link>
            <button
              className="hdr-burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: "inline-flex" }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((item) =>
          item.children ? (
            <div key={item.label}>
              <Link
                href={item.href}
                className={isActive(item.href) ? "active" : ""}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={isActive(child.href) ? "active" : ""}
                  onClick={closeMenu}
                  style={{ paddingLeft: 44, fontSize: 14, opacity: 0.8 }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          )
        )}
        <div className="mobile-nav-cta">
            <Link href="/sell" className="btn btn-primary" onClick={closeMenu}>
              Start selling on BROKA
          </Link>
        </div>
      </nav>
    </>
  );
}
