// src/app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { PaginatedMarkdown } from "@/components/blog/PaginatedMarkdown";

interface Params {
  slug: string;
}

interface BlogPageProps {
  params: Promise<Params>;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_DIR);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const firstLine = raw.split("\n")[0] ?? "";
  const title = firstLine.replace(/^#\s*/, "").trim() || slug;

  return {
    title: `${title} | mango-blog`,
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-4">
      <h1 className="mb-4 text-xl font-bold text-slate-50">
        {/* 제목은 Markdown 안에도 있으니, 여기선 slug로 대체하거나 생략 가능 */}
        {slug}
      </h1>
      <PaginatedMarkdown raw={raw} />
    </main>
  );
}
