/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['fglapqpkzzqcrqwbjpft.supabase.co'],
    unoptimized: true,
  },
  experimental: {
    serverActions: true
  },
  typescript: {
    // !! WARN !!
    // 프로덕션에서는 이 옵션을 false로 설정하세요!
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // 프로덕션에서는 이 옵션을 false로 설정하세요!
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
