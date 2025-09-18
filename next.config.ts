import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        '*.githubpreview.dev',
        '*.preview.app.github.dev'
      ]
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "img.clerk.com",
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;