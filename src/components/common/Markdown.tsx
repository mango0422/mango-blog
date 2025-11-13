import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        table: (props) => (
          <table className="w-full border-collapse my-4 text-sm" {...props} />
        ),
        thead: (props) => (
          <thead className="bg-slate-800 text-slate-100" {...props} />
        ),
        th: (props) => (
          <th
            className="border border-slate-700 px-3 py-2 font-semibold text-left"
            {...props}
          />
        ),
        td: (props) => (
          <td
            className="border border-slate-700 px-3 py-2 align-top"
            {...props}
          />
        ),
        tr: (props) => (
          <tr className="even:bg-slate-900 odd:bg-slate-950" {...props} />
        ),
        p: (props) => <p className="mb-2 leading-relaxed" {...props} />,
        ul: (props) => (
          <ul className="mb-2 list-disc space-y-1 pl-5" {...props} />
        ),
        li: (props) => <li className="leading-relaxed" {...props} />,
        code: (props) => (
          <code
            className="rounded bg-slate-800 px-1 py-0.5 text-emerald-300"
            {...props}
          />
        ),
        strong: (props) => (
          <strong className="text-slate-100 font-semibold" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
