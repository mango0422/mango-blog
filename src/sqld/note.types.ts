// src/sqld/note.types.ts
export type SqldCategory =
  | "데이터모델링"
  | "정규화"
  | "조인"
  | "인덱스"
  | "트랜잭션"
  | "성능튜닝"
  | "SQL기본"
  | "기타";

export type SqldTag =
  | "기출"
  | "개념"
  | "정의암기"
  | "실수자주나옴"
  | "헷갈리는개념"
  | "함수"
  | "튜닝포인트";

/**
 * layout:
 * - "note" (기본값): 문제 + 정답/내답 + 피드백 + 개념정리 (오답노트 스타일)
 * - "post": 개념정리/글 위주 블로그 포스트 스타일
 */
export type SqldLayout = "note" | "post";

export interface SqldNote {
  id: string;
  slug: string;
  title: string;

  category: SqldCategory;
  tags: SqldTag[];

  layout?: SqldLayout; // ← optional, 기본은 "note"

  source?: {
    examRound?: string;
    material?: string;
  };

  question?: {
    text: string;
    options?: string[];
    correctAnswer?: string;
  };

  myAnswer?: string;
  mistakeReason?: string;

  concept: {
    summary: string;
    explanation: string;
    examples?: string[];
  };

  meta: {
    difficulty: 1 | 2 | 3 | 4 | 5;
    importance: 1 | 2 | 3 | 4 | 5;
    reviewCount: number;
    lastReviewedAt?: string;
    nextReviewAt?: string;
  };

  createdAt: string;
  updatedAt: string;
}
