// src/sqld/note.types.ts
import type {
  BaseContentMeta,
  Difficulty,
  Importance,
  LayoutType,
  SourceInfo,
} from "@/types/content";

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
  concept: SqldNoteConcept;
  source?: SourceInfo;
  question?: SqldNoteQuestion;
  myAnswer?: string;
  mistakeReason?: string;
  meta: SqldNoteMeta;
}
