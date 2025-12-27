"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/constants/projects";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import { Project } from "@/constants/types";
import ProjectCard from "./ProjectCard";
import Section from "./Section";

interface WorkSectionProps {
  onProjectClick: (project: Project) => void;
}

export default function WorkSection({ onProjectClick }: WorkSectionProps) {
  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
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

        <div className="space-y-8" role="list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
