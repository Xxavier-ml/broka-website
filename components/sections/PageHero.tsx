interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  sub?: string;
  children?: React.ReactNode;
  atmosphere?: string;
  className?: string;
}

/**
 * The opening of every marketing page: kicker, headline, one line of
 * explanation and the page's actions, over a lit perspective grid. The
 * instrument on the right (a small radar with Nairobi's coordinates) is
 * decoration and hidden from assistive technology.
 */
export function PageHero({
  eyebrow,
  headline,
  sub,
  children,
  atmosphere = "atm-violet",
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`page-hero has-field ${atmosphere}${className ? ` ${className}` : ""}`}
      aria-labelledby="page-hero-heading"
    >
      <div className="page-hero-backdrop" aria-hidden="true">
        <span className="page-hero-glow" />
        <span className="page-hero-floor" />
      </div>
      <div className="wrap page-hero-wrap">
        <div className="page-hero-content">
          {eyebrow && <span className="t-eyebrow page-hero-kicker">{eyebrow}</span>}
          <h1 className="t-h1 page-hero-headline" id="page-hero-heading">{headline}</h1>
          {sub && <p className="page-hero-sub">{sub}</p>}
          {children && <div className="page-hero-actions">{children}</div>}
        </div>
        <aside className="page-hero-system" aria-hidden="true">
          <span className="page-hero-radar"><i /><i /><i /><b /></span>
          <span className="page-hero-system-mark">BROKA / SYSTEM</span>
          <span className="page-hero-system-line" />
          <span className="page-hero-system-note">intelligent commerce<br />built in Kenya</span>
          <span className="page-hero-coords">01°17′S · 36°49′E</span>
        </aside>
      </div>
    </section>
  );
}
