"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type OrbitCometProps = {
  path: string;
  duration: number;
  begin: number;
  radius: number;
  color: string;
  back: boolean;
  rotation: number;
  centerX: number;
  centerY: number;
};

/**
 * Animated orbit light.
 *
 * useReducedMotion() returns null on the server and a real value in the
 * browser, so deciding whether to render from it produced different markup on
 * each side and React threw a hydration error on the homepage. The lights are
 * now always part of the first render — server and browser agree — and are
 * removed after mount for visitors who asked for reduced motion.
 */
export function OrbitComet({
  path,
  duration,
  begin,
  radius,
  color,
  back,
  rotation,
  centerX,
  centerY,
}: OrbitCometProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (mounted && reduceMotion) return null;

  return (
    <g clipPath={`url(#${back ? "zo-back" : "zo-front"})`}>
      <g transform={`rotate(${rotation} ${centerX} ${centerY})`}>
        <g>
          <circle r={radius * 5} fill="url(#zo-glow)" opacity="0.9" />
          <circle r={radius} fill={color} />
          <animateMotion dur={`${duration}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
        </g>
      </g>
    </g>
  );
}
