/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avertissement au lieu d'erreur pendant le build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 