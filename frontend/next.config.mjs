/** @type {import('next').NextConfig} */
const nextConfig = {
  // The portfolio has no request-time data, so every route is emitted as files.
  output: 'export',
  images: { unoptimized: true },
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
