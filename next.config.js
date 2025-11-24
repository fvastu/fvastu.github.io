/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // forza l'export statico
  images: { unoptimized: true }, // necessario per GH Pages
  // basePath: '/home', // removed - not needed for root domain
};

export default nextConfig;