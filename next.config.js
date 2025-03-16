/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avertissement au lieu d'erreur pendant le build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lottie.host'],
  },
  trailingSlash: true,
};

module.exports = nextConfig; 