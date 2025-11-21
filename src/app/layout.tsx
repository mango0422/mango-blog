/* src/app/layout.tsx */
import "./globals.css";
import type { ReactNode } from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map"; // ✅ 공식 문서 API
import { siteConfig } from "@/config/site";
import { cuteFont, sansFont } from "./fonts";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Head } from "nextra/components"; // ✅ 문서에 언급된 Head 컴포넌트

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();

  const navbar = (
    <Navbar
      logo={
        <span className="font-semibold text-lg tracking-tight flex items-center gap-1">
          🍋 Mango<span className="text-primary-500">Blog</span>
        </span>
      }
      projectLink={siteConfig.github}
    />
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
      dir="ltr" // ✅ 문서 권장 사항
    >
      <Head>{/* 추가 메타 태그가 있다면 여기에 */}</Head>
      <body>
        <Layout
          pageMap={pageMap}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1,
          }}
          docsRepositoryBase={siteConfig.github}
          darkMode={false}
          navbar={navbar}
          footer={footer}
          // toc 옵션은 문서에 따라 props로 전달
          toc={{
            title: "On This Page", // 단순 문자열 권장
            // 커스텀 컴포넌트(ThemeSwitch)를 여기에 넣는 것은 문서 예제에 없음.
            // 필요하다면 sidebar나 navbar에 넣는 것을 권장.
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
