"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroCopy() {
  return (
    <motion.div
      className="hero-copy"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="hero-kicker" variants={item}>
        <span className="hero-kicker-pulse" aria-hidden="true" />
        BROKA · Nairobi → Global
      </motion.div>
      <motion.h1 className="t-display hero-headline" id="hero-h" variants={item}>
        The intelligence<br className="br-lg" /> layer for<br className="br-lg" /> commerce.
      </motion.h1>
      <motion.p className="hero-sub" variants={item}>
        BROKA is building an intelligent commerce platform that brings
        discovery, negotiation, trust and decision-making into one
        connected experience — built for East Africa and beyond.
      </motion.p>
      <motion.div className="hero-actions" variants={item}>
        <Magnetic>
          <Link href="/what-is-broka" className="btn btn-primary">Explore BROKA</Link>
        </Magnetic>
        <Magnetic>
          <Link href="/how-it-works" className="btn btn-ghost">How it works →</Link>
        </Magnetic>
      </motion.div>
      <motion.p className="hero-origin" variants={item}>
        <em>Built in Kenya.</em> Designed for a global market.
      </motion.p>
    </motion.div>
  );
}
