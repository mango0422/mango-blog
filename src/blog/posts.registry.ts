// NOTE: This module is server-only. Do not import in client components.

// src/blog/posts.registry.ts
import fs from "fs";
import path from "path";
import type { BlogPost, BlogPostMeta } from "./blog.types";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

// 1) 정적 메타 정의 (이름/카테고리/태그/생성일 등)
export const blogPostMetaList: BlogPostMeta[] = [
  {
    id: "part-1-modeling",
    slug: "part-1-modeling",
    title: "Part 1 요약노트 — 데이터 모델링의 이해 (SQLD 1과목 전반부)",
    category: "sqld",
    tags: ["모델링", "엔터티", "정규화"],
    createdAt: "2025-11-12T22:28:00+09:00",
    updatedAt: "2025-11-12T22:28:00+09:00",
    excerpt: "SQLD 1과목 전반부 데이터 모델링 핵심 요약.",
  },
  {
    id: "part-2-normalization",
    slug: "part-2-normalization",
    title: "Part 2 요약노트 — 정규화·관계·트랜잭션 심화 (SQLD 1과목 후반부)",
    category: "sqld",
    tags: ["정규화", "관계", "트랜잭션"],
    createdAt: "2025-11-12T22:28:00+09:00",
    updatedAt: "2025-11-12T22:28:00+09:00",
    excerpt: "정규화 심화, 관계, 트랜잭션에 대한 SQLD 요약.",
  },
  {
    id: "part-3-functions",
    slug: "part-3-functions",
    title: "Part 3 요약노트 — SQL 기본 및 함수 (SQLD 2과목 전반부)",
    category: "sqld",
    tags: ["함수", "SELECT", "RDBMS"],
    createdAt: "2025-11-12T22:29:00+09:00",
    updatedAt: "2025-11-12T22:29:00+09:00",
    excerpt: "SELECT 기본 구조와 함수들을 정리한 노트.",
  },
  {
    id: "part-4-advanced-sql",
    slug: "part-4-advanced-sql",
    title: "Part 4 요약노트 — WHERE~ORDER BY 및 고급 SQL (SQLD 2과목 후반부)",
    category: "sqld",
    tags: ["WHERE", "GROUP BY", "고급 SQL"],
    createdAt: "2025-11-13T11:42:00+09:00",
    updatedAt: "2025-11-13T11:42:00+09:00",
    excerpt: "WHERE, GROUP BY, 고급 SQL 문법 정리.",
  },
] as const satisfies BlogPostMeta[];

export type BlogSlug = (typeof blogPostMetaList)[number]["slug"];

export function getBlogPostMetaBySlug(
  slug: BlogSlug
): BlogPostMeta | undefined {
  return blogPostMetaList.find((p) => p.slug === slug);
}

export function getBlogPostBySlug(slug: BlogSlug): BlogPost | undefined {
  const meta = getBlogPostMetaBySlug(slug);
  if (!meta) return undefined;

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  const body = fs.readFileSync(filePath, "utf-8");

  return {
    ...meta,
    type: "blog-post",
    body,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPostMetaList
    .map((meta) => getBlogPostBySlug(meta.slug))
    .filter((p): p is BlogPost => !!p);
}
