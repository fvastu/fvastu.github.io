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
import TransitionEffect, { TransitionType } from "./TransitionEffect";

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
  transitionType = "tv",
}: {
  children: React.ReactNode;
  transitionType?: TransitionType;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [LoaderComponent] = useState(() => {
    // Pick a random loader on mount
    return loaders[Math.floor(Math.random() * loaders.length)];
  });

  useEffect(() => {
    const onHeroLoaded = () => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 600);
    };

    // Listen for hero load event
    window.addEventListener("hero3d-loaded", onHeroLoaded);

    // Fallback: in case event doesn't fire (no async assets), auto-complete after 5s
    const fallback = setTimeout(onHeroLoaded, 5000);

    return () => {
      window.removeEventListener("hero3d-loaded", onHeroLoaded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <LoaderComponent />
          </motion.div>
        )}
      </AnimatePresence>
      <TransitionEffect isActive={showContent} type={transitionType}>
        {children}
      </TransitionEffect>
    </>
  );
}
