import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: ['cdn.shade.cool', 'imagecdn.app'], // Added 'imagecdn.app'
  },
};

const isProd = process.env.NODE_ENV === 'production';

const config = isProd
  ? withPWA({
      dest: 'public',
      register: true,
      skipWaiting: true,
    })(nextConfig)
  : nextConfig;

export default config;
