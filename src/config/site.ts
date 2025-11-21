// src/config/site.ts
export const siteConfig = {
  name: "Mango Blog",
  description: "개발자 망고의 기술 블로그 & 문서 허브",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/mango0422/mango-blog",
};
