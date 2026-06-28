"use client";

/**
 * Lightweight reusable motion helpers for Framer Motion.
 * Simple fade-up reveal used across all sections.
 */

import { motion, useInView, MotionProps, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

// ── Variants ────────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// ── Components ───────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use "up" for fadeUp, "fade" for plain fade */
  variant?: "up" | "fade";
  once?: boolean;
  amount?: number;
}

/**
 * Wraps children in a motion.div that fades (+ slides up) when scrolled into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
  amount = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const variants = variant === "up" ? fadeUp : fadeIn;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
