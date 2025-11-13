// src/app/(post)/sqld/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sqldNotes } from "@/data/sqld/notes.data";
import { NoteDetail } from "@/components/sqld/NoteDetail";

type Params = { slug: string };

interface SqldDetailPageProps {
  params: Promise<Params>;
}

export function generateStaticParams(): Params[] {
  return sqldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: SqldDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = sqldNotes.find((n) => n.slug === slug);
  if (!note) return {};

  return {
    title: `${note.title} | SQLD 오답노트`,
    description: note.concept.summary,
  };
}

export default async function SqldDetailPage({ params }: SqldDetailPageProps) {
  const { slug } = await params;

  const note = sqldNotes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <NoteDetail note={note} />
    </section>
  );
}
