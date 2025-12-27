"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function ProgressLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="w-64">
        <div className="h-0.5 bg-[#1A1A1A] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-[#C9A86C] to-[#FFD28A]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <motion.div
          className="mt-4 flex justify-between text-xs tracking-wider uppercase text-[#555]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>{pageConfig.strings.loaderTexts.progress.title}</span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {pageConfig.strings.loaderTexts.progress.status ?? "Please wait..."}
          </motion.span>
        </motion.div>
      </div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {pageConfig.strings.loaderTexts.progress.subtitle}
      </motion.p>
    </div>
  );
}
