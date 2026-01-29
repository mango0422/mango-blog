"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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
  description: string;
  longDescription: string;
  preview: { bg: string; accent: string; text: string };
}[] = [
  {
    value: "blue-hour",
    label: "Blue Hour",
    description: "해질녘 하늘 아래 고요한 순간",
    longDescription:
      "영화 La La Land의 블루아워 장면에서 영감을 받았습니다. 해가 지고 밤이 오기 직전, 하늘이 깊은 파란빛으로 물드는 마법 같은 순간을 담았습니다. 차분한 보라빛 액센트가 몽환적인 분위기를 더합니다.",
    preview: { bg: "#0f172a", accent: "#a78bfa", text: "#e5e7eb" },
  },
  {
    value: "neon-interior",
    label: "Neon Interior",
    description: "재즈바의 따뜻한 네온 조명",
    longDescription:
      "영화 La La Land의 재즈바 장면에서 영감을 받았습니다. 따뜻한 네온 조명 아래에서 재즈 피아노 선율이 흐르는 아늑한 밤의 분위기를 담았습니다. 앰버 톤의 액센트가 따스함을 전합니다.",
    preview: { bg: "#1a0f0a", accent: "#f59e0b", text: "#fef3e2" },
  },
  {
    value: "sunset-boulevard",
    label: "Sunset Boulevard",
    description: "선셋~야간 전환, 네온 핑크",
    longDescription:
      "선셋에서 야간으로 전환되는 순간의 감정선을 담았습니다. 짙은 보라빛 밤하늘에 네온 핑크가 한 줄기 빛처럼 떠오릅니다. 60%는 짙은 보라 밤, 30%는 플럼/퍼플 구조, 10%만 핑크 네온으로 구성됩니다.",
    preview: { bg: "#1a1026", accent: "#ff3d81", text: "#f4e9ff" },
  },
  {
    value: "dawn-freeway",
    label: "Dawn Freeway",
    description: "새벽 고속도로, 블루 + 앰버",
    longDescription:
      "새벽 고속도로를 달리는 장면에서 영감을 받았습니다. 차분한 딥 블루 배경에 해 뜨는 주황빛이 한 줄기 희망처럼 빛납니다. 60%는 딥 블루, 30%는 쿨 블루 표면, 10%는 앰버 포인트로 구성됩니다.",
    preview: { bg: "#0b1a33", accent: "#ffb020", text: "#eaf1ff" },
  },
  {
    value: "jazz-bordeaux",
    label: "Jazz Bordeaux",
    description: "재즈바 공연장, 버건디 레드",
    longDescription:
      "재즈바 공연장의 낮은 조도와 버건디 레드 조명을 담았습니다. 매우 어두운 와인톤 배경에 선명한 레드가 강렬한 인상을 남깁니다. 경고나 중요한 액션을 강조하는 UI에 특히 적합합니다.",
    preview: { bg: "#14060a", accent: "#e11d48", text: "#fff1f4" },
  },
  {
    value: "studio-teal-orange",
    label: "Studio Teal",
    description: "시네마틱 티얼/오렌지 룩",
    longDescription:
      "촬영 스튜디오의 티얼-오렌지 시네마 룩에서 영감을 받았습니다. 딥 티얼 배경에 오렌지 포인트가 영화적인 색감을 만들어냅니다. 60%는 딥 티얼, 30%는 티얼 표면, 10%는 오렌지 포인트입니다.",
    preview: { bg: "#071b1c", accent: "#ff7a18", text: "#e8fffb" },
  },
  {
    value: "desert-dusk",
    label: "Desert Dusk",
    description: "사막의 해질녘, 코랄 석양",
    longDescription:
      "사막의 해질녘 풍경에서 영감을 받았습니다. 따뜻한 먼지색 배경에 코랄빛 석양이 지평선을 물들입니다. 60%는 따뜻한 다크 퍼플/브라운, 30%는 웜한 표면, 10%는 코랄 포인트로 구성됩니다.",
    preview: { bg: "#16101a", accent: "#ff6b3d", text: "#fff2e5" },
  },
  {
    value: "pastel-night",
    label: "Pastel Night",
    description: "몽환적인 밤, 파스텔 바이올렛",
    longDescription:
      "몽환적인 밤의 분위기를 파스텔 바이올렛으로 표현했습니다. 짙은 네이비 배경에 라벤더 포인트가 은근히 떠있는 느낌입니다. 선택됨/활성 상태를 표현하는 UI에 특히 적합합니다.",
    preview: { bg: "#0d1422", accent: "#a78bfa", text: "#f2f5ff" },
  },
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

export function ThemeSettings() {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const currentTheme = themes.find((t) => t.value === theme);

  if (!mounted) {
    return (
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {themes.map((t) => (
          <div
            key={t.value}
            className="h-40 rounded-xl border border-border bg-surface animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`
              relative group overflow-hidden rounded-xl border-2 transition-all duration-300
              ${
                theme === t.value
                  ? "border-accent ring-2 ring-accent/30 scale-[1.02]"
                  : "border-border hover:border-accent/50"
              }
            `}
          >
            {/* 테마 프리뷰 영역 */}
            <div
              className="h-24 p-3 flex flex-col justify-between"
              style={{ backgroundColor: t.preview.bg }}
            >
              {/* 상단: 가짜 네비게이션 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: t.preview.accent }}
                  />
                  <div
                    className="h-1.5 w-10 rounded"
                    style={{ backgroundColor: t.preview.text, opacity: 0.7 }}
                  />
                </div>
              </div>

              {/* 중앙: 가짜 콘텐츠 */}
              <div className="space-y-1.5">
                <div
                  className="h-2 w-3/4 rounded"
                  style={{ backgroundColor: t.preview.text, opacity: 0.9 }}
                />
                <div
                  className="h-1.5 w-1/2 rounded"
                  style={{ backgroundColor: t.preview.text, opacity: 0.5 }}
                />
              </div>

              {/* 하단: 가짜 버튼 */}
              <div className="flex gap-1.5">
                <div
                  className="h-3 w-8 rounded"
                  style={{ backgroundColor: t.preview.accent }}
                />
              </div>
            </div>

            {/* 테마 정보 영역 */}
            <div className="p-3 bg-surface">
              <h3 className="font-semibold text-text text-sm truncate">
                {t.label}
              </h3>
              <p className="text-xs text-text-muted mt-0.5 truncate">
                {t.description}
              </p>
            </div>

            {/* 선택됨 표시 */}
            {theme === t.value && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-accent-contrast"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 현재 테마 정보 - 동적으로 변경 */}
      <div className="p-5 rounded-xl bg-surface-strong border border-border">
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: currentTheme?.preview.bg,
              border: `2px solid ${currentTheme?.preview.accent}`,
            }}
          >
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: currentTheme?.preview.accent }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text text-lg">
                {currentTheme?.label}
              </h3>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent">
                Active
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {currentTheme?.longDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
