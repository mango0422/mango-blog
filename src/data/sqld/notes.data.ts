// data/sqld/notes.data.ts
import type { SqldNote } from "@/sqld/note.types";

export const sqldNotes: SqldNote[] = [
  {
    id: "2024-2-NORM-01",
    slug: "normalization-3nf-vs-bcnf",
    title: "제3정규형과 BCNF의 차이 정리",
    category: "정규화",
    tags: ["기출", "개념", "헷갈리는개념"],
    layout: "note",
    source: {
      examRound: "2024-2",
      material: "공식 교재 3장 정규화",
    },
    question: {
      text: "다음 중 BCNF에 대한 설명으로 옳지 않은 것은?",
      options: [
        "모든 결정자가 후보키인 정규형이다.",
        "제3정규형보다 더 엄격한 정규형이다.",
        "부분 함수 종속을 제거한다.",
        "이행 함수 종속을 제거한다.",
      ],
      correctAnswer: "3",
    },
    myAnswer: "4",
    mistakeReason:
      '3NF와 BCNF의 차이를 애매하게 기억해서, 눈에 익은 문장인 "이행 함수 종속 제거"를 정답으로 착각함.',
    concept: {
      summary:
        "BCNF는 모든 결정자가 후보키여야 하는, 3NF보다 더 강한 정규형이다.",
      explanation: `
- **3NF**: 기본키가 아닌 모든 속성이 기본키에만 완전 함수 종속이면 만족.
- **BCNF**: 모든 결정자(Determinant)가 후보키여야 함.
- 그래서 3NF는 만족하지만 BCNF는 만족하지 못하는 스키마가 존재할 수 있음.
- 시험에서는 "모든 결정자가 후보키"라는 문장을 기억해두는 게 실전에서 가장 유용함.
      `.trim(),
      examples: ["교수-과목-강의실 예시에서 BCNF 분해 과정 1회 복습하기."],
    },
    meta: {
      difficulty: 3,
      importance: 5,
      reviewCount: 1,
      lastReviewedAt: "2025-11-12T10:30:00+09:00",
      nextReviewAt: "2025-11-15T10:30:00+09:00",
    },
    createdAt: "2025-11-12T10:00:00+09:00",
    updatedAt: "2025-11-12T10:30:00+09:00",
  },
];
