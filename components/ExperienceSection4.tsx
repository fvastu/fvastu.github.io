"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { experiences } from "@/constants/experience";
import { staggerContainer, fadeInUp } from "@/constants/animations";

export default function ExperienceSection4() {
  return (
    <Section hasBorder>
      <div className="space-y-32">
        {/* Minimal Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs tracking-widest uppercase text-[#555]"
          >
            Experience
          </motion.span>
          <div className="flex items-end justify-between border-b border-[#C9A86C]/20 pb-8 mt-8">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em]"
            >
              Professional Journey
            </motion.h2>
            <div className="w-2 h-2 rounded-full bg-[#C9A86C] shadow-[0_0_20px_rgba(201,168,108,0.6)]" />
          </div>
        </motion.div>

        {/* Minimal List */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="grid md:grid-cols-12 gap-6 items-start pb-12 border-b border-[#1A1A1A] hover:border-[#C9A86C]/20 transition-colors duration-500">
                {/* Year */}
                <div className="md:col-span-2 text-xs text-[#555] uppercase tracking-widest">
                  {exp.period.split(" - ")[0]}
                </div>

                {/* Role & Company */}
                <div className="md:col-span-6 space-y-2">
                  <h3 className="text-2xl font-light group-hover:text-[#C9A86C] transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#8A8A85]">{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm text-[#b3b3b3] mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div className="md:col-span-2 text-sm text-[#8A8A85] md:text-right">
                  {exp.duration}
                </div>

                {/* Skills indicator */}
                <div className="md:col-span-2 flex md:justify-end gap-1">
                  {exp.skills.slice(0, 3).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-1 h-8 bg-gradient-to-b from-[#C9A86C]/30 to-transparent"
                      style={{ opacity: 1 - idx * 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
            <div className="text-center space-y-3">
              <div className="text-5xl font-light">
                7<span className="text-[#D4AF37]">+</span>
              </div>
              <div className="text-xs text-[#4A4A4A] uppercase tracking-widest">
                Years
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-light">
                500<span className="text-[#D4AF37]">K</span>
              </div>
              <div className="text-xs text-[#4A4A4A] uppercase tracking-widest">
                Users
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-light">
                50<span className="text-[#D4AF37]">%</span>
              </div>
              <div className="text-xs text-[#4A4A4A] uppercase tracking-widest">
                Faster
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl font-light">
                3<span className="text-[#D4AF37]">×</span>
              </div>
              <div className="text-xs text-[#4A4A4A] uppercase tracking-widest">
                Markets
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
