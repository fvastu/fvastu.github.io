"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/constants/processSteps";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import Section from "./Section";

export default function ProcessSection() {
  return (
    <Section hasBorder>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="process"
        aria-labelledby="process-heading"
      >
        <motion.span
          variants={fadeInUp}
          className="text-xs tracking-widest uppercase text-[#555]"
          id="process-heading"
        >
          Process
        </motion.span>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {processSteps.map((step) => (
            <motion.div key={step.number} variants={fadeInUp} className="group">
              <span className="text-6xl md:text-7xl font-extralight text-[#1A1A1A] group-hover:text-[#2A2A2A] transition-colors duration-500">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-light tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[#8A8A85] text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
