/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      // Unsplash — used by mock app data
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Picsum Photos — used by mock app data
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // DiceBear — used by mock avatar/icon placeholders
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
