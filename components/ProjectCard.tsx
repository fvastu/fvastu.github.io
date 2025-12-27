"use client";

import { motion } from "framer-motion";
import { Project } from "@/constants/types";
import { fadeInUp } from "@/constants/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative border-t border-[#1A1A1A] pt-8 pb-12 cursor-pointer"
      role="listitem"
      tabIndex={0}
      aria-label={`${project.name} project details`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <span
            className="text-xs text-[#555] tracking-wider"
            aria-hidden="true"
          >
            0{index + 1}
          </span>
          <h3 className="mt-2 text-2xl md:text-3xl font-light tracking-[-0.01em] group-hover:text-[#C9A86C] transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        <div className="lg:col-span-5">
          <p className="text-[#8A8A85] leading-relaxed">
            {project.description}
          </p>
          <p className="mt-4 text-xs text-[#555] tracking-wider">
            {project.tech}
          </p>
        </div>

        <div className="lg:col-span-3 flex items-start lg:justify-end">
          <span className="px-4 py-2 text-xs border border-[#2A2A2A] rounded-full text-[#8A8A85]">
            {project.outcome}
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A86C] group-hover:w-full transition-all duration-700"
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
