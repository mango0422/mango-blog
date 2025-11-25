import { getBlogTags } from "@/lib/blog";
import Link from "next/link";

export default async function TagsPage() {
  const tags = await getBlogTags();
  const uniqueTags = Array.from(new Set(tags));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Tags</h1>

      <div className="flex flex-wrap gap-2">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 rounded-full bg-mango-accent/20 hover:bg-mango-accent/30 text-mango-accent transition"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
