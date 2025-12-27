"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useHeroScroll(): {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  scrollRef: React.MutableRefObject<number>;
} {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.97]);

  const scrollRef = useRef(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => (scrollRef.current = v));
  }, [scrollYProgress]);

  return { heroOpacity, heroScale, scrollRef };
}
