import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"], // Add your allowed image domains here
  },
};

export default nextConfig;
