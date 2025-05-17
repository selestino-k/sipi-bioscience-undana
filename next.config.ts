import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Updated to use remotePatterns instead of domains
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'si-inv-bioscience-image-bucket.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'si-inv-bioscience-image-bucket.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
