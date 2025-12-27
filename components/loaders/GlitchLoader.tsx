"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function GlitchLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <motion.div className="relative">
        <motion.div
          className="text-6xl font-light tracking-tight text-[#C9A86C]"
          animate={{
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {pageConfig.strings.loaderTexts.glitch.title}
        </motion.div>
        <motion.div
          className="absolute inset-0 text-6xl font-light tracking-tight text-[#8AD9FF]"
          animate={{
            x: [0, -2, 2, -1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 0.8,
          }}
        >
          {pageConfig.strings.loaderTexts.glitch.title}
        </motion.div>
        <motion.div
          className="absolute inset-0 text-6xl font-light tracking-tight text-[#FF88CC]"
          animate={{
            x: [0, 2, -2, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {pageConfig.strings.loaderTexts.glitch.title}
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {pageConfig.strings.loaderTexts.glitch.subtitle}
      </motion.p>
    </div>
  );
}
