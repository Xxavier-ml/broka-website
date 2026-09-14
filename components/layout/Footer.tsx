import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr" aria-label="Site footer">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="ftr-brand-name">BROKA</div>
            <p className="ftr-brand-tag">Future of Intelligent Commerce</p>
            <p className="t-sm" style={{ maxWidth: 240, marginTop: 8 }}>
              An intelligent commerce platform connecting buyers and sellers in
              East Africa and beyond.
            </p>
          </div>
          <div>
            <p className="ftr-col-title">Product</p>
            <nav className="ftr-links" aria-label="Product links">
              <Link href="/what-is-broka">What is BROKA</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/zeno">Meet Zeno</Link>
              <Link href="/technology">Technology</Link>
              <Link href="/roadmap">Roadmap</Link>
            </nav>
          </div>
          <div>
            <p className="ftr-col-title">Company</p>
            <nav className="ftr-links" aria-label="Company links">
              <Link href="/vision">Vision</Link>
              <Link href="/founders">Founders</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div>
            <p className="ftr-col-title">Follow</p>
            <nav className="ftr-links" aria-label="Social links">
              <a href="https://x.com/brokaapp" target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href="https://linkedin.com/company/brokaapp" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/Xxavier-ml/broka-website" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </div>
        <div className="ftr-bottom">
          <p className="ftr-copy">&copy; {year} BROKA. All rights reserved.</p>
          <p className="ftr-built">Built in <em>Kenya.</em> Designed for a global market.</p>
        </div>
      </div>
    </footer>
  );
}
