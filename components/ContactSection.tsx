"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/constants/animations";
import Section from "./Section";

export default function ContactSection() {
  return (
    <Section hasBorder>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-2xl"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-[-0.02em]"
          id="contact-heading"
        >
          Have an idea or product worth building?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-xl text-[#8A8A85] font-light"
        >
          Let's explore it together.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-12">
          <a
            href="mailto:f.vasturzo@live.it?subject=Project Inquiry"
            className="group relative inline-block px-10 py-5 bg-[#C9A86C] rounded-full overflow-hidden transition-all duration-500 hover:bg-[#D4B87A]"
            aria-label="Contact Francesco Vasturzo via email"
          >
            <span className="relative z-10 text-sm tracking-widest uppercase font-medium text-[#0A0A0A]">
              Get in touch
            </span>
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}
