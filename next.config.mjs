/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "ldw366cauu.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
