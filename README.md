# 🍋 Mango Blog

**Mango Blog**는 **Next.js 16**과 **Nextra 4**를 기반으로 구축된 개인 기술 블로그 및 문서화 허브입니다.
개발 학습 기록, 알고리즘 풀이, 기술 아티클을 체계적으로 정리하기 위해 설계되었습니다.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![Nextra](https://img.shields.io/badge/Nextra_4-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## 🚀 주요 기능 (Features)

- **📚 문서화 (Docs)**: `src/content/docs`에 체계적인 학습 노트 정리 (예: Java 자료구조)
- **📝 블로그 (Blog)**: `src/content/posts`에 기술 아티클 및 에세이 작성
- **🎨 모던 UI**: Tailwind CSS v4 기반의 커스텀 스타일링 및 다크 모드 지원
- **🔍 강력한 검색**: Pagefind를 이용한 정적 사이트 풀텍스트 검색
- **🧩 MDX 컴포넌트**: Callout, Steps, Tabs 등 리치 텍스트 컴포넌트 지원

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Content**: [Nextra 4](https://nextra.site/) (MDX)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Search Engine**: [Pagefind](https://pagefind.app/)
- **Deployment**: Vercel / GitHub Pages (Static Export)

## 🏃‍♂️ 시작하기 (Getting Started)

### 1. 설치 (Install)

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2\. 개발 서버 실행 (Run Dev)

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)을 열어 확인합니다.

### 3\. 빌드 및 검색 인덱싱 (Build)

프로덕션 배포를 위해 빌드하고 Pagefind 검색 인덱스를 생성합니다.

```bash
npm run build
# 빌드 후 자동으로 postbuild 스크립트가 실행되어 검색 인덱스를 생성합니다.
```

## 📂 프로젝트 구조 (Project Structure)

```bash
mango-blog/
├── src/
│   ├── app/                 # Next.js App Router (레이아웃, 라우팅)
│   ├── components/          # 리액트 컴포넌트 (Client Component 포함)
│   ├── content/             # 📝 실제 글과 문서가 위치하는 곳 (MDX)
│   │   ├── docs/            # 문서 (Java, CS 등)
│   │   ├── posts/           # 블로그 포스트
│   │   └── _meta.ts         # 사이트 구조 정의
│   ├── mdx-components.tsx   # MDX 전역 컴포넌트 매핑
│   └── lib/                 # 유틸리티 함수
├── public/                  # 정적 이미지 및 Pagefind 인덱스
├── next.config.mjs          # Next.js 설정
└── README.md
```

## ✍️ 컨텐츠 작성 가이드 (Writing Guide)

새로운 글이나 문서를 작성하는 방법, MDX 문법, 주의 사항은 별도 가이드 문서를 참고하세요.

👉 **[HOW-TO-WRITE-MDX.md](https://www.google.com/search?q=./HOW-TO-WRITE-MDX.md) 보러가기**

### 빠른 요약

1.  **파일 생성**: `src/content/docs` 또는 `posts` 아래에 `.mdx` 파일 생성
2.  **메타 등록**: 해당 폴더의 `_meta.ts`에 파일명 등록 (필수\!)
3.  **작성**: Frontmatter 작성 후 본문 내용 채우기

<!-- end list -->

```mdx
---
title: 새 글 제목
date: 2025-11-22
---

# 안녕하세요

여기에 내용을 작성합니다.
```

## 📄 라이선스 (License)

MIT License © 2025 Mango

```

```
