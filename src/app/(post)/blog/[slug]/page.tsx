// src/app/(post)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginatedMarkdown } from "@/components/blog/PaginatedMarkdown";
import {
  blogPostMetaList,
  getBlogPostBySlug,
  type BlogSlug,
} from "@/blog/posts.registry";

type Params = { slug: BlogSlug };

interface BlogPageProps {
  params: Promise<Params>;
}

// ✅ SSG용: 정적 파라미터 생성
export async function generateStaticParams(): Promise<Params[]> {
  return blogPostMetaList.map((p) => ({ slug: p.slug }));
}

// ✅ 각 포스트별 메타데이터 생성 (title/description 등)
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | mango-blog`,
    description: post.excerpt ?? `${post.title} - SQLD 요약노트`,
  };
}

// ✅ 실제 페이지 컴포넌트
export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const created = new Date(post.createdAt);
  const updated = new Date(post.updatedAt);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-4 space-y-6">
      <header className="space-y-3 border-b border-slate-800 pb-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold text-slate-50">{post.title}</h1>
          <span className="text-xs text-emerald-300">{post.category}</span>
        </div>

        <div className="flex flex-wrap gap-1 text-xs">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-900/80 px-2 py-0.5 text-slate-200 ring-1 ring-slate-700/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>
            작성{" "}
            {created.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
          {post.updatedAt !== post.createdAt && (
            <span>
              · 수정{" "}
              {updated.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          )}
        </div>
      </header>

      <PaginatedMarkdown raw={post.body} />
    </main>
  );
}
