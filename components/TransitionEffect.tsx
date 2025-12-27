"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export type TransitionType =
  | "fade"
  | "tv"
  | "slide"
  | "zoom"
  | "curtain"
  | "scan";

interface TransitionEffectProps {
  children: ReactNode;
  isActive: boolean;
  type?: TransitionType;
}

export default function TransitionEffect({
  children,
  isActive,
  type = "fade",
}: TransitionEffectProps) {
  const transitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1.2, ease: "easeInOut" as const },
    },
    tv: {
      initial: {
        opacity: 0,
        scale: 0.001,
        scaleY: 0.001,
      },
      animate: {
        opacity: 1,
        scale: 1,
        scaleY: 1,
      },
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
    slide: {
      initial: {
        opacity: 0,
        y: 100,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      transition: {
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    zoom: {
      initial: {
        opacity: 0,
        scale: 1.2,
        filter: "blur(10px)",
      },
      animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      },
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
      },
    },
    curtain: {
      initial: {
        clipPath: "inset(0 50% 0 50%)",
      },
      animate: {
        clipPath: "inset(0 0% 0 0%)",
      },
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    scan: {
      initial: {
        clipPath: "inset(0 0 100% 0)",
      },
      animate: {
        clipPath: "inset(0 0 0% 0)",
      },
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const selectedTransition = transitions[type];

  return (
    <>
      <motion.div
        initial={selectedTransition.initial}
        animate={
          isActive ? selectedTransition.animate : selectedTransition.initial
        }
        transition={selectedTransition.transition}
      >
        {children}
      </motion.div>
      {type === "tv" && isActive && (
        <motion.div
          className="fixed inset-0 z-9998 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 0.5, times: [0, 0.5, 1] }}
        >
          <div className="absolute inset-0 bg-white" />
        </motion.div>
      )}
    </>
  );
}
