// app/(post)/sqld/page.tsx
import { sqldNotes } from "@/data/sqld/notes.data";
import { NoteList } from "@/components/sqld/NoteList";
import { sortNotesByNextReview } from "@/lib/sqld/note-filters";

export default function SqldListPage() {
  const sorted = sortNotesByNextReview(sqldNotes);

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-lg font-semibold text-slate-50">SQLD 오답노트</h1>
        <p className="text-sm text-slate-400">
          틀렸던 문제와 개념을 정리해두고, 중요도와 복습 일정을 기준으로
          관리합니다.
        </p>
      </header>

      {/* TODO: 나중에 필터/검색 UI 추가 */}
      <NoteList notes={sorted} />
    </section>
  );
}
