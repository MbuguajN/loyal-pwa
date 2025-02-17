/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the PWA files
  disable: false,
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker to activate
});

const nextConfig: NextConfig = {
  
};

module.exports = withPWA({
  // Your existing Next.js configuration
  reactStrictMode: true,
});

export default nextConfig;
