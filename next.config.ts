import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // For static export/GitHub Pages
    unoptimized: true,
  },
  output: "export",
  eslint: {
    // Avoid blocking builds due to lint in CI; run lint separately
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
