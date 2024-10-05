import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Add this section to configure Auth.js
  auth: {
    trustHost: true,
    providers: [],
  },
};

const config = withPWA({
  dest: 'public',
  disable: false, // Enable PWA in both development and production
  register: true,
  skipWaiting: true,
})(nextConfig);

export default config;
