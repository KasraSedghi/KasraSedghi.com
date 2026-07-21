import type { NextConfig } from "next";

// Static export: GitHub Pages serves plain files, no Node runtime available.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // next/image optimization needs a server; export can't run one
  },
  trailingSlash: true, // avoids GitHub Pages 404s on /about vs /about/
};

export default nextConfig;
