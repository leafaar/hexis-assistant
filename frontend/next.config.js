/** @type {import('next').NextConfig} */
const environment = process.env.NODE_ENV
const isDevelopment = environment === 'development';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: isDevelopment ? 'http://localhost:3001/auth/discord' : 'production url',
        permanent: false
      }
    ];
  },
}

module.exports = nextConfig
