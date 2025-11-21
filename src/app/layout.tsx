import "./globals.css";
import type { ReactNode } from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { normalizePages } from "nextra/normalize-pages"; // ✅ 핵심 유틸리티
import { siteConfig } from "@/config/site";
import { cuteFont, sansFont } from "./fonts";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import Link from "next/link";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1. 전체 페이지 맵 가져오기
  const pageMap = await getPageMap();

  // 2. 현재 경로("/") 기준으로 데이터를 정규화하여 '최상위 메뉴' 추출
  // docs, posts, til 등 _meta.json에 정의된 최상위 항목들이 담깁니다.
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: "/",
  });

  const navbar = (
    <Navbar
      logo={
        <span className="font-semibold text-lg tracking-tight flex items-center gap-1">
          🍋 Mango<span className="text-primary-500">Blog</span>
        </span>
      }
      projectLink={siteConfig.github}
    >
      {/* ✅ 동적 메뉴 생성 구간 */}
      <div className="max-md:hidden flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300 items-center ml-4">
        {topLevelNavbarItems.map((item) => {
          // _meta.json에서 "display: hidden"으로 설정한 항목(예: index)은
          // normalizePages가 자동으로 걸러주거나 제외 처리를 돕습니다.
          // 혹시라도 'index'가 포함된다면 route가 비어있거나 '/'일 수 있으니 조건 처리 가능하지만,
          // 보통 _meta.json 설정대로 나옵니다.

          if ("href" in item && item.href) {
            const safeHref = item.href; // 여기서는 string으로 좁혀짐
            const key = safeHref ?? item.title;
            // 외부 링크인 경우
            return (
              <Link
                key={key}
                href={safeHref}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary-500 transition-colors font-cute"
                aria-label={`${key} 페이지로 이동`}
              >
                {item.title}
              </Link>
            );
          }

          // 2) 내부 페이지/폴더 링크 (route 존재)
          if ("route" in item && item.route) {
            const safeRoute = item.route; // 여기서도 string 확정
            return (
              <Link
                key={safeRoute}
                href={safeRoute}
                className="hover:text-primary-500 transition-colors font-cute"
                aria-label={`${safeRoute} 페이지로 이동`}
              >
                {item.title}
              </Link>
            );
          }

          // 3) 그 외 예외 케이스는 렌더링하지 않음
          return null;
        })}
      </div>
    </Navbar>
  );

  const footer = (
    <Footer>
      <div className="text-sm text-gray-500 font-cute">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </Footer>
  );

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${cuteFont.variable} ${sansFont.variable}`}
    >
      <body>
        <Layout
          pageMap={pageMap}
          sidebar={{ autoCollapse: true }}
          docsRepositoryBase={siteConfig.github}
          darkMode={false}
          navbar={navbar}
          footer={footer}
          toc={{
            title: (
              <div className="nx-flex nx-items-center nx-justify-between nx-gap-2">
                <span className="nx-text-xs nx-font-semibold nx-uppercase nx-tracking-wide font-cute">
                  On This Page
                </span>
                <ThemeSwitch />
              </div>
            ),
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
