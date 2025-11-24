/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // forza l’export statico
  images: { unoptimized: true }, // necessario per GH Pages
  basePath: '/home', // se non usi custom domain
};

export default nextConfig;