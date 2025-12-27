"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpinnerLoader from "./loaders/SpinnerLoader";
import DotsLoader from "./loaders/DotsLoader";
import PulseLoader from "./loaders/PulseLoader";
import GridLoader from "./loaders/GridLoader";
import ProgressLoader from "./loaders/ProgressLoader";
import MorphLoader from "./loaders/MorphLoader";
import ParticleLoader from "./loaders/ParticleLoader";
import TransitionEffect, { TransitionType } from "./TransitionEffect";

const loaders = [
  SpinnerLoader,
  DotsLoader,
  PulseLoader,
  GridLoader,
  ProgressLoader,
  MorphLoader,
  ParticleLoader,
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
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 1000); // Delay to allow loader exit animation
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
      <div data-loader-wrapper>
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
      </div>
      <TransitionEffect isActive={showContent} type={transitionType}>
        {children}
      </TransitionEffect>
    </>
  );
}
