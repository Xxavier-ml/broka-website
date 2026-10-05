"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion() !== false;
  const variants: Variants = {
    hidden: {
      opacity: 0,
      transform: reduceMotion ? "translate3d(0, 0, 0)" : "translate3d(0, 18px, 0)",
    },
    show: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: { duration: reduceMotion ? 0.12 : 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
