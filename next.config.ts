import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lsehxbtdvpvpnlfwmvsq.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '8mb'
    },
  },
};

export default nextConfig;
