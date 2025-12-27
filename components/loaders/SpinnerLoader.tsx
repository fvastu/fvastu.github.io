"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function SpinnerLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-transparent border-t-[#C9A86C] rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5 - i * 0.3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              scale: 1 - i * 0.25,
            }}
          />
        ))}
      </motion.div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {pageConfig.strings.loaderTexts.spinner.subtitle}
      </motion.p>
    </div>
  );
}
