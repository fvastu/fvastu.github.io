"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import Section from "./Section";

export default function ApproachSection() {
  return (
    <Section hasBorder>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-4xl"
        id="about"
        aria-labelledby="about-heading"
      >
        <motion.span
          variants={fadeInUp}
          className="text-xs tracking-widest uppercase text-[#555]"
          id="about-heading"
        >
          Approach
        </motion.span>

        <motion.h2
          variants={fadeInUp}
          className="mt-8 text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-[-0.02em]"
        >
          I focus on building digital products that are{" "}
          <span className="text-[#C9A86C]">clear</span>,{" "}
          <span className="text-[#C9A86C]">usable</span>, and aligned with{" "}
          <span className="text-[#C9A86C]">real user needs</span>.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-8 text-xl text-[#8A8A85] font-light"
        >
          Technology is a tool, not the goal.
        </motion.p>
      </motion.div>
    </Section>
  );
}
