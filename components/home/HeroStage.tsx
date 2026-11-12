"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Check, MapPin, MessageCircle, Mic, Phone, Sparkles, Tv, Wallet } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/useDeviceCapability";
import { TiltStage } from "./TiltStage";

/**
 * The hero's product stage: a phone running a sample Zeno conversation, with
 * the context it surfaces floating beside it.
 *
 * Everything here is an illustration and says so ("Sample"); none of it is
 * live inventory. The server renders the finished conversation, so the first
 * paint (and anyone without JavaScript or with reduced motion) sees the whole
 * exchange. With motion allowed it then replays as a loop: the request types
 * itself, Zeno "thinks", the understood intent and two sample matches appear.
 * Steps reveal with transform and clip-path only, never opacity, so text is
 * always at full contrast. The loop pauses off screen and in background tabs.
 */

const QUERY = "I need a 55-inch TV under KSh 50,000 in Nairobi";
const FINAL = 6;

const INTENT = [
  { icon: Tv, label: "55-inch TV" },
  { icon: Wallet, label: "Under KSh 50,000" },
  { icon: MapPin, label: "Nairobi" },
];

const RESULTS = [
  { title: "55-inch smart TV", meta: "Westlands · Used, good", price: "KSh 46,500" },
  { title: "55-inch 4K TV + soundbar", meta: "Nairobi CBD · New, sealed", price: "KSh 49,000" },
];

// Orbit geometry, in the 1000 x 760 viewBox of the two orbit layers.
const CX = 500;
const CY = 380;
const RX = 470;
const RY = 150;
const TILT = -9;
const ORBIT = `M ${CX - RX} ${CY} a ${RX} ${RY} 0 1 0 ${2 * RX} 0 a ${RX} ${RY} 0 1 0 ${-2 * RX} 0`;
const NODES = [14, 64, 128, 196, 244, 300, 338];
const COMETS = [
  { dur: 16, begin: 0, r: 6, color: "#ECE6FF" },
  { dur: 16, begin: -8, r: 4.5, color: "#8CECFF" },
  { dur: 23, begin: -4, r: 4, color: "#C9B8FF" },
];

function Orbit({ half, comets }: { half: "back" | "front"; comets: boolean }) {
  const clip = `hs-${half}`;
  return (
    <svg viewBox="0 0 1000 760" className={`hs-orbit hs-orbit-${half}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`hs-line-${half}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B06BFF" stopOpacity="0.15" />
          <stop offset="0.35" stopColor="#8B6BFF" />
          <stop offset="0.7" stopColor="#4FA3FF" />
          <stop offset="1" stopColor="#54D7E9" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`hs-glow-${half}`}>
          <stop offset="0" stopColor="#C9B8FF" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#8B6BFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8B6BFF" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          {half === "back" ? <rect x="0" y="0" width="1000" height={CY} /> : <rect x="0" y={CY} width="1000" height={760 - CY} />}
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <path d={ORBIT} fill="none" stroke={`url(#hs-line-${half})`} strokeWidth="12" opacity="0.16" />
          <path d={ORBIT} fill="none" stroke={`url(#hs-line-${half})`} strokeWidth="1.8" opacity={half === "back" ? 0.7 : 1} />
          {NODES.map((deg) => {
            const t = (deg * Math.PI) / 180;
            const x = CX + RX * Math.cos(t);
            const y = CY + RY * Math.sin(t);
            return (
              <g key={deg}>
                <circle cx={x} cy={y} r="18" fill={`url(#hs-glow-${half})`} />
                <circle cx={x} cy={y} r="3.6" fill="#F3EEFF" />
              </g>
            );
          })}
          {comets &&
            COMETS.map((c) => (
              <g key={`${c.dur}${c.begin}`}>
                <circle r={c.r * 4.5} fill={`url(#hs-glow-${half})`} />
                <circle r={c.r} fill={c.color} />
                <animateMotion dur={`${c.dur}s`} begin={`${c.begin}s`} repeatCount="indefinite" path={ORBIT} />
              </g>
            ))}
        </g>
      </g>
    </svg>
  );
}

export function HeroStage() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(FINAL);
  const [typed, setTyped] = useState(QUERY.length);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPhase(FINAL);
      setTyped(QUERY.length);
      setWiping(false);
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    // One loop of the conversation: [delay before the step, the step].
    const steps: [number, () => void][] = [
      [4600, () => setWiping(true)],
      [620, () => { setWiping(false); setTyped(0); setPhase(0); }],
      [520, () => setPhase(1)],
    ];
    for (let i = 1; i <= QUERY.length; i++) steps.push([i === 1 ? 240 : 36, () => setTyped(i)]);
    steps.push(
      [420, () => setPhase(2)],
      [380, () => setPhase(3)],
      [1250, () => setPhase(4)],
      [1150, () => setPhase(5)],
      [950, () => setPhase(6)],
    );

    let index = 0;
    let timer = 0;
    let running = false;
    let onScreen = false;
    const schedule = () => {
      const [delay, step] = steps[index]!;
      timer = window.setTimeout(() => {
        step();
        index = (index + 1) % steps.length;
        schedule();
      }, delay);
    };
    const sync = () => {
      const shouldRun = onScreen && document.visibilityState === "visible";
      if (shouldRun === running) return;
      running = shouldRun;
      window.clearTimeout(timer);
      if (running) schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  const shown = Array.from({ length: phase }, (_, i) => ` s${i + 1}`).join("");

  return (
    <div className="hs" ref={rootRef}>
      <div className="hs-rise">
        <TiltStage className="hs-tilt">
          <div className="hs-layer hs-layer-back" aria-hidden="true">
            <span className="hs-aura" />
            <span className="hs-floor" />
            <Orbit half="back" comets={!reduced} />
          </div>

          <div className="hs-layer hs-layer-phone">
            <div className="hs-phone" aria-hidden="true">
              <span className="hs-phone-key hs-phone-key-a" />
              <span className="hs-phone-key hs-phone-key-b" />
              <span className="hs-phone-key hs-phone-key-c" />
              <div className="hs-screen">
                <div className="hs-status">
                  <span>9:41</span>
                  <span className="hs-island" />
                  <span className="hs-status-icons"><i /><i /><b /></span>
                </div>
                <div className="hs-appbar">
                  <span className="hs-avatar">
                    <Image src="/assets/zeno-icon.png" alt="" width={34} height={34} />
                  </span>
                  <span className="hs-who">
                    <strong>Zeno</strong>
                    <small><i /> BROKA assistant</small>
                  </span>
                  <span className="hs-tag">Sample</span>
                </div>

                <div className={`hs-thread${shown}${wiping ? " is-wiping" : ""}`}>
                  <span className="hs-day">Today · sample chat</span>
                  <p className="hs-bubble hs-bubble-user">
                    {QUERY.slice(0, typed)}
                    <i className="hs-caret" />
                  </p>
                  <div className="hs-bubble hs-bubble-zeno">
                    <span className="hs-dots"><i /><i /><i /></span>
                    <p className="hs-zeno-line"><Sparkles size={12} /> Here is what I understood</p>
                    <ul className="hs-intent">
                      {INTENT.map((item, i) => (
                        <li key={item.label} style={{ ["--i" as string]: i }}>
                          <item.icon size={12} /> {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="hs-results">
                    {RESULTS.map((result, i) => (
                      <li className="hs-result" key={result.title} style={{ ["--i" as string]: i }}>
                        <span className="hs-thumb"><Tv size={17} /></span>
                        <span className="hs-result-copy">
                          <strong>{result.title}</strong>
                          <small>{result.meta}</small>
                        </span>
                        <span className="hs-price">{result.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="hs-next">
                    <span className="hs-next-primary"><MessageCircle size={13} /> Message seller</span>
                    <span className="hs-next-ghost"><Phone size={13} /> Call</span>
                  </div>
                </div>

                <div className="hs-composer">
                  <span>Ask Zeno anything…</span>
                  <span className="hs-mic"><Mic size={14} /></span>
                </div>
              </div>
            </div>
          </div>

          <div className="hs-layer hs-layer-front" aria-hidden="true">
            <Orbit half="front" comets={!reduced} />
            <div className="hs-card hs-card-intent">
              <span className="hs-card-label">Zeno · intent</span>
              <ul>
                <li><Check size={12} /> <span>Size</span> <b>55-inch</b></li>
                <li><Check size={12} /> <span>Budget</span> <b>≤ KSh 50k</b></li>
                <li><Check size={12} /> <span>Area</span> <b>Nairobi</b></li>
              </ul>
            </div>
            <div className="hs-card hs-card-price">
              <span className="hs-card-label">Price in view</span>
              <strong>KSh 46,500</strong>
              <small>before you contact anyone</small>
            </div>
            <div className="hs-card hs-card-seller">
              <span className="hs-card-icon"><BadgeCheck size={15} /></span>
              <span>
                <strong>Seller context</strong>
                <small>location · condition · store</small>
              </span>
            </div>
            <div className="hs-card hs-card-direct">
              <span className="hs-card-icon is-cyan"><MessageCircle size={15} /></span>
              <span>
                <strong>Deal directly</strong>
                <small>you and the seller agree terms</small>
              </span>
            </div>
          </div>
        </TiltStage>
      </div>
      <p className="sr-only">
        Sample preview of the BROKA app. Zeno reads a plain request for a 55-inch TV under KSh 50,000 in Nairobi,
        shows the size, budget and area it understood, and lists two sample matches with their prices, before you
        message or call the seller yourself.
      </p>
    </div>
  );
}
