import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  // If you're having issues with image domains
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google profile images
      // Add any other domains you need for images
    ],
  },
};

export default nextConfig;
