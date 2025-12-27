"use client";

import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  hasBorder?: boolean;
}

export default function Section({
  children,
  className = "",
  hasBorder = false,
}: SectionProps) {
  return (
    <section
      className={`py-32 md:py-48 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto ${
        hasBorder ? "border-t border-[#1A1A1A]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
