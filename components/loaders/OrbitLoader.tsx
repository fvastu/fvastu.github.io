"use client";

import { motion } from "framer-motion";
import { pageConfig } from "@/constants/pageConfig";

export default function OrbitLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="relative w-32 h-32">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-[#C9A86C]"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-8px",
                marginLeft: "-8px",
              }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * 50,
                y: Math.sin((angle * Math.PI) / 180) * 50,
              }}
            />
          ))}
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-6 h-6 rounded-full bg-[#C9A86C]/50" />
        </motion.div>
      </div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {pageConfig.strings.loaderTexts.orbit.subtitle}
      </motion.p>
    </div>
  );
}
