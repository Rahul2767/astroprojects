/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true, // Skip linting during build
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during build
  },
};

module.exports = nextConfig;
