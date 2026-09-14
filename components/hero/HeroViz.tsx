"use client";
// Animated BROKA commerce-intelligence network visualization
// Pure SVG + CSS animations, no external deps

export function HeroViz() {
  return (
    <div className="hero-viz-wrap" aria-hidden="true">
      <svg
        className="hero-viz-svg"
        viewBox="0 0 620 560"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter */}
          <filter id="hviz-glow-f" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="hviz-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Radial gradient for ambient glow */}
          <radialGradient id="rg-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6B56FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#6B56FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg-node-v" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6B56FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6B56FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg-node-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C8A23E" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C8A23E" stopOpacity="0" />
          </radialGradient>
          {/* Dash for subtle grid */}
          <pattern id="hviz-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(107,86,255,0.055)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="620" height="560" fill="url(#hviz-grid)" />

        {/* Ambient center glow */}
        <ellipse cx="310" cy="280" rx="160" ry="140" fill="url(#rg-center)" className="hviz-broka-glow" />

        {/* ── Connection paths ── */}
        {/* Buyer → Discovery */}
        <path d="M 95 170 C 130 130 190 115 240 112" fill="none" stroke="rgba(107,86,255,0.18)" strokeWidth="1" strokeDasharray="5 8" />
        {/* Discovery → BROKA */}
        <path d="M 266 130 C 288 160 300 200 308 238" fill="none" stroke="rgba(107,86,255,0.28)" strokeWidth="1.2" strokeDasharray="5 8" />
        {/* Buyer → BROKA direct */}
        <path d="M 110 186 C 160 210 240 248 285 266" fill="none" stroke="rgba(107,86,255,0.14)" strokeWidth="1" strokeDasharray="3 10" />
        {/* Seller → Trust */}
        <path d="M 525 170 C 492 130 432 115 382 112" fill="none" stroke="rgba(200,162,62,0.18)" strokeWidth="1" strokeDasharray="5 8" />
        {/* Trust → BROKA */}
        <path d="M 356 130 C 332 158 318 200 313 238" fill="none" stroke="rgba(200,162,62,0.28)" strokeWidth="1.2" strokeDasharray="5 8" />
        {/* Seller → BROKA direct */}
        <path d="M 510 186 C 460 212 380 250 338 266" fill="none" stroke="rgba(200,162,62,0.14)" strokeWidth="1" strokeDasharray="3 10" />
        {/* BROKA → Negotiation */}
        <path d="M 306 320 C 290 360 265 390 228 412" fill="none" stroke="rgba(107,86,255,0.28)" strokeWidth="1.2" strokeDasharray="5 8" />
        {/* BROKA → Completion */}
        <path d="M 326 320 C 354 368 390 400 426 420" fill="none" stroke="rgba(200,162,62,0.28)" strokeWidth="1.2" strokeDasharray="5 8" />
        {/* Negotiation → Completion */}
        <path d="M 244 432 C 300 448 370 445 413 434" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeDasharray="4 8" />

        {/* ── Animated signal dots ── */}
        {/* Buyer → BROKA */}
        <circle r="3.5" fill="#9B8AFF" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="0s"
            path="M 110 186 C 160 210 240 248 285 266" />
        </circle>
        <circle r="2.5" fill="#9B8AFF" opacity="0.7">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"
            path="M 110 186 C 160 210 240 248 285 266" />
        </circle>
        {/* Discovery → BROKA */}
        <circle r="3" fill="#C4BAFF" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.3s"
            path="M 266 130 C 288 160 300 200 308 238" />
        </circle>
        {/* Seller → BROKA */}
        <circle r="3.5" fill="#E5C55A" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.7s"
            path="M 510 186 C 460 212 380 250 338 266" />
        </circle>
        <circle r="2.5" fill="#E5C55A" opacity="0.7">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin="2.1s"
            path="M 510 186 C 460 212 380 250 338 266" />
        </circle>
        {/* Trust → BROKA */}
        <circle r="3" fill="#C8A23E" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.9s"
            path="M 356 130 C 332 158 318 200 313 238" />
        </circle>
        {/* BROKA → Negotiation */}
        <circle r="3.5" fill="#9B8AFF" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.4s"
            path="M 306 320 C 290 360 265 390 228 412" />
        </circle>
        {/* BROKA → Completion */}
        <circle r="3.5" fill="#E5C55A" filter="url(#hviz-glow-sm)">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.2s"
            path="M 326 320 C 354 368 390 400 426 420" />
        </circle>

        {/* ── Satellite node glows ── */}
        <circle cx="90" cy="185" r="36" fill="url(#rg-node-v)" />
        <circle cx="530" cy="185" r="36" fill="url(#rg-node-a)" />
        <circle cx="253" cy="112" r="28" fill="url(#rg-node-v)" />
        <circle cx="369" cy="112" r="28" fill="url(#rg-node-a)" />
        <circle cx="218" cy="430" r="28" fill="url(#rg-node-v)" />
        <circle cx="432" cy="430" r="28" fill="url(#rg-node-a)" />

        {/* ── BUYER node ── */}
        <g transform="translate(90, 185)">
          <rect x="-60" y="-28" width="120" height="56" rx="12"
            fill="rgba(10,10,18,0.92)"
            stroke="rgba(107,86,255,0.42)" strokeWidth="1" />
          {/* Indicator */}
          <circle cx="-38" cy="-2" r="4.5" fill="rgba(107,86,255,0.25)" />
          <circle cx="-38" cy="-2" r="2.5" fill="#9B8AFF" />
          <text x="-24" y="-7" fill="#C4BAFF" fontSize="8.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.09em">BUYER</text>
          <text x="-24" y="7" fill="#716888" fontSize="7" fontFamily="sans-serif">Nairobi, Kenya</text>
        </g>

        {/* ── SELLER node ── */}
        <g transform="translate(530, 185)">
          <rect x="-60" y="-28" width="120" height="56" rx="12"
            fill="rgba(10,10,18,0.92)"
            stroke="rgba(200,162,62,0.42)" strokeWidth="1" />
          <circle cx="-38" cy="-2" r="4.5" fill="rgba(200,162,62,0.2)" />
          <circle cx="-38" cy="-2" r="2.5" fill="#C8A23E" />
          <text x="-24" y="-7" fill="#E8D9A4" fontSize="8.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.09em">SELLER</text>
          <text x="-24" y="7" fill="#716888" fontSize="7" fontFamily="sans-serif">Mombasa, Kenya</text>
        </g>

        {/* ── DISCOVERY node ── */}
        <g transform="translate(253, 112)">
          <rect x="-50" y="-22" width="100" height="44" rx="10"
            fill="rgba(10,10,18,0.9)" stroke="rgba(107,86,255,0.35)" strokeWidth="1" />
          <text textAnchor="middle" y="-3" fill="#C4BAFF" fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.07em">DISCOVERY</text>
          <text textAnchor="middle" y="10" fill="#716888" fontSize="6.5" fontFamily="sans-serif">AI-powered</text>
        </g>

        {/* ── TRUST node ── */}
        <g transform="translate(369, 112)">
          <rect x="-44" y="-22" width="88" height="44" rx="10"
            fill="rgba(10,10,18,0.9)" stroke="rgba(200,162,62,0.35)" strokeWidth="1" />
          <text textAnchor="middle" y="-3" fill="#E5C55A" fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.07em">TRUST</text>
          <text textAnchor="middle" y="10" fill="#716888" fontSize="6.5" fontFamily="sans-serif">Verified layer</text>
        </g>

        {/* ── BROKA / ZENO central node ── */}
        <g transform="translate(310, 280)">
          {/* Spinning rings */}
          <circle r="72" fill="none" stroke="rgba(107,86,255,0.08)" strokeWidth="1"
            strokeDasharray="4 12"
            style={{ transformOrigin: "310px 280px", animation: "hviz-spin 22s linear infinite" }} />
          <circle r="58" fill="none" stroke="rgba(107,86,255,0.12)" strokeWidth="1"
            strokeDasharray="2 8"
            style={{ transformOrigin: "310px 280px", animation: "hviz-spin-r 18s linear infinite" }} />
          {/* Glow layers */}
          <circle r="48" fill="rgba(107,86,255,0.08)" className="hviz-node-pulse" />
          <circle r="36" fill="rgba(107,86,255,0.16)" stroke="rgba(107,86,255,0.4)" strokeWidth="1" />
          <circle r="22" fill="rgba(107,86,255,0.32)" />
          <circle r="12" fill="rgba(107,86,255,0.55)" />
          {/* Labels */}
          <text textAnchor="middle" y="-3" fill="#EDE8FF" fontSize="10" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.05em">BROKA</text>
          <text textAnchor="middle" y="11" fill="#9B8AFF" fontSize="7.5" fontFamily="sans-serif" letterSpacing="0.08em">ZENO</text>
        </g>

        {/* ── NEGOTIATION node ── */}
        <g transform="translate(218, 430)">
          <rect x="-54" y="-22" width="108" height="44" rx="10"
            fill="rgba(10,10,18,0.9)" stroke="rgba(107,86,255,0.32)" strokeWidth="1" />
          <text textAnchor="middle" y="-3" fill="#C4BAFF" fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.07em">NEGOTIATION</text>
          <text textAnchor="middle" y="10" fill="#716888" fontSize="6.5" fontFamily="sans-serif">Zeno-assisted</text>
        </g>

        {/* ── COMPLETION node ── */}
        <g transform="translate(432, 430)">
          <rect x="-54" y="-22" width="108" height="44" rx="10"
            fill="rgba(10,10,18,0.9)" stroke="rgba(200,162,62,0.32)" strokeWidth="1" />
          <text textAnchor="middle" y="-3" fill="#E5C55A" fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.07em">COMPLETION</text>
          <text textAnchor="middle" y="10" fill="#716888" fontSize="6.5" fontFamily="sans-serif">Transaction closed</text>
        </g>

        {/* ── Floating data badges ── */}
        <g style={{ animation: "float-badge 4s ease-in-out infinite", animationDelay: "0s" }}>
          <g transform="translate(50, 340)">
            <rect x="-38" y="-13" width="76" height="26" rx="7"
              fill="rgba(10,10,18,0.88)" stroke="rgba(107,86,255,0.3)" strokeWidth="1" />
            <text textAnchor="middle" y="5" fill="#9B8AFF" fontSize="8" fontFamily="sans-serif" fontWeight="500">KES 25,000</text>
          </g>
        </g>
        <g style={{ animation: "float-badge 4s ease-in-out infinite", animationDelay: "1.3s" }}>
          <g transform="translate(570, 340)">
            <rect x="-44" y="-13" width="88" height="26" rx="7"
              fill="rgba(10,10,18,0.88)" stroke="rgba(200,162,62,0.3)" strokeWidth="1" />
            <text textAnchor="middle" y="5" fill="#C8A23E" fontSize="8" fontFamily="sans-serif" fontWeight="500">OFFER SENT</text>
          </g>
        </g>
        <g style={{ animation: "float-badge 4s ease-in-out infinite", animationDelay: "0.7s" }}>
          <g transform="translate(310, 510)">
            <rect x="-44" y="-13" width="88" height="26" rx="7"
              fill="rgba(10,10,18,0.88)" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />
            <text textAnchor="middle" y="5" fill="#4ade80" fontSize="8" fontFamily="sans-serif" fontWeight="500">DEAL AGREED</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
