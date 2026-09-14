export function ArchitectureViz() {
  return (
    <div className="tech-arch-wrap">
      <svg viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg" role="img"
        aria-label="BROKA platform architecture: Zeno, Commerce, and Trust above the API layer, connected to AI, Payments, and Messaging">
        <defs>
          <filter id="arch-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* BROKA top */}
        <rect x="240" y="12" width="200" height="48" rx="10"
          fill="rgba(107,86,255,0.18)" stroke="rgba(107,86,255,0.55)" strokeWidth="1.5" />
        <text x="340" y="41" textAnchor="middle" fill="#EDE8FF"
          fontSize="13" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.04em">BROKA</text>

        {/* Vertical from BROKA */}
        <line x1="340" y1="60" x2="340" y2="84" stroke="rgba(107,86,255,0.35)" strokeWidth="1.5" />
        {/* Horizontal bar */}
        <line x1="120" y1="84" x2="560" y2="84" stroke="rgba(107,86,255,0.20)" strokeWidth="1.5" />

        {/* Tier 2 nodes */}
        {[
          { x: 80, cx: 160, label: "ZENO", sub: "AI companion", vc: "rgba(107,86,255,0.5)", vf: "rgba(107,86,255,0.15)", tc: "#C4BAFF" },
          { x: 275, cx: 340, label: "COMMERCE", sub: "Marketplace layer", vc: "rgba(107,86,255,0.3)", vf: "rgba(107,86,255,0.07)", tc: "#EDE8FF" },
          { x: 460, cx: 520, label: "TRUST", sub: "Verification & safety", vc: "rgba(200,162,62,0.4)", vf: "rgba(200,162,62,0.08)", tc: "#E5C55A" },
        ].map((n) => (
          <g key={n.label}>
            <line x1={n.cx} y1="84" x2={n.cx} y2="100" stroke={n.vc} strokeWidth="1.5" />
            <rect x={n.x} y="100" width={n.cx === 340 ? 130 : 120} height="48" rx="9"
              fill={n.vf} stroke={n.vc} strokeWidth="1.5" />
            <text x={n.x + (n.cx === 340 ? 65 : 60)} y="121" textAnchor="middle"
              fill={n.tc} fontSize="10.5" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.05em">{n.label}</text>
            <text x={n.x + (n.cx === 340 ? 65 : 60)} y="137" textAnchor="middle"
              fill="#716888" fontSize="8" fontFamily="sans-serif">{n.sub}</text>
          </g>
        ))}

        {/* Lines to API */}
        <line x1="160" y1="148" x2="160" y2="180" stroke="rgba(107,86,255,0.2)" strokeWidth="1.5"/>
        <line x1="340" y1="148" x2="340" y2="180" stroke="rgba(107,86,255,0.2)" strokeWidth="1.5"/>
        <line x1="520" y1="148" x2="520" y2="180" stroke="rgba(107,86,255,0.2)" strokeWidth="1.5"/>
        <line x1="160" y1="180" x2="520" y2="180" stroke="rgba(107,86,255,0.14)" strokeWidth="1.5"/>
        <line x1="340" y1="180" x2="340" y2="196" stroke="rgba(107,86,255,0.3)" strokeWidth="1.5"/>

        {/* BROKA API */}
        <rect x="170" y="196" width="340" height="48" rx="10"
          fill="rgba(107,86,255,0.06)" stroke="rgba(107,86,255,0.35)" strokeWidth="1.5"/>
        <text x="340" y="218" textAnchor="middle" fill="#9B8AFF"
          fontSize="10" fontFamily="sans-serif" fontWeight="700" letterSpacing="0.06em">BROKA API</text>
        <text x="340" y="235" textAnchor="middle" fill="#716888"
          fontSize="7.5" fontFamily="sans-serif">FastAPI · Redis Streams · ARQ Workers</text>

        {/* Vertical from API */}
        <line x1="340" y1="244" x2="340" y2="268" stroke="rgba(107,86,255,0.18)" strokeWidth="1.5"/>
        <line x1="130" y1="268" x2="550" y2="268" stroke="rgba(107,86,255,0.12)" strokeWidth="1.5"/>

        {/* Tier 3 services */}
        {[
          { cx: 130, label: "AI", sub: "Provider fallbacks" },
          { cx: 255, label: "PAYMENTS", sub: "M-Pesa · Escrow" },
          { cx: 380, label: "MESSAGING", sub: "Real-time · WebRTC" },
          { cx: 505, label: "TRUST", sub: "Fraud · Disputes" },
        ].map((s) => (
          <g key={s.label}>
            <line x1={s.cx} y1="268" x2={s.cx} y2="284" stroke="rgba(107,86,255,0.14)" strokeWidth="1.5"/>
            <rect x={s.cx - 56} y="284" width="112" height="52" rx="9"
              fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
            <text x={s.cx} y="310" textAnchor="middle" fill="#B0A8CA"
              fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.04em">{s.label}</text>
            <text x={s.cx} y="327" textAnchor="middle" fill="#716888"
              fontSize="7.5" fontFamily="sans-serif">{s.sub}</text>
          </g>
        ))}

        {/* Signal dots on vertical lines */}
        {[0, 1, 2].map((i) => {
          const x = [160, 340, 520][i];
          return (
            <circle key={i} r="3" fill="rgba(107,86,255,0.6)">
              <animateMotion dur={`${1.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}
                path={`M ${x} 84 L ${x} 148`} />
            </circle>
          );
        })}
        <circle r="3" fill="rgba(107,86,255,0.55)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.2s"
            path="M 340 196 L 340 244" />
        </circle>
      </svg>
    </div>
  );
}
