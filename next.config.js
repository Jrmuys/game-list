/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   swcMinify: true,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn.akamai.steamstatic.com',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'cdn.cloudflare.steamstatic.com',
            port: '',
            pathname: '/**',
         },
      ],
   },
};

module.exports = nextConfig;
