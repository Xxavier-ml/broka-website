"use client";

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

/** Animated orbit light; omitted entirely when the user requests reduced motion. */
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
  if (reduceMotion !== false) return null;

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
