import { ConstellationField } from "@/components/visuals/ConstellationField";

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  sub?: string;
  children?: React.ReactNode;
  atmosphere?: string;
}

export function PageHero({ eyebrow, headline, sub, children, atmosphere = "atm-violet" }: PageHeroProps) {
  return (
    <section className={`page-hero grid-bg has-field ${atmosphere}`} aria-labelledby="page-hero-heading">
      <ConstellationField opacity={0.55} id="pagehero" />
      <div className="wrap">
        {eyebrow && <span className="t-eyebrow page-hero-kicker">{eyebrow}</span>}
        <h1 className="t-h1 page-hero-headline" id="page-hero-heading">{headline}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
        {children && <div className="page-hero-actions">{children}</div>}
      </div>
    </section>
  );
}
