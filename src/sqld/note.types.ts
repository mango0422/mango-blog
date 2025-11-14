// src/sqld/note.types.ts
import type {
  BaseContentMeta,
  Difficulty,
  Importance,
  LayoutType,
  SourceInfo,
} from "@/types/content";

export type SqldCategory = "정규화" | "모델링" | "함수" | "SQL기본" | "기타";

export type SqldTag = string;

export interface SqldNoteConcept {
  summary: string;
  explanation: string;
  examples?: string[];
}

export interface SqldNoteQuestion {
  text: string;
  options?: string[];
  correctAnswer?: string;
}

// ✅ DateInfo 상속 제거, 실제 meta 구조에 맞게 정의
export interface SqldNoteMeta {
  difficulty: Difficulty;
  importance: Importance;
  reviewCount?: number;
  lastReviewedAt?: string;
  nextReviewAt?: string;
}

export interface SqldNote extends BaseContentMeta {
  type: "sqld-note";
  layout?: LayoutType;

  // 여기서 좁혀주면 BaseContentMeta.category: string 보다 더 구체적으로 사용 가능
  category: SqldCategory;
  tags: SqldTag[];

  concept: SqldNoteConcept;
  source?: SourceInfo;
  question?: SqldNoteQuestion;
  myAnswer?: string;
  mistakeReason?: string;
  meta: SqldNoteMeta;
}
