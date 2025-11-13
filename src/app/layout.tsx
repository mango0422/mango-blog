// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "mango-blog",
  description: "SQLD 오답노트 & 개발 블로그",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-6">
          <header className="mb-6 flex items-center justify-between border-b border-slate-800 pb-3">
            <h1 className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-400">mango</span>
              <span className="text-slate-200">-blog</span>
            </h1>
            <nav className="flex gap-4 text-sm text-slate-400">
              <Link href="/" className="hover:text-slate-100">
                홈
              </Link>
              <Link href="/blog" className="hover:text-slate-100">
                블로그
              </Link>
              <Link href="/sqld" className="hover:text-slate-100">
                SQLD 오답노트
              </Link>
            </nav>
          </header>
          <main className="flex-1 pb-10">{children}</main>
          <footer className="border-t border-slate-900 pt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} mango blog
          </footer>
        </div>
      </body>
    </html>
  );
}
