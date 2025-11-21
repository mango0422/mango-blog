"use client";

import { useTheme } from "next-themes";

type ThemeSwitchProps = {
  className?: string;
  compact?: boolean; // 필요하면 나중에 활용
};

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export function ThemeSwitch({ className = "" }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <label htmlFor="theme-select" className="nx-sr-only">
        Theme
      </label>
      <select
        id="theme-select"
        data-theme-switch
        className={
          "nx-text-xs nx-rounded-full nx-border nx-border-white/10 " +
          "nx-bg-black/20 nx-px-2.5 nx-py-1 " +
          "nx-text-gray-200 hover:nx-bg-white/5 " +
          "nx-outline-none " +
          className
        }
        value={theme ?? "system"}
        onChange={(e) => setTheme(e.target.value)}
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
