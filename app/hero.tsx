"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "../components/hero/BackgroundGrid";
import Hero3D from "../components/hero/Hero3D";
import { pageConfig } from "@/constants/pageConfig";
import { useHeroScroll } from "../hooks/useHeroScroll";

const variants = ["premium", "glass", "chrome", "stone", "aurora"] as const;

export default function AgencyHeroMorphThrowWithWrapText_Grid() {
  const { heroOpacity, heroScale, scrollRef } = useHeroScroll();
  const [variant, setVariant] = useState(pageConfig.defaultHeroVariant);

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative h-svh w-full overflow-hidden bg-[#0A0A0A]"
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

      <Hero3D scrollRef={scrollRef} variant={variant} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.62)_100%)]" />
      </div>

      <div className="pointer-events-none absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-3">
        <div className="w-px h-12 bg-linear-to-b from-transparent via-[#333] to-transparent" />
        <span className="text-xs tracking-widest uppercase text-[#555]">
          {pageConfig.strings.heroScrollHint}
        </span>
      </div>
    </motion.section>
  );
}
