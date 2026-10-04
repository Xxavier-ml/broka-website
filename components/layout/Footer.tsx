import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { footerNav, navLegal } from "@/data/navigation";
import { CONTACT, SOCIAL, mailto } from "@/lib/site";

/**
 * The footer reads from the same taxonomy as the header (data/navigation.ts).
 * Its columns are the same four groups, so nothing here can drift out of step
 * with the top bar, and the social links no longer take a whole column of
 * their own away from the pages people are actually looking for.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "X / Twitter", href: SOCIAL.x },
    { label: "LinkedIn", href: SOCIAL.linkedin },
    { label: "GitHub", href: SOCIAL.github },
  ];
  return (
    <footer className="ftr" aria-label="Site footer">
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-brand-col">
            <div className="ftr-brand">
              <Image src="/assets/broka-mark.png" alt="" width={34} height={34} />
              <span className="ftr-brand-name">BROKA</span>
            </div>
            <p className="ftr-brand-tag">Future of Intelligent Commerce</p>
            <p className="t-sm ftr-brand-blurb">
              An intelligent commerce platform connecting buyers and sellers in
              East Africa and beyond.
            </p>
            <address className="ftr-contact" style={{ fontStyle: "normal" }}>
              <a href={mailto(CONTACT.adminEmail)}>
                <Mail size={14} aria-hidden="true" /> {CONTACT.adminEmail}
              </a>
              <a href={`tel:${CONTACT.phone}`}>
                <Phone size={14} aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} aria-hidden="true" /> WhatsApp us
              </a>
            </address>
            <nav className="ftr-social" aria-label="Social links">
              {social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="ftr-col-title">{group.title}</p>
              <nav className="ftr-links" aria-label={`${group.title} links`}>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="ftr-bottom">
          <p className="ftr-copy">&copy; {year} BROKA. All rights reserved.</p>
          <nav className="ftr-legal" aria-label="Legal">
            {navLegal.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="ftr-built">Built in <em>Kenya.</em> Designed for a global market.</p>
        </div>
      </div>
    </footer>
  );
}
