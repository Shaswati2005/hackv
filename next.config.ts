// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, // prevent client-side canvas import
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
