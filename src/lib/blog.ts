// src/lib/blog.ts
import { getDirectoryPages } from "./nextra-pages";

export type BlogFrontMatter = {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
};

export type BlogPost = {
  name: string;
  route: string;
  frontMatter: BlogFrontMatter;
};

export function isBlogPost(value: unknown): value is BlogPost {
  if (!value || typeof value !== "object") return false;

  const v = value as {
    route?: unknown;
    frontMatter?: Record<string, unknown>;
    name?: unknown;
  };

  return (
    typeof v.route === "string" &&
    typeof v.name === "string" &&
    v.frontMatter != null &&
    typeof v.frontMatter.title === "string" &&
    typeof v.frontMatter.date === "string"
  );
}

export async function getBlogPosts(baseRoute = "/posts"): Promise<BlogPost[]> {
  const directories = await getDirectoryPages(baseRoute);
  const typed = (directories as unknown[]).filter(isBlogPost);

  return typed
    .filter((post) => post.name !== "index")
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
    );
}

export async function getBlogTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.flatMap((post) => post.frontMatter.tags ?? []);
}
