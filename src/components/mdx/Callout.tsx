// src/components/mdx/Callout.tsx
type CalloutProps = {
  type?: "info" | "warning" | "success";
  title?: string;
  children: React.ReactNode;
};

const colorMap = {
  info: "border-sky-500/60 bg-sky-500/5",
  warning: "border-amber-500/60 bg-amber-500/5",
  success: "border-emerald-500/60 bg-emerald-500/5",
} satisfies Record<NonNullable<CalloutProps["type"]>, string>;

export function Callout({ type = "info", title, children }: CalloutProps) {
  const color = colorMap[type];

  return (
    <div className={`my-4 rounded-2xl border px-4 py-3 text-sm ${color}`}>
      {title && <div className="mb-1 font-semibold">{title}</div>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
