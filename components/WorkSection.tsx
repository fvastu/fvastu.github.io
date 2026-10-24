"use client";

import { motion, useMotionValue } from "framer-motion";
import { PointerEvent, useRef, useState } from "react";
import { projects } from "@/constants/projects";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import { Project } from "@/constants/types";
import ProjectCard from "./ProjectCard";
import ProjectHoverPreview from "./ProjectHoverPreview";
import Section from "./Section";

interface WorkSectionProps {
  onProjectClick: (project: Project) => void;
}

export default function WorkSection({ onProjectClick }: WorkSectionProps) {
  const [activeName, setActiveName] = useState<string | null>(null);
  // Screenshots are preloaded once the list is in view, and only for mouse users:
  // touch devices see the inline thumbnail in each card instead.
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const previewRef = useRef<HTMLDivElement>(null);

  // The preview sits centered above the cursor: clamp so it never leaves the viewport.
  const movePreview = (clientX: number, clientY: number) => {
    const halfWidth = (previewRef.current?.offsetWidth ?? 0) / 2;
    const height = previewRef.current?.offsetHeight ?? 0;
    const gutter = 16;
    const cursorGap = 24; // matches the 1.5rem offset in ProjectHoverPreview
    x.set(
      Math.min(
        Math.max(clientX, halfWidth + gutter),
        window.innerWidth - halfWidth - gutter
      )
    );
    y.set(Math.max(clientY, height + cursorGap + gutter));
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") movePreview(e.clientX, e.clientY);
  };

  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        onViewportEnter={() =>
          setIsPreviewEnabled(window.matchMedia("(pointer: fine)").matches)
        }
        id="work"
        aria-labelledby="work-heading"
      >
        <motion.div variants={fadeInUp} className="mb-20">
          <span className="text-xs tracking-widest uppercase text-[#555]">
            Selected Work
          </span>
          <h2
            id="work-heading"
            className="mt-4 text-3xl md:text-4xl font-light tracking-[-0.02em]"
          >
            Products I've shaped
          </h2>
        </motion.div>

        <div
          className="space-y-8"
          role="list"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setActiveName(null)}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onClick={() => onProjectClick(project)}
              onPreviewStart={(point) => {
                if (point) movePreview(point.x, point.y);
                setActiveName(project.name);
              }}
              onPreviewEnd={() =>
                setActiveName((current) =>
                  current === project.name ? null : current
                )
              }
            />
          ))}
        </div>
      </motion.div>

      {isPreviewEnabled && (
        <ProjectHoverPreview
          projects={projects}
          activeName={activeName}
          x={x}
          y={y}
          previewRef={previewRef}
        />
      )}
    </Section>
  );
}
