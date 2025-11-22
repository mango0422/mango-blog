// type: good(초록), bad(빨강), average(노랑)
export function Complexity({
  type = "average",
  children,
}: {
  type?: "good" | "bad" | "average";
  children: React.ReactNode;
}) {
  const colors = {
    good: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
    average:
      "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300",
    bad: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[type]} font-mono mx-1`}
    >
      {children}
    </span>
  );
}
