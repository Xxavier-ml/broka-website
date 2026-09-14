"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [logoErr, setLogoErr] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setMenuOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [pathname]);

  // Escape closes whichever of the dropdown / mobile nav is open
  useEffect(() => {
    if (!dropOpen && !menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropOpen(false);
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

  return (
    <>
      <header className="hdr">
        <div className="wrap hdr-inner">
          {/* Logo */}
          <Link href="/" className="hdr-brand" aria-label="BROKA — Home">
            {logoErr ? (
              <span className="hdr-logo-text">BROKA</span>
            ) : (
              <Image
                src="/assets/broka-logo.png"
                alt="BROKA"
                width={108}
                height={30}
                className="hdr-logo"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                onError={() => setLogoErr(true)}
                priority
              />
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hdr-nav" aria-label="Primary navigation">
            {navLinks.map((item) =>
              item.children ? (
                <div className="hdr-dropdown" key={item.label} ref={dropRef}>
                  <button
                    className={`hdr-dropdown-btn${isActive(item.href) ? " active" : ""}`}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    onClick={() => setDropOpen((v) => !v)}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: dropOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ display: "inline-flex" }}
                    >
                      <ChevronDown className="hdr-dropdown-chevron" size={14} />
                    </motion.span>
                  </button>
                  <div className={`hdr-dropdown-menu${dropOpen ? " open" : ""}`} role="menu">
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
            <Link href="/contact" className="hdr-cta">
              Join BROKA
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
          <Link href="/contact" className="btn btn-primary" onClick={closeMenu}>
            Join BROKA
          </Link>
        </div>
      </nav>
    </>
  );
}
