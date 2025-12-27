"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpinnerLoader from "./loaders/SpinnerLoader";
import DotsLoader from "./loaders/DotsLoader";
import PulseLoader from "./loaders/PulseLoader";
import GridLoader from "./loaders/GridLoader";
import OrbitLoader from "./loaders/OrbitLoader";
import ProgressLoader from "./loaders/ProgressLoader";
import MorphLoader from "./loaders/MorphLoader";
import WaveLoader from "./loaders/WaveLoader";
import ParticleLoader from "./loaders/ParticleLoader";
import GlitchLoader from "./loaders/GlitchLoader";

const loaders = [
  SpinnerLoader,
  DotsLoader,
  PulseLoader,
  GridLoader,
  OrbitLoader,
  ProgressLoader,
  MorphLoader,
  WaveLoader,
  ParticleLoader,
  GlitchLoader,
];

export default function LoaderManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [LoaderComponent] = useState(() => {
    // Pick a random loader on mount
    return loaders[9];
  });

  useEffect(() => {
    // Simulate resource loading (fonts, 3D assets, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LoaderComponent />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: isLoading ? 0 : 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
