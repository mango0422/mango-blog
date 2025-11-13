// components/sqld/TagPill.tsx
interface TagPillProps {
  label: string;
}

export function TagPill({ label }: TagPillProps) {
  return (
    <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-xs text-slate-200 ring-1 ring-slate-700/70">
      {label}
    </span>
  );
}
