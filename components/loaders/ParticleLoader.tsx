"use client";

import { motion } from "framer-motion";

export default function ParticleLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="relative w-40 h-40">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#C9A86C]"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-4px",
                marginTop: "-4px",
              }}
              animate={{
                x: [0, Math.cos((angle * Math.PI) / 180) * 60, 0],
                y: [0, Math.sin((angle * Math.PI) / 180) * 60, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      <motion.p
        className="mt-8 text-sm tracking-[0.2em] uppercase text-[#8A8A85]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Energizing experience
      </motion.p>
    </div>
  );
}
