"use client";

import { motion } from "framer-motion";
import { Project } from "@/constants/types";
import { scaleIn, fadeIn } from "@/constants/animations";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-full hover:bg-[#C9A86C] hover:border-[#C9A86C] hover:text-[#0A0A0A] transition-all duration-300"
          aria-label="Close project details"
        >
          <span className="text-sm font-medium">Close</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={project.mockup}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
          <div className="absolute bottom-8 left-8 md:left-12">
            <h2
              id="modal-title"
              className="text-4xl md:text-5xl font-light tracking-[-0.02em]"
            >
              {project.name}
            </h2>
            <p className="mt-2 text-[#C9A86C] text-sm tracking-wider uppercase">
              Case Study
            </p>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-[#C9A86C] rounded-full text-sm text-[#C9A86C] hover:bg-[#C9A86C] hover:text-[#0A0A0A] transition-all duration-300"
                aria-label="Visit project website"
              >
                <span>Visit Website</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <span className="text-xs tracking-widest uppercase text-[#555]">
                The Problem
              </span>
              <p className="mt-4 text-[#8A8A85] leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <span className="text-xs tracking-widest uppercase text-[#555]">
                The Solution
              </span>
              <p className="mt-4 text-[#8A8A85] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-8">
            <span className="text-xs tracking-widest uppercase text-[#555]">
              Impact
            </span>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[#1A1A1A] rounded-lg"
                >
                  <p className="text-2xl font-light text-[#C9A86C]">
                    {metric.split(" ")[0]}
                  </p>
                  <p className="mt-2 text-sm text-[#8A8A85]">
                    {metric.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-8">
            <span className="text-xs tracking-widest uppercase text-[#555]">
              Technology Stack
            </span>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm border border-[#2A2A2A] rounded-full text-[#8A8A85] hover:border-[#C9A86C] hover:text-[#C9A86C] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.testimonial && (
            <div className="border-t border-[#1A1A1A] pt-8">
              <span className="text-xs tracking-widest uppercase text-[#555]">
                Client Feedback
              </span>
              <blockquote className="mt-6 p-6 md:p-8 border-l-2 border-[#C9A86C] bg-[#0F0F0F]">
                <p className="text-lg md:text-xl font-light leading-relaxed text-[#F5F5F0]">
                  "{project.testimonial.quote}"
                </p>
                <footer className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                    <span className="text-sm font-medium text-[#C9A86C]">
                      {project.testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {project.testimonial.author}
                    </p>
                    <p className="text-xs text-[#555]">
                      {project.testimonial.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
