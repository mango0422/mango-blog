// next.config.mjs
import nextra from "nextra";

const isGhPages = process.env.GITHUB_PAGES === '1'

const withNextra = nextra({
  search: { codeblocks: false },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "docs",
  reactStrictMode: true,
  images: { unoptimized: true },
  // Next 15.3+ 에서는 turbopack.resolveAlias 사용 :contentReference[oaicite:4]{index=4}
  turbopack: {
    resolveAlias: {
      // 루트에 둘 mdx-components.tsx 경로
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
  },
  basePath: isGhPages ? '/mango-blog' : '',
};

export default withNextra(nextConfig);
