"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useSyncExternalStore } from "react";

type ThemeSwitchProps = {
  className?: string;
};

export function ThemeSwitch({ className = "" }: ThemeSwitchProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Hydration Mismatch 방지 로직
  // 이 useEffect는 클라이언트에서만 실행되므로, 이 시점 이후에만 실제 아이콘을 그립니다.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // Client-side value
    () => false // Server-side value
  );

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ 마운트 전(서버 사이드)에는 스켈레톤(빈 원형)을 보여줘서 HTML 불일치를 막습니다.
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent ${className}`}
      />
    );
  }

  // 현재 테마 아이콘 결정
  const CurrentIcon =
    theme === "system"
      ? SystemIcon
      : resolvedTheme === "dark"
      ? MoonIcon
      : SunIcon;

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="테마 변경"
        className={`
          flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
          border border-transparent hover:border-gray-300 dark:hover:border-gray-600
          bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
          ${
            isOpen
              ? "ring-2 ring-mango-accent ring-opacity-50 bg-gray-200 dark:bg-gray-700"
              : ""
          }
        `}
      >
        <CurrentIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 py-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Theme
          </div>

          {themes.map(({ value, label, Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2 text-sm flex items-center gap-3 transition-colors
                ${
                  theme === value
                    ? "text-mango-accent bg-mango-accent/10 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <Icon
                className={`w-4 h-4 ${
                  theme === value ? "text-mango-accent" : "text-gray-500"
                }`}
              />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
const emptySubscribe = () => () => {};
// --- 아이콘 컴포넌트 (SVG) ---
const themes = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: SystemIcon },
];

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
