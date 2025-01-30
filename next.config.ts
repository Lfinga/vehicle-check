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
};

export default nextConfig;
