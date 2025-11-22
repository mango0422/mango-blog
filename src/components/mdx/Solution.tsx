"use client";
import { useState } from "react";

export function Solution({
  title = "해답 보기",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 font-medium flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <span>🧩 {title}</span>
        <span>{isOpen ? "접기 ▲" : "펼치기 ▼"}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
