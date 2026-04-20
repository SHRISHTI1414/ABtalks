const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  /**
   * Middleware runs on Edge. `jose`'s package `import` export targets the Node
   * build, which pulls Node APIs and crashes on Vercel (MIDDLEWARE_INVOCATION_FAILED).
   * Alias `jose` → browser bundle only for the Edge webpack graph (nextRuntime === 'edge').
   */
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        jose: path.join(
          __dirname,
          "node_modules",
          "jose",
          "dist",
          "browser",
          "index.js"
        ),
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

module.exports = nextConfig
