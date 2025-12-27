"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function MorphLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <motion.div
        className="w-24 h-24 bg-[#C9A86C]"
        animate={{
          borderRadius: ["20%", "50%", "20%"],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {pageConfig.strings.loaderTexts.morph.subtitle}
      </motion.p>
    </div>
  );
}
