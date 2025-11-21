// src/app/fonts.ts
import localFont from "next/font/local";

// 제목용(귀엽게) + 한글/영문 모두 CookieRun
export const cuteFont = localFont({
  src: [
    {
      path: "../fonts/CookieRun-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CookieRun-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/CookieRun-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cute", // ✅ globals.css에서 쓰는 이름과 맞춤
  display: "swap",
});

// 본문용도 동일 폰트로(원하면 나중에 다른 폰트로 갈아껴도 됨)
export const sansFont = localFont({
  src: [
    {
      path: "../fonts/CookieRun-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CookieRun-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/CookieRun-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans", // ✅ globals.css에서 쓰는 이름과 맞춤
  display: "swap",
});
