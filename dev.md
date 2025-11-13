좋아, 말했던 흐름 개선 아이디어 반영해서 **개선된 `PaginatedMarkdown` 전체 코드** 한 번에 줄게.

- `#`(H1)은 Part 제목으로 분리해서 상단 breadcrumb에만 사용
- `---` 가 있으면 먼저 그걸 기준으로 쪼개고
- 없으면 `###` 헤딩(소단원) 기준으로 섹션 자동 분리
- 상단: Part 제목 + 진행도 바 + 섹션 목록
- 하단: 좌/우 고정 버튼에 각각 “이전/다음 섹션 제목” 표시

```tsx
// src/components/blog/PaginatedMarkdown.tsx
"use client";

import { useMemo, useState } from "react";
import { Markdown } from "@/components/common/Markdown";

interface PaginatedMarkdownProps {
  raw: string;
}

interface Section {
  index: number;
  title: string;
  content: string;
}

/** 전체 문서에서 첫 번째 H1(# ...)을 Part 제목으로 뽑고, 나머지 본문을 반환 */
function extractPartTitleAndBody(raw: string): {
  partTitle: string | null;
  body: string;
} {
  const lines = raw.split("\n");
  let partTitle: string | null = null;
  let start = 0;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+)/);
    if (m) {
      partTitle = m[1].trim();
      start = i + 1;
      break;
    }
  }

  const body = lines.slice(start).join("\n");
  return { partTitle, body };
}

/** 섹션 안에서 첫 헤딩(#~######)을 섹션 제목으로 사용 */
function extractFirstHeading(text: string): string | null {
  const lines = text.split("\n");
  for (const line of lines) {
    const m = line.match(/^#{1,6}\s+(.+)/);
    if (m) {
      return m[1].trim();
    }
  }
  return null;
}

/** --- 기준으로 명시적 섹션 분리 */
function splitByExplicitBreaks(
  body: string
): { title: string; content: string }[] {
  const parts = body
    .split(/^---\s*$/m)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (parts.length <= 1) return [];

  return parts.map((part, idx) => ({
    title: extractFirstHeading(part) ?? `섹션 ${idx + 1}`,
    content: part,
  }));
}

/** ### 헤딩 기준으로 섹션 분리 (명시적 --- 없을 때 사용) */
function splitByHeadings(
  body: string,
  partTitle: string | null
): { title: string; content: string }[] {
  const lines = body.split("\n");
  const blocks: { title: string; content: string }[] = [];

  let buffer: string[] = [];
  let currentTitle: string | null = null;

  const flush = () => {
    const content = buffer.join("\n").trim();
    if (!content) {
      buffer = [];
      return;
    }

    let title = currentTitle;
    if (!title) {
      if (blocks.length === 0 && partTitle) {
        title = partTitle;
      } else {
        title = `섹션 ${blocks.length + 1}`;
      }
    }

    blocks.push({ title, content });
    buffer = [];
    currentTitle = null;
  };

  for (const line of lines) {
    const m = line.match(/^###\s+(.+)/); // 소단원 헤딩 기준
    if (m) {
      // 이전 섹션 종료
      flush();
      currentTitle = m[1].trim();
      buffer.push(line); // 헤딩도 내용에 포함
    } else {
      buffer.push(line);
    }
  }
  flush();

  // 그래도 아무것도 없다면 body 전체를 하나의 섹션으로
  if (blocks.length === 0 && body.trim().length > 0) {
    blocks.push({
      title: partTitle ?? "섹션 1",
      content: body.trim(),
    });
  }

  return blocks;
}

/** 원본 markdown → Part 제목 + 섹션 배열 */
function buildSections(raw: string): {
  partTitle: string | null;
  sections: Section[];
} {
  const { partTitle, body } = extractPartTitleAndBody(raw);
  const trimmedBody = body.trim();

  if (!trimmedBody) {
    return { partTitle, sections: [] };
  }

  // 1순위: --- 기준 명시적 분리
  const explicit = splitByExplicitBreaks(trimmedBody);
  const baseBlocks =
    explicit.length > 0 ? explicit : splitByHeadings(trimmedBody, partTitle);

  const sections: Section[] = baseBlocks.map((b, idx) => ({
    index: idx,
    title: b.title,
    content: b.content,
  }));

  return { partTitle, sections };
}

export function PaginatedMarkdown({ raw }: PaginatedMarkdownProps) {
  const { partTitle, sections } = useMemo(() => buildSections(raw), [raw]);

  const [index, setIndex] = useState(0);
  const [showList, setShowList] = useState(false);

  if (sections.length === 0) {
    return <p className="text-sm text-slate-400">표시할 섹션이 없습니다.</p>;
  }

  const current = sections[index];
  const canPrev = index > 0;
  const canNext = index < sections.length - 1;
  const prev = canPrev ? sections[index - 1] : null;
  const next = canNext ? sections[index + 1] : null;

  const progress = ((index + 1) / sections.length) * 100;

  const goPrev = () => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  };

  const goNext = () => {
    setIndex((i) => (i < sections.length - 1 ? i + 1 : i));
  };

  return (
    <div className="relative pb-20">
      {/* 상단: Part / breadcrumb / 진행도 */}
      <div className="mb-4 space-y-2 text-xs text-slate-300">
        {partTitle && (
          <div className="font-semibold text-slate-100">{partTitle}</div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1 hover:border-emerald-400 hover:text-emerald-300"
              onClick={() => setShowList((v) => !v)}
            >
              섹션 목록
            </button>
            <span className="hidden sm:inline text-slate-500">
              {index + 1} / {sections.length} ·{" "}
              <span className="text-slate-100">{current.title}</span>
            </span>
          </div>
          <span className="sm:hidden text-slate-400">
            {index + 1} / {sections.length}
          </span>
        </div>

        {/* 진행도 바 */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 섹션 목록 (모바일에서 드롭다운처럼) */}
      {showList && (
        <div className="mb-4 max-h-64 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950/95 p-3 text-xs shadow-lg">
          <ul className="space-y-1">
            {sections.map((s, i) => (
              <li key={s.index}>
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

      {/* 현재 섹션 내용 */}
      <article className="prose prose-invert max-w-none">
        <Markdown>{current.content}</Markdown>
      </article>

      {/* 하단 고정 네비게이션 (좌/우) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-between px-4 sm:px-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className={`pointer-events-auto flex max-w-[48vw] items-center gap-1 rounded-full px-3 py-2 text-[11px] sm:text-xs ${
            canPrev
              ? "bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:ring-emerald-400"
              : "bg-slate-900/40 text-slate-600 ring-1 ring-slate-800 cursor-not-allowed"
          }`}
        >
          <span>←</span>
          {prev && <span className="truncate">{prev.title}</span>}
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className={`pointer-events-auto flex max-w-[48vw] items-center gap-1 rounded-full px-3 py-2 text-[11px] sm:text-xs ${
            canNext
              ? "bg-slate-900/90 text-slate-100 ring-1 ring-slate-700 hover:ring-emerald-400"
              : "bg-slate-900/40 text-slate-600 ring-1 ring-slate-800 cursor-not-allowed"
          }`}
        >
          {next && <span className="truncate">{next.title}</span>}
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
```

이 버전으로 한 번 연결해서 써보고,

- 섹션 나누는 기준(--- vs ###)
- 제목/진행도/버튼 위치
- 모바일에서 눌러보는 느낌

직접 체감해보고 나서 “여기 더 줄이고 싶다 / 이건 너무 과하다” 같은 피드백 주면, 그 기준으로 한 번 더 다듬자.
