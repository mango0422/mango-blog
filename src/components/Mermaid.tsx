"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

export function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    const render = async () => {
      if (!containerRef.current) return;
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      try {
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    };
    render();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className="mermaid my-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
