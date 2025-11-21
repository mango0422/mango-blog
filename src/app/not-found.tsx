// app/not-found.tsx
import Link from "next/link";
import { NotFoundPage } from "nextra-theme-docs";

export default function NotFound() {
  return (
    <NotFoundPage content="GitHub 이슈로 신고하기" labels="broken-link">
      <h1>404</h1>
      <h2>페이지를 찾을 수 없어요 🍪</h2>
      <p>아마도 제가 먹어버린 것 같습니다.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-mango-accent px-6 py-3 text-white font-cute hover:opacity-80 transition"
      >
        홈으로 돌아가기
      </Link>
    </NotFoundPage>
  );
}
