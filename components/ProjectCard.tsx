"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Project } from "@/constants/types";
import { fadeInUp } from "@/constants/animations";

type PreviewPoint = { x: number; y: number };

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  /** `point` is set for keyboard focus, where there is no cursor to follow. */
  onPreviewStart: (point?: PreviewPoint) => void;
  onPreviewEnd: () => void;
}

export default function ProjectCard({
  project,
  onClick,
  onPreviewStart,
  onPreviewEnd,
}: ProjectCardProps) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 25%"],
  });
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const gradientPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 50%", "100% 50%"]
  );
  // SAFE colors: always visible
  const titleColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#D6D6D6", "#C9A86C"]
  );

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.35]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.article
      ref={ref}
      variants={fadeInUp}
      onClick={onClick}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onPreviewStart();
      }}
      onPointerLeave={onPreviewEnd}
      onFocus={(e) => {
        if (!e.currentTarget.matches(":focus-visible")) return;
        const rect = e.currentTarget.getBoundingClientRect();
        onPreviewStart({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      onBlur={onPreviewEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="
        group relative cursor-pointer
        border-[#1A1A1A]
        pt-8 pb-12
        focus:outline-none
        bg-transparent"
      role="listitem"
      tabIndex={0}
      aria-label={`${project.name} project details`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Title */}
        <div className="lg:col-span-4">
<div className="relative inline-block">
  {/* Base text (always readable) */}
  <h3
    className="
      relative z-10
      mt-3 text-2xl md:text-3xl font-light
      tracking-[-0.01em]
      text-[#D6D6D6]
    "
  >
    {project.name}
  </h3>

  {/* Gradient clipped text */}
  <motion.h3
    aria-hidden="true"
    className="
      absolute inset-0 z-20
      mt-3 text-2xl md:text-3xl font-light
      tracking-[-0.01em]
      bg-gradient-to-r
      from-[#C9A86C] via-[#E6C98B] to-[#C9A86C]
      bg-[length:200%_200%]
      bg-clip-text
      text-transparent
      pointer-events-none
    "
    style={{
      opacity: gradientOpacity,
      backgroundPosition: gradientPosition,
    }}
  >
    {project.name}
  </motion.h3>
</div>

        </div>

        {/* Description */}
        <div className="lg:col-span-8">
          <p className="text-[#8A8A85] leading-relaxed">
            {project.description}
          </p>
          <p className="mt-4 text-xs text-[#555] tracking-wider">
            {project.tech}
          </p>

          {project.stats && (
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-[11px] tracking-[0.15em] uppercase text-[#666]">
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-light text-[#C9A86C]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Touch devices have no hover: show the screenshot inline instead */}
          <img
            src={project.mockup}
            alt={project.mockupAlt}
            loading="lazy"
            decoding="async"
            className={`mt-6 aspect-[16/10] w-full rounded-xl border border-[#1A1A1A] object-cover pointer-fine:hidden ${
              project.imagePosition === "top" ? "object-top" : ""
            }`}
          />
        </div>
      </div>

      {/* Bottom accent (optional) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-0
          h-px w-full
          bg-[#1A1A1A]
        "
      >
        {/* Golden highlight */}
        <motion.div
          className="
            h-full
            bg-gradient-to-r from-[#C9A86C] via-[#E6C98B] to-[#C9A86C]
            origin-left
          "
          style={{
            scaleX: scrollYProgress,
            opacity: glowOpacity,
          }}
        />
      </div>

    </motion.article>
  );
}
