// src/app/(post)/blog/page.tsx
import { getAllBlogPosts } from "@/blog/posts.registry";
import Link from "next/link";
import { TagPill } from "@/components/sqld/TagPill";
import { Card } from "@/components/common/Card";

export default async function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-4 space-y-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-50">블로그 포스트</h1>
        <p className="text-sm text-slate-400">
          SQLD 요약노트부터 개발 관련 글까지, 공부하면서 정리한 내용을 모아둔
          공간입니다.
        </p>
      </header>

      <section className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id}>
            <header className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-50">
                <Link href={`/blog/${post.slug}`}>
                  <span className="underline-offset-4 group-hover:underline">
                    {post.title}
                  </span>
                </Link>
              </h2>
              <span className="text-[11px] text-emerald-300">
                {post.category}
              </span>
            </header>

            {post.excerpt && (
              <p className="mb-2 line-clamp-2 text-xs text-slate-300">
                {post.excerpt}
              </p>
            )}

            <div className="mb-2 flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>

            <footer className="flex items-center justify-between text-[11px] text-slate-500">
              <span>
                작성{" "}
                {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
              {post.updatedAt !== post.createdAt && (
                <span>
                  수정{" "}
                  {new Date(post.updatedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              )}
            </footer>
          </Card>
        ))}
      </section>
    </main>
  );
}
