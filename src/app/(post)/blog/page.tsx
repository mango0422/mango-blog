// src/app/blog/page.tsx
import fs from "fs";
import path from "path";

export default async function BlogIndexPage() {
  const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
  const files = fs.readdirSync(POSTS_DIR);

  const posts = files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
    title: file.replace(/\.md$/, "").replace(/-/g, " "),
  }));

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">블로그 포스트</h1>

      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <a
              href={`/blog/${p.slug}`}
              className="text-emerald-300 hover:underline"
            >
              {p.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
