"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function GridLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-sm bg-[#C9A86C]"
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: (i % 3) * 0.2 + Math.floor(i / 3) * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {pageConfig.strings.loaderTexts.grid.subtitle}
      </motion.p>
    </div>
  );
}
