// src/components/sqld/NoteDetail.tsx
import type { SqldNote } from "@/sqld/note.types";
import { TagPill } from "./TagPill";
import { Markdown } from "@/components/common/Markdown";

interface NoteDetailProps {
  note: SqldNote;
}

export function NoteDetail({ note }: NoteDetailProps) {
  const layout = note.layout ?? "note"; // 기본은 오답노트 스타일

  const created = new Date(note.createdAt);
  const updated = new Date(note.updatedAt);

  const hasQuestion = !!note.question;
  const hasMistake = !!note.mistakeReason;

  const correct = note.question?.correctAnswer;
  const my = note.myAnswer;
  const isCorrect = my && correct && my === correct;

  return (
    <article className="space-y-6">
      {/* 공통 헤더: 블로그 포스트 스타일 헤더 */}
      <header className="space-y-3 border-b border-slate-800 pb-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold text-slate-50">{note.title}</h1>
          <span className="text-xs text-slate-400">{note.category}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span>
            난이도 {note.meta.difficulty} / 중요도 {note.meta.importance}
          </span>
          {note.source?.examRound && (
            <span className="ml-1">· 회차 {note.source.examRound}</span>
          )}
          {note.source?.material && (
            <span className="ml-1">· {note.source.material}</span>
          )}
          <span className="ml-1">
            · 작성 {created.toLocaleDateString("ko-KR")}
          </span>
          {note.updatedAt !== note.createdAt && (
            <span className="ml-1">
              · 수정 {updated.toLocaleDateString("ko-KR")}
            </span>
          )}
        </div>
      </header>

      {layout === "note" && (
        <>
          {/* 1) 문제 + 정답/내 답 섹션 */}
          {hasQuestion && (
            <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm">
              <h2 className="mb-2 text-xs font-semibold text-slate-200">
                틀렸던 문제
              </h2>
              <p className="mb-2 text-slate-100">{note.question!.text}</p>

              {note.question!.options && (
                <ul className="mb-3 list-disc space-y-1 pl-5 text-xs text-slate-300">
                  {note.question!.options!.map((opt, idx) => (
                    <li key={idx}>
                      ({idx + 1}) {opt}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                {correct && (
                  <span className="rounded-full bg-emerald-900/60 px-2 py-1 text-emerald-300">
                    정답: {correct}
                  </span>
                )}
                {my && (
                  <span className="rounded-full bg-slate-800 px-2 py-1 text-slate-200">
                    내 답: {my}
                  </span>
                )}
                {correct && my && (
                  <span
                    className={`rounded-full px-2 py-1 ${
                      isCorrect
                        ? "bg-emerald-800/70 text-emerald-100"
                        : "bg-rose-900/60 text-rose-200"
                    }`}
                  >
                    {isCorrect ? "정답 ✅" : "오답 ❌"}
                  </span>
                )}
              </div>
            </section>
          )}

          {/* 2) 피드백(왜 틀렸는지) 섹션 */}
          {hasMistake && (
            <section className="rounded-lg bg-slate-900/40 p-3 text-sm">
              <h2 className="mb-2 text-xs font-semibold text-rose-300">
                왜 틀렸는지 (피드백)
              </h2>
              <p className="text-slate-200">{note.mistakeReason}</p>
            </section>
          )}
        </>
      )}

      {/* 3) 개념 정리: 두 레이아웃 공통, 블로그 포스트의 본문 역할 */}
      <section className="rounded-lg bg-slate-900/40 p-4 text-sm">
        <h2 className="mb-2 text-xs font-semibold text-emerald-300">
          개념 정리
        </h2>
        <p className="mb-3 text-slate-50">{note.concept.summary}</p>

        <Markdown>{note.concept.explanation}</Markdown>

        {note.concept.examples && note.concept.examples.length > 0 && (
          <div className="mt-3">
            <h3 className="mb-1 text-[11px] font-semibold text-slate-300">
              추가 예시 / 메모
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-xs text-slate-300">
              {note.concept.examples.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </article>
  );
}
