// src/components/common/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`group rounded-xl border border-slate-800 bg-slate-900/40 p-4 transition hover:border-emerald-400/70 hover:bg-slate-900/80 ${className}`}
    >
      {children}
    </article>
  );
}
