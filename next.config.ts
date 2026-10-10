import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Next.js configuration without experimental prefetching/caching conflicts
  typescript: {
    // Allows production builds to complete even if minor type warnings exist
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;