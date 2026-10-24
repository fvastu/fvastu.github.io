"use client";

import { motion, MotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Ref } from "react";
import { Project } from "@/constants/types";

interface ProjectHoverPreviewProps {
  projects: Project[];
  activeName: string | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** Measured by the parent to keep the preview inside the viewport. */
  previewRef: Ref<HTMLDivElement>;
}

const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

/**
 * Floating screenshot that trails the cursor over the work list. It sits above
 * the cursor so it never covers the row being read.
 * Only shown on fine pointers; touch devices get the inline thumbnail in ProjectCard.
 * All screenshots stay mounted so switching between rows is instant.
 */
export default function ProjectHoverPreview({
  projects,
  activeName,
  x,
  y,
  previewRef,
}: ProjectHoverPreviewProps) {
  const reduceMotion = useReducedMotion();
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const isVisible = activeName !== null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden pointer-fine:block"
      style={{ x: reduceMotion ? x : springX, y: reduceMotion ? y : springY }}
    >
      <motion.div
        ref={previewRef}
        className="project-preview relative -translate-x-1/2 -translate-y-[calc(100%+1.5rem)] overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#111]"
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible || reduceMotion ? 1 : 0.92,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {projects.map((project) => (
          <img
            key={project.name}
            src={project.mockup}
            alt=""
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              project.imagePosition === "top" ? "object-top" : ""
            } ${project.name === activeName ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
