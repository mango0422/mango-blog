// components/sqld/NoteCard.tsx
import Link from "next/link";
import type { SqldNote } from "@/sqld/note.types";
import { TagPill } from "./TagPill";
import { Card } from "../common/Card";

interface NoteCardProps {
  note: SqldNote;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <header className="mb-2 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-50">
          <Link href={`/sqld/${note.slug}`}>
            <span className="underline-offset-4 group-hover:underline">
              {note.title}
            </span>
          </Link>
        </h2>
        <span className="text-xs text-slate-400">{note.category}</span>
      </header>

      <p className="mb-2 line-clamp-2 text-xs text-slate-300">
        {note.concept.summary}
      </p>

      <div className="mb-2 flex flex-wrap gap-1">
        {note.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      <footer className="flex items-center justify-between text-[11px] text-slate-500">
        <span>
          난이도 {note.meta.difficulty} / 중요도 {note.meta.importance}
        </span>
        {note.meta.nextReviewAt && (
          <span>
            다음 복습:{" "}
            {new Date(note.meta.nextReviewAt).toLocaleDateString("ko-KR")}
          </span>
        )}
      </footer>
    </Card>
  );
}
