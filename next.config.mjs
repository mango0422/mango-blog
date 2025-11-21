// next.config.mjs
import nextra from "nextra";

const withNextra = nextra({
  // 검색 엔진(Pagefind) 설정 – 코드블록은 검색 제외 예시
  // 필요 없으면 search: true 로 두거나 아예 옵션 제거해도 됨
  search: { codeblocks: false }, // :contentReference[oaicite:3]{index=3}
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 15.3+ 에서는 turbopack.resolveAlias 사용 :contentReference[oaicite:4]{index=4}
  turbopack: {
    resolveAlias: {
      // 루트에 둘 mdx-components.tsx 경로
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
  },
};

export default withNextra(nextConfig);
