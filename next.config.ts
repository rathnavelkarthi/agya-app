import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  // reactCompiler: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
