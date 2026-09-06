import React from "react";
import { motion, Variants } from "motion/react";

export type RevealTransition = "slide-left" | "blur-in" | "zoom-out";

interface RevealSectionProps {
  /**
   * HTML id placed on the wrapper, so nav links like <a href="#services">
   * have something to land on regardless of the child component's markup.
   */
  id?: string;
  /** Which entrance animation plays once this section scrolls into view. */
  transition?: RevealTransition;
  /**
   * Space reserved above the section so the fixed navbar doesn't cover its
   * top when the browser jumps here via anchor link.
   */
  scrollMarginClassName?: string;
  children: React.ReactNode;
}

const variantsByTransition: Record<RevealTransition, Variants> = {
  "slide-left": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "zoom-out": {
    hidden: { opacity: 0, scale: 1.08 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * Plain entrance animation — no sticky positioning, no scroll-linked
 * transforms, no z-index management. Each section sits in normal flow and
 * plays its reveal once when it first enters the viewport.
 *
 * Usage:
 *   <RevealSection id="services" transition="zoom-out"><ServicesSection /></RevealSection>
 */
export const RevealSection: React.FC<RevealSectionProps> = ({
  id,
  transition = "slide-left",
  scrollMarginClassName = "scroll-mt-24",
  children,
}) => (
  <motion.div
    id={id}
    className={scrollMarginClassName}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
    variants={variantsByTransition[transition]}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
