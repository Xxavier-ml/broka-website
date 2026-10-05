interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  sub?: string;
  children?: React.ReactNode;
  atmosphere?: string;
  className?: string;
}

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
      <div className="wrap page-hero-wrap">
        <div className="page-hero-content">
          {eyebrow && <span className="t-eyebrow page-hero-kicker">{eyebrow}</span>}
          <h1 className="t-h1 page-hero-headline" id="page-hero-heading">{headline}</h1>
          {sub && <p className="page-hero-sub">{sub}</p>}
          {children && <div className="page-hero-actions">{children}</div>}
        </div>
        <aside className="page-hero-system" aria-hidden="true">
          <span className="page-hero-system-mark">BROKA / SYSTEM</span>
          <span className="page-hero-system-line" />
          <span className="page-hero-system-note">intelligent commerce<br />built in Kenya</span>
        </aside>
      </div>
    </section>
  );
}
