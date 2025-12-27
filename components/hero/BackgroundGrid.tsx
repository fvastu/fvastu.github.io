"use client";

import React from "react";

/** Thin shaded grid + soft scanline noise via CSS (cheap + premium). */
export default function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,245,240,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,245,240,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)",
        }}
      />
      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(245,245,240,0.08), rgba(245,245,240,0.02) 1px, transparent 2px)",
          backgroundSize: "100% 10px",
          mixBlendMode: "soft-light",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
        }}
      />
      {/* subtle top-left glow */}
      <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#C9A86C]/[0.05] blur-3xl" />
    </div>
  );
}
