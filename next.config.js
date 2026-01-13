/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['arxiv.org', 'ieee.org', 'acm.org'],
  },
}

module.exports = nextConfig
