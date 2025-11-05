import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev) {
      // Watch content directory for changes in development
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
      };
    }
    return config;
  }
};

export default nextConfig;
