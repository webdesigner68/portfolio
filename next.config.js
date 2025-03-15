/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avertissement au lieu d'erreur pendant le build
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig; 