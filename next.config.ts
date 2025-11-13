import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  reactCompiler: true,
  experimental: {
    // 필요 시 여기에 실험 옵션 추가
  },
};

export default nextConfig;
