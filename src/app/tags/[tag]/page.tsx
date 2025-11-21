// src/app/tags/[tag]/page.tsx
import { PostCard } from "nextra-theme-blog";
import { getBlogPosts, getBlogTags } from "../../posts/get-posts";
import { ComponentProps } from "react";

type TagParams = {
  tag: string;
};

type TagPageProps = {
  params: Promise<TagParams>;
};

type PostCardProps = ComponentProps<typeof PostCard>;
type NextraPost = PostCardProps["post"];

export async function generateStaticParams() {
  const allTags = await getBlogTags();
  return [...new Set(allTags)].map((tag) => ({ tag }));
}

export async function generateMetadata(props: TagPageProps) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);

  return {
    title: `Posts tagged with “${tag}”`,
  };
}

export default async function TagPage(props: TagPageProps) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  const { title } = await generateMetadata(props);
  const posts = await getBlogPosts();

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="space-y-4">
        {posts
          .filter((post) => post.frontMatter.tags?.includes(tag) ?? false)
          .map((post) => (
            <PostCard key={post.route} post={post as NextraPost} />
          ))}
      </div>
    </div>
  );
}
