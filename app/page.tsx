"use client";

import { useState } from "react";
import Script from "next/script";
import AgencyHeroMorphLoopDragOneComponent from "./hero";
import WorkSection from "@/components/WorkSection";
import ApproachSection from "@/components/ApproachSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/constants/types";
import { generateStructuredData } from "@/constants/structuredData";
import { pageConfig } from "@/constants/pageConfig";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const structuredData = generateStructuredData();

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className={pageConfig.wrapperClass}>
        {pageConfig.sections.hero && <AgencyHeroMorphLoopDragOneComponent />}
        {pageConfig.sections.work && (
          <WorkSection onProjectClick={setSelectedProject} />
        )}
        {pageConfig.sections.approach && <ApproachSection />}
        {pageConfig.sections.process && <ProcessSection />}
        {pageConfig.sections.contact && <ContactSection />}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </>
  );
};

export default Index;
