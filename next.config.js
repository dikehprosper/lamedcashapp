/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/groupchat-d6de7.appspot.com/o/**',
      },{
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/groupchat-d6de7.appspot.com/profileImages/**',
      },
    ]
  },
};

module.exports = withNextIntl(nextConfig);
