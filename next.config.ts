import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.VERCEL ? ".next" : ".next-local",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
