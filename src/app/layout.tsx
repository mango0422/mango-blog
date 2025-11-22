import "./globals.css";
import type { ReactNode } from "react";
import { Layout, Navbar, Footer } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { siteConfig } from "@/config/site";
import { cuteFont, sansFont } from "./fonts";
import { Head } from "nextra/components";
import { ThemeSwitch } from "@/components/ThemeSwitch";

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
          <span>🍋</span>
          <span>Mango</span>
          <span className="hidden sm:inline text-primary-500">Blog</span>
        </span>
      }
      projectLink={siteConfig.github}
    >
      {/* ✅ Navbar 우측에 테마 스위치 배치 */}
      <ThemeSwitch />
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
      dir="ltr"
    >
      <Head />
      <body>
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
