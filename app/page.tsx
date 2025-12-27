import Script from "next/script";
import AgencyHeroMorphLoopDragOneComponent from "./hero";
import ApproachSection from "@/components/ApproachSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import { generateStructuredData } from "@/constants/structuredData";
import { pageConfig } from "@/constants/pageConfig";
import ClientPageWrapper from "@/components/ClientPageWrapper";

export default function Index() {
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
        <ClientPageWrapper />
        {pageConfig.sections.approach && <ApproachSection />}
        {pageConfig.sections.process && <ProcessSection />}
        {pageConfig.sections.contact && <ContactSection />}
      </div>
    </>
  );
}
