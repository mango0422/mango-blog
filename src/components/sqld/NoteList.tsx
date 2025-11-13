// components/sqld/NoteList.tsx
import type { SqldNote } from "@/sqld/note.types";
import { NoteCard } from "./NoteCard";

interface NoteListProps {
  notes: SqldNote[];
}

export function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        조건에 맞는 오답노트가 없습니다. 필터를 조정해보세요.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
