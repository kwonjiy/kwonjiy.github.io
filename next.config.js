/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['fglapqpkzzqwbjpft.supabase.co'],
    unoptimized: true,
  },
  typescript: {
    // 타입 체크를 비활성화합니다.
    // 프로덕션에서는 이 옵션을 false로 설정하세요!
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 체크를 비활성화합니다.
    // 프로덕션에서는 이 옵션을 false로 설정하세요!
    ignoreDuringBuilds: true,
  },
  basePath: '/komji-blog',
}

module.exports = nextConfig
