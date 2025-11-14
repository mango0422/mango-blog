// src/types/content.ts
export type Tag = string;

export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Importance = 1 | 2 | 3 | 4 | 5;

export interface SourceInfo {
  examRound?: string;
  material?: string;
}

export interface DateInfo {
  createdAt: string; // ISO-8601 권장
  updatedAt: string; // createdAt과 같을 수 있음
}

export type LayoutType = "note" | "article";

export interface BaseContentMeta {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: Tag[];

  createdAt: string; // "2025-11-12T10:30:00+09:00" 이런 ISO 문자열
  updatedAt: string;
}
