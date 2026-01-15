"use client";

import { motion } from "framer-motion";
import BackgroundGrid from "../components/hero/BackgroundGrid";
import Hero3D from "../components/hero/Hero3D";
import { pageConfig } from "@/constants/pageConfig";
import { useHeroScroll } from "../hooks/useHeroScroll";

export default function AgencyHeroMorphThrowWithWrapText_Grid() {
  const { heroOpacity, heroScale, scrollRef } = useHeroScroll();

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative h-svh w-full overflow-hidden bg-[#0A0A0A]"
      id="hero-content"
    >
      <BackgroundGrid />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="mx-auto grid h-full max-w-[1370px] grid-cols-1 items-center px-8 md:px-16 lg:grid-cols-12 lg:px-24">
          <div className="lg:col-span-7 pt-16 lg:pt-0">
            <div className="text-xs tracking-[0.22em] uppercase text-[#8A8A85] mb-4">
              {pageConfig.strings.hero.eyebrow}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.95] tracking-[-0.03em]">
              {pageConfig.strings.hero.title.line1}
              <br />
              {pageConfig.strings.hero.title.line2}

              <span className="text-[#C9A86C] italic font-light">
                {" "}
                {pageConfig.strings.hero.title.emphasis}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV !== "development" && (
        <Hero3D scrollRef={scrollRef} variant={pageConfig.defaultHeroVariant} />
      )}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.62)_100%)]" />
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-px h-14">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#666] to-transparent" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C9A86C] shadow-[0_0_12px_rgba(201,168,108,0.6)]"
            initial={{ opacity: 0.6, y: 0 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [0, 44, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <span className="text-xs tracking-widest uppercase text-[#999] font-light">
          {pageConfig.strings.heroScrollHint}
        </span>
      </motion.div>
    </motion.section>
  );
}
