// lib/sqld/note-filters.ts
import type { SqldNote, SqldCategory, SqldTag } from "@/sqld/note.types";

export interface NoteFilter {
  category?: SqldCategory | "ALL";
  tag?: SqldTag | "ALL";
  query?: string;
}

export function filterNotes(notes: SqldNote[], filter: NoteFilter): SqldNote[] {
  return notes.filter((note) => {
    if (filter.category && filter.category !== "ALL") {
      if (note.category !== filter.category) return false;
    }

    if (filter.tag && filter.tag !== "ALL") {
      if (!note.tags.includes(filter.tag)) return false;
    }

    if (filter.query && filter.query.trim()) {
      const q = filter.query.trim().toLowerCase();
      const haystack = [
        note.title,
        note.concept.summary,
        note.concept.explanation,
        note.mistakeReason ?? "",
        note.category,
        ...note.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function sortNotesByNextReview(notes: SqldNote[]): SqldNote[] {
  return [...notes].sort((a, b) => {
    const aTime = a.meta.nextReviewAt
      ? new Date(a.meta.nextReviewAt).getTime()
      : Number.POSITIVE_INFINITY;
    const bTime = b.meta.nextReviewAt
      ? new Date(b.meta.nextReviewAt).getTime()
      : Number.POSITIVE_INFINITY;
    return aTime - bTime;
  });
}
