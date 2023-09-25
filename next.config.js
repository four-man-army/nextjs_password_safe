/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
