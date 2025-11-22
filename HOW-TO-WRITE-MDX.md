# 📝 Mango Blog MDX 작성 가이드

이 문서는 **Next.js 16 + Nextra 4** 환경에서 MDX 문서를 작성하는 규칙과 팁을 정리합니다.

---

## 1. 파일 및 폴더 구조 규칙 (매우 중요!)

### 1.1 파일명 규칙

- **소문자**와 **하이픈(-)** 만 사용합니다. (예: `1-list-types.mdx`)
- 파일명 앞의 숫자는 정렬을 위한 용도입니다.

### 1.2 `_meta.ts` 설정 (필수)

Nextra 4에서는 JSON 대신 **TypeScript** 파일로 메타 데이터를 관리합니다.
폴더나 파일을 새로 만들면 반드시 **해당 폴더의 `_meta.ts`** 에 등록해야 사이드바에 보입니다.

```typescript
// src/content/docs/java/ch01-interfaces/_meta.ts
export default {
  // ❌ 틀린 예: 폴더명과 키값이 다르면 에러 발생!
  // "ch01-interface": "1. 인터페이스",

  // ✅ 맞는 예: 실제 폴더명/파일명(확장자 제외)과 글자 하나까지 똑같아야 함
  "ch01-interfaces": "1. 인터페이스",
  "1-list-types": "1.1 리스트가 두 종류인 이유",
};
```

---

## 2. Frontmatter (문서 정보)

모든 `.mdx` 파일의 최상단에는 문서 정보를 적습니다.

```yaml
---
title: 문서 제목 (브라우저 탭 표시용)
description: 문서에 대한 짧은 설명 (SEO 및 미리보기용)
date: 2025-11-22
tags: [java, algorithm]
---
```

---

## 3. 사용 가능한 문법 & 컴포넌트

### 3.1 기본 마크다운

표준 마크다운 문법을 모두 지원합니다.

- **제목**: `# H1`, `## H2`, `### H3`
- **강조**: `**볼드체**`, `_이탤릭체_`, `~~취소선~~`
- **리스트**: `-` 또는 `1.`
- **링크**: `[텍스트](URL)`
- **이미지**: `![설명](/images/example.png)` (public 폴더 기준 경로)

### 3.2 코드 블록 (Syntax Highlighting)

`filename` 속성을 사용하여 파일명을 표시할 수 있습니다.

```java filename="HelloWorld.java"
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 3.3 Callout (강조 박스)

`src/mdx-components.tsx`에 등록된 컴포넌트입니다.

```tsx
<Callout type="info">
  이것은 정보 알림입니다.
</Callout>

<Callout type="warning" title="주의">
  제목이 있는 경고 박스입니다.
</Callout>

<Callout type="success">
  성공 메시지입니다.
</Callout>
```

### 3.4 Tailwind CSS v4 직접 사용

MDX 안에서 HTML 태그에 Tailwind 클래스를 직접 입힐 수 있습니다.
**주의:** `class` 대신 반드시 **`className`** 을 사용해야 합니다.

```tsx
<span className="text-mango-accent font-bold text-lg">
  망고 블로그 포인트 컬러 텍스트
</span>

<div className="p-4 bg-gray-100 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
  커스텀 박스 디자인
</div>
```

---

## 4. 인터랙티브 컴포넌트 사용법 (Client Component)

**중요:** Next.js App Router에서 `.mdx` 파일은 기본적으로 **서버 컴포넌트**입니다.
MDX 파일 안에 직접 `useState`, `onClick` 등을 작성하면 에러가 발생합니다.

동작이 필요한 기능(버튼, 카운터, 토글 등)은 **별도 파일로 만들고 등록**해서 사용합니다.

### 4.1 컴포넌트 생성 (`src/components/mdx/`)

반드시 파일 최상단에 `"use client"`를 선언해야 합니다.

```tsx filename="src/components/mdx/Counter.tsx"
"use client"; // 👈 필수!

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### 4.2 전역 등록 (`src/mdx-components.tsx`)

만든 컴포넌트를 `mdx-components.tsx`에 등록하면, 모든 MDX 파일에서 **import 없이** 바로 사용할 수 있습니다. (권장 방식)

```tsx filename="src/mdx-components.tsx"
import { Counter } from "@/components/mdx/Counter";
// ...
return {
  ...themeComponents,
  Counter, // 👈 등록
  // ...
};
```

### 4.3 MDX에서 사용하기

등록된 컴포넌트는 HTML 태그처럼 바로 씁니다.

```mdx
# 카운터 테스트

여기 버튼이 있습니다:

<Counter />
```

---

## 5. 🚫 금지 사항 및 주의점 (Do's & Don'ts)

### ❌ MDX 파일에 `'use client'` 작성 금지

MDX 파일 자체를 클라이언트 컴포넌트로 만들지 마세요. 검색 엔진 최적화(SEO)에 불리하며, 일부 플러그인이 작동하지 않을 수 있습니다.

### ❌ `class` 속성 사용 금지

MDX는 React 컴포넌트로 변환되므로 HTML 표준 속성인 `class`를 쓰면 에러가 나거나 스타일이 무시됩니다.

- **틀림**: `<div class="text-red-500">`
- **맞음**: `<div className="text-red-500">`

### ❌ 닫지 않은 태그 사용 금지

HTML에서는 `<br>`이나 `<img>`를 닫지 않아도 되지만, MDX(JSX)에서는 **반드시 닫아야 합니다.**

- **틀림**: `<br>`, `<img src="...">`
- **맞음**: `<br />`, `<img src="..." />`

### ❌ 중괄호 `{}` 무단 사용 주의

텍스트 중에 중괄호 `{ }`가 들어가면 자바스크립트 변수로 인식하려다 에러가 날 수 있습니다.

- **해결**: 코드 블록 안에 넣거나, 백틱(\`)으로 감싸세요. 예: `{중괄호}`

### ⚠️ Import 문 위치

다른 컴포넌트를 가져올 때는 반드시 **Frontmatter 바로 아래, 본문 시작 전**에 적어야 합니다.

```mdx
---
title: 예시
---

// ✅ 여기는 OK
import { useState } from 'react';

# 제목

// ❌ 본문 중간 import 금지
import { Callout } from ...
```

---

## 6. 팁: 검색 엔진 최적화 (Pagefind)

검색 기능을 위해 문서에는 항상 **유의미한 텍스트**가 있어야 합니다.

- 파일만 생성하고 내용이 비어있으면 빌드 시 "Indexed pages" 카운트에 포함되지 않을 수 있습니다.
- 최소한 `# 제목`과 한 줄의 본문은 작성해주세요.

```mdx
# 아직 작성 중인 문서

작성 중입니다...
```
