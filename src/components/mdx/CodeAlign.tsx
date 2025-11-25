import type { ReactNode } from "react";

type CodeAlignProps = {
  outer?: "left" | "center" | "right"; // 박스 위치
  inner?: "left" | "center" | "right"; // 박스 내부 정렬
  children: ReactNode;
};

export function CodeAlign({
  outer = "left",
  inner = "left",
  children,
}: CodeAlignProps) {
  const outerStyle =
    outer === "center"
      ? "justify-center"
      : outer === "right"
      ? "justify-end"
      : "justify-start";

  const innerStyle =
    inner === "center"
      ? "text-center"
      : inner === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className={`flex ${outerStyle}`}>
      <div className={`inline-block ${innerStyle}`}>{children}</div>
    </div>
  );
}
