import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // For static export/GitHub Pages
    unoptimized: true,
  },
  output: "export",
  // Security headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
        },
      ],
    },
  ],
};

export default nextConfig;
