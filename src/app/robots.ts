import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 필요한 경우 관리자 페이지 등은 disallow 처리
      // disallow: '/private/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`, // Nextra가 자동으로 sitemap을 생성한다면 해당 경로 지정
  };
}
