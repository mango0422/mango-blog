"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";

type Theme =
  | "blue-hour"
  | "neon-interior"
  | "sunset-boulevard"
  | "dawn-freeway"
  | "jazz-bordeaux"
  | "studio-teal-orange"
  | "desert-dusk"
  | "pastel-night";

const THEME_KEY = "mango-theme";
const DEFAULT_THEME: Theme = "blue-hour";

const themes: {
  value: Theme;
  label: string;
  accent: string;
}[] = [
  { value: "blue-hour", label: "Blue Hour", accent: "#a78bfa" },
  { value: "neon-interior", label: "Neon Interior", accent: "#f59e0b" },
  { value: "sunset-boulevard", label: "Sunset Boulevard", accent: "#ff3d81" },
  { value: "dawn-freeway", label: "Dawn Freeway", accent: "#ffb020" },
  { value: "jazz-bordeaux", label: "Jazz Bordeaux", accent: "#e11d48" },
  { value: "studio-teal-orange", label: "Studio Teal", accent: "#ff7a18" },
  { value: "desert-dusk", label: "Desert Dusk", accent: "#ff6b3d" },
  { value: "pastel-night", label: "Pastel Night", accent: "#a78bfa" },
];

const VALID_THEMES = themes.map((t) => t.value);

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored && VALID_THEMES.includes(stored as Theme)) {
    return stored as Theme;
  }
  return DEFAULT_THEME;
}

function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

type ThemeSwitchProps = {
  className?: string;
};

export function ThemeSwitch({ className = "" }: ThemeSwitchProps) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const currentTheme = themes.find((t) => t.value === theme);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-interactive border border-border ${className}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="테마 변경"
        className={`
          flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200
          border border-border hover:border-accent
          bg-interactive hover:bg-interactive-hover
          ${isOpen ? "ring-2 ring-accent ring-opacity-50" : ""}
        `}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: currentTheme?.accent }}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 py-2 rounded-xl border border-border bg-surface-strong/95 backdrop-blur-md shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-1.5 text-xs font-semibold text-text-muted uppercase tracking-wider">
            Theme
          </div>

          <div className="max-h-80 overflow-y-auto">
            {themes.map(({ value, label, accent }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3 py-2 text-sm flex items-center gap-3 transition-colors
                  ${
                    theme === value
                      ? "text-accent bg-accent/10 font-medium"
                      : "text-text-muted hover:bg-interactive-hover hover:text-text"
                  }
                `}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white/20"
                  style={{ backgroundColor: accent }}
                />
                <span className="truncate">{label}</span>
                {theme === value && (
                  <svg
                    className="w-4 h-4 ml-auto text-accent flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const themeUtils = {
  getStoredTheme,
  applyTheme,
  THEME_KEY,
  DEFAULT_THEME,
  themes,
};
