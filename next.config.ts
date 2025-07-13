import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Initialize config.externals if it's undefined
    if (!Array.isArray(config.externals)) {
      config.externals = [];
    }

    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "y7uhvuc8mc.ufs.sh"
    ]
  },
  devIndicators: false,
};

export default nextConfig;
