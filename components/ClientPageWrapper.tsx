"use client";

import { useState } from "react";
import WorkSection from "./WorkSection";
import ProjectModal from "./ProjectModal";
import { Project } from "@/constants/types";
import { pageConfig } from "@/constants/pageConfig";

export default function ClientPageWrapper() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!pageConfig.sections.work) return null;

  return (
    <>
      <WorkSection onProjectClick={setSelectedProject} />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
