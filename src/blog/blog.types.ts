// src/blog/blog.types.ts
import type { BaseContentMeta, DateInfo } from "@/types/content";

export type BlogCategory = "sqld" | "정보처리기사" | "cs" | "dev" | "etc";

export interface BlogPostMeta extends BaseContentMeta, DateInfo {
  category: BlogCategory;
  excerpt?: string;
}

export interface BlogPost extends BlogPostMeta {
  type: "blog-post";
  // Markdown 원문 (파일에서 읽어서 넣거나, 나중에 import 구조로 대체 가능)
  body: string;
}
