"use client";

import { useMemo, useState } from "react";
import { Markdown } from "@/components/common/Markdown";

interface PaginatedMarkdownProps {
  raw: string;
}

interface Section {
  title: string;
  content: string;
}

function extractTitle(section: string, index: number): string {
  const lines = section.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      // '#', '##', '###' 모두 허용
      return trimmed.replace(/^#+\s*/, "");
    }
  }
  return `섹션 ${index + 1}`;
}

export function PaginatedMarkdown({ raw }: PaginatedMarkdownProps) {
  const sections = useMemo<Section[]>(() => {
    // --- 가 단독으로 있는 줄을 기준으로 나눔
    const parts = raw.split(/^---\s*$/m);
    return parts
      .map((part, idx) => {
        const content = part.trim();
        if (!content) return null;
        return {
          title: extractTitle(content, idx),
          content,
        };
      })
      .filter((s): s is Section => s !== null);
  }, [raw]);

  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);

  if (sections.length === 0) {
    return <p className="text-sm text-slate-400">표시할 내용이 없습니다.</p>;
  }

  const current = sections[index];

  const goPrev = () => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  };

  const goNext = () => {
    setIndex((i) => (i < sections.length - 1 ? i + 1 : i));
  };

  const canPrev = index > 0;
  const canNext = index < sections.length - 1;

  return (
    <div className="relative">
      {/* 상단 바: 섹션 목록 + 페이지 인디케이터 */}
      <div className="mb-4 flex items-center justify-between gap-2 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 hover:border-emerald-400 hover:text-emerald-300"
            onClick={() => setShowList((v) => !v)}
          >
            섹션 목록
          </button>
          <span className="hidden sm:inline text-slate-500">
            현재 섹션: <span className="text-slate-100">{current.title}</span>
          </span>
        </div>
        <div className="text-slate-400">
          {index + 1} / {sections.length}
        </div>
      </div>

      {/* 섹션 목록 드롭다운 (모바일 고려해서 카드 형태) */}
      {showList && (
        <div className="mb-4 max-h-64 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950/95 p-3 text-xs shadow-lg">
          <ul className="space-y-1">
            {sections.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={`w-full text-left rounded px-2 py-1 ${
                    i === index
                      ? "bg-emerald-900/60 text-emerald-100"
                      : "hover:bg-slate-800 hover:text-slate-100"
                  }`}
                  onClick={() => {
                    setIndex(i);
                    setShowList(false);
                  }}
                >
                  {i + 1}. {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 실제 내용 */}
      <article className="prose prose-invert max-w-none">
        <Markdown>{current.content}</Markdown>
      </article>

      {/* 하단 고정 네비게이션 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-between px-4 sm:px-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className={`pointer-events-auto flex items-center gap-1 rounded-full px-3 py-2 text-xs sm:text-sm ${
            canPrev
              ? "bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:ring-emerald-400"
              : "bg-slate-900/40 text-slate-600 ring-1 ring-slate-800 cursor-not-allowed"
          }`}
        >
          ← 이전
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className={`pointer-events-auto flex items-center gap-1 rounded-full px-3 py-2 text-xs sm:text-sm ${
            canNext
              ? "bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:ring-emerald-400"
              : "bg-slate-900/40 text-slate-600 ring-1 ring-slate-800 cursor-not-allowed"
          }`}
        >
          다음 →
        </button>
      </div>
    </div>
  );
}
