// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import { getBlogPosts } from "../posts/get-posts";
import { siteConfig } from "@/config/site";

const SITE_URL = siteConfig.url; // 실제 도메인으로 수정

export async function GET() {
  const posts = await getBlogPosts();

  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.frontMatter.title}]]></title>
        <link>${SITE_URL}${post.route}</link>
        <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
        <description><![CDATA[${
          post.frontMatter.description ?? ""
        }]]></description>
      </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>{siteConfig.name}</title>
      <link>${SITE_URL}</link>
      <description>{siteConfig.description} RSS</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
