/**
 * Page transition. Unlike a layout, a template is mounted afresh on every
 * navigation, so the enter animation in experience.css (`.page-transition`)
 * plays on the first load and again each time the visitor moves to another
 * page. The header and footer live in the root layout and stay still.
 *
 * Plain CSS rather than framer-motion: it runs before hydration (no flash of
 * the finished page first) and the reduced-motion media query applies from
 * the first paint.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
