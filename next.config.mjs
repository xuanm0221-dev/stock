/** @type {import('next').NextConfig} */
const nextConfig = {
  // yahoo-finance2 는 서버 전용 패키지 → 번들에서 제외
  serverExternalPackages: ['yahoo-finance2'],
};

export default nextConfig;
