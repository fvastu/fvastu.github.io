import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // For static export/GitHub Pages
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
