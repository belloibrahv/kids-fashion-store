/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'shopkiddieswearhouse.com' },
      { protocol: 'https', hostname: 'www.cartrollers.com' },
    ],
  },
};

export default nextConfig;
