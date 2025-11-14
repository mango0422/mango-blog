// src/app/(post)/sqld/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllSqldNotes,
  getSqldNoteBySlug,
  type SqldSlug,
} from "@/data/sqld/notes.data";
import { NoteDetail } from "@/components/sqld/NoteDetail";

type Params = { slug: SqldSlug };

interface SqldPageProps {
  params: Promise<Params>;
}

// ✅ SSG용 정적 파라미터
export async function generateStaticParams(): Promise<Params[]> {
  const notes = getAllSqldNotes(); // note.slug: SqldSlug 로 좁혀짐
  return notes.map((note) => ({ slug: note.slug }));
}

// ✅ 각 슬러그별 메타데이터
export async function generateMetadata({
  params,
}: SqldPageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getSqldNoteBySlug(slug);

  if (!note) return {};

  return {
    title: `${note.title} | SQLD 오답노트`,
    description: note.concept.summary,
  };
}

// ✅ 실제 페이지
export default async function SqldNotePage({ params }: SqldPageProps) {
  const { slug } = await params;
  const note = getSqldNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-4">
      <NoteDetail note={note} />
    </main>
  );
}
