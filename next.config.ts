import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URLs from the previous static portfolio, so old links and indexed pages don't 404.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/documents/:path*", destination: "/:path*", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
