/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // forza l’export statico
  images: { unoptimized: true }, // necessario per GH Pages
  basePath: '/', // se non usi custom domain
};

export default nextConfig;