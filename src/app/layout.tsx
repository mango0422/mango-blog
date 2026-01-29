import { ThemeSwitch } from "@/components/ThemeSwitch";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { ReactNode } from "react";
import { cuteFont, sansFont } from "./fonts";
import "./globals.css";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

/**
 * FOUC 방지를 위한 인라인 스크립트
 * - localStorage에서 테마를 읽어 즉시 적용
 * - beforeInteractive로 HTML 파싱 전에 실행
 */
const VALID_THEMES = [
  "blue-hour",
  "neon-interior",
  "sunset-boulevard",
  "dawn-freeway",
  "jazz-bordeaux",
  "studio-teal-orange",
  "desert-dusk",
  "pastel-night",
];

const themeInitScript = `
(function() {
  try {
    var validThemes = ${JSON.stringify(VALID_THEMES)};
    var theme = localStorage.getItem('mango-theme');
    if (theme && validThemes.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.setAttribute('data-theme', 'blue-hour');
    }
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'blue-hour');
  }
})();
`;

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
          <span>🍋</span>
          <span>Mango</span>
          <span className="hidden sm:inline text-accent">Blog</span>
        </span>
      }
      projectLink={siteConfig.github}
    >
      <ThemeSwitch />
    </Navbar>
  );

  const footer = (
    <Footer>
      <div className="text-sm text-text-muted font-cute">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </Footer>
  );

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${cuteFont.variable} ${sansFont.variable}`}
      dir="ltr"
      data-theme="blue-hour"
    >
      <Head />
      <body className="theme-transition">
        {/* FOUC 방지: 페이지 렌더링 전 테마 적용 */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Layout
          pageMap={pageMap}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1,
            toggleButton: true,
          }}
          docsRepositoryBase={siteConfig.github}
          darkMode={false}
          navbar={navbar}
          footer={footer}
          toc={{
            title: "On This Page",
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
