"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "../components/hero/BackgroundGrid";
import Hero3D from "../components/hero/Hero3D";
import { useHeroScroll } from "../hooks/useHeroScroll";

const variants = ["premium", "glass", "chrome", "stone", "aurora"] as const;

type VariantType = (typeof variants)[number];

export default function AgencyHeroMorphThrowWithWrapText_Grid() {
  const { heroOpacity, heroScale, scrollRef } = useHeroScroll();
  const [variant, setVariant] = useState<VariantType>("chrome");

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative h-svh w-full overflow-hidden bg-[#0A0A0A]"
    >
      <BackgroundGrid />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="mx-auto grid h-full max-w-[1370px] grid-cols-1 items-center px-8 md:px-16 lg:grid-cols-12 lg:px-24">
          <div className="lg:col-span-7 pt-16 lg:pt-0">
            <div className="text-xs tracking-[0.22em] uppercase text-[#8A8A85]">
              Product UI • Systems • Shipping
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.95] tracking-[-0.03em]">
              I craft digital
              <br />
              experiences that
              <br />
              <span className="text-[#C9A86C] italic font-light">matter</span>
            </h1>
          </div>
        </div>
        {/* Variant Selector */}
        <div className="pointer-events-auto absolute top-6 right-6 md:right-16 lg:right-24 flex gap-2 bg-[#0A0A0A]/70 backdrop-blur-sm border border-[#1A1A1A] rounded-full px-3 py-2">
          {variants.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`text-[10px] md:text-xs tracking-[0.15em] uppercase px-2 md:px-3 py-1 rounded-full transition-colors duration-200 ${
                variant === v
                  ? "bg-[#C9A86C] text-[#0A0A0A]"
                  : "text-[#8A8A85] hover:text-[#F5F5F0]"
              }`}
              aria-pressed={variant === v}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <Hero3D scrollRef={scrollRef} variant={variant} />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.62)_100%)]" />
      </div>

      <div className="pointer-events-none absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-3">
        <div className="w-px h-12 bg-linear-to-b from-transparent via-[#333] to-transparent" />
        <span className="text-xs tracking-widest uppercase text-[#555]">
          Scroll
        </span>
      </div>
    </motion.section>
  );
}
