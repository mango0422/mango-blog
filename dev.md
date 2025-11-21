# 01. Claude 개선안

프로젝트를 분석했습니다. 책의 내용을 효과적으로 정리하기 위한 구조 개선안을 제시하겠습니다.

## 📋 현재 상태 분석

**버전 체크 ✅**

- Next.js 16.0.3, Nextra 4.6.0, React 19.2.0 - 모두 최신 안정 버전
- TypeScript 5.9.3, Tailwind CSS 4.1.17 - 호환성 문제 없음

**현재 구조의 문제점**

1. 기존 `/docs/java/` 구조는 "참조용 API 문서" 스타일
2. 책은 "실습 중심 + 프로젝트 기반" 학습 구조
3. 두 접근 방식을 분리하는 것이 좋습니다

## 🔧 권장 수정사항

### 1. 새로운 섹션 추가

```json filename="src/content/_meta.json" {8-11}
{
  "index": {
    "title": "홈",
    "display": "hidden"
  },
  "docs": { "title": "Docs", "type": "page" },
  "posts": { "title": "Blog", "type": "page" },
  "til": { "title": "TIL", "type": "page" },
  "projects": { "title": "Projects", "type": "page" },
  "java": { "title": "Java17 · 타입·자료구조·알고리즘", "type": "page" },
  "ds-algo-book": {
    "title": "자료구조와 알고리즘 실습",
    "type": "page"
  }
}
```

### 2. 새 폴더 구조 생성

```bash
src/content/ds-algo-book/
├── _meta.json
├── index.mdx
├── ch01-interfaces/
│   ├── _meta.json
│   ├── index.mdx
│   ├── list-types.mdx
│   └── lab-01.mdx
├── ch02-analysis/
│   ├── _meta.json
│   ├── selection-sort.mdx
│   ├── big-o.mdx
│   └── lab-02.mdx
├── ch03-arraylist/
├── ch04-linkedlist/
├── ch05-doubly-linked/
├── ch06-tree-traversal/
├── ch07-philosophy-path/
├── ch08-indexer/
├── ch09-map-interface/
├── ch10-hashing/
├── ch11-hashmap/
├── ch12-treemap/
├── ch13-binary-search-tree/
├── ch14-persistence/
├── ch15-wiki-crawler/
├── ch16-boolean-search/
└── ch17-sorting/
```

### 3. 최상위 \_meta.json

```json filename="src/content/ds-algo-book/_meta.json"
{
  "index": "소개",
  "ch01-interfaces": "CH1 · 인터페이스",
  "ch02-analysis": "CH2 · 알고리즘 분석",
  "ch03-arraylist": "CH3 · ArrayList 클래스",
  "ch04-linkedlist": "CH4 · LinkedList 클래스",
  "ch05-doubly-linked": "CH5 · 이중 연결 리스트",
  "ch06-tree-traversal": "CH6 · 트리 순회",
  "ch07-philosophy-path": "CH7 · 철학으로 가는 길",
  "ch08-indexer": "CH8 · 인덱서",
  "ch09-map-interface": "CH9 · Map 인터페이스",
  "ch10-hashing": "CH10 · 해싱",
  "ch11-hashmap": "CH11 · HashMap 클래스",
  "ch12-treemap": "CH12 · TreeMap 클래스",
  "ch13-binary-search-tree": "CH13 · 이진 탐색 트리",
  "ch14-persistence": "CH14 · 영속성",
  "ch15-wiki-crawler": "CH15 · 위키피디아 크롤링",
  "ch16-boolean-search": "CH16 · 불리언 검색",
  "ch17-sorting": "CH17 · 정렬"
}
```

### 4. 챕터별 \_meta.json 예시

```json filename="src/content/ds-algo-book/ch01-interfaces/_meta.json"
{
  "index": "개요",
  "list-types": "1.1 리스트가 두 종류인 이유",
  "java-interface": "1.2 자바 interface",
  "list-interface": "1.3 List interface",
  "lab-01": "1.4 실습 1"
}
```

### 5. MDX 템플릿 예시

````mdx filename="src/content/ds-algo-book/ch02-analysis/big-o.mdx"
---
title: 2.2 빅오 표기법
description: 알고리즘의 성능을 분석하는 빅오 표기법을 학습합니다.
---

# 빅오 표기법

<Callout type="info" title="학습 목표">
  - 빅오 표기법의 개념 이해 - 시간 복잡도 계산 방법 - 공간 복잡도 분석
</Callout>

## 개념 [#concept]

빅오 표기법은 알고리즘의 **최악의 경우** 성능을 나타냅니다.

### 주요 시간 복잡도

| 표기법        | 이름          | 예시             |
| ------------- | ------------- | ---------------- |
| $O(1)$        | 상수 시간     | 배열 인덱스 접근 |
| $O(\log n)$   | 로그 시간     | 이진 탐색        |
| $O(n)$        | 선형 시간     | 선형 탐색        |
| $O(n \log n)$ | 선형로그 시간 | 병합 정렬        |
| $O(n^2)$      | 제곱 시간     | 버블 정렬        |

## 구현 예제 [#example]

```java filename="BigOExample.java"
public class BigOExample {
    // O(1) - 상수 시간
    public int getFirst(int[] arr) {
        return arr[0];
    }

    // O(n) - 선형 시간
    public int sum(int[] arr) {
        int total = 0;
        for (int num : arr) {
            total += num;
        }
        return total;
    }

    // O(n²) - 제곱 시간
    public void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }
}
```
```

## 실습 문제 [#practice]

<Callout type="warning" title="실습 2">
다음 코드의 시간 복잡도를 분석하세요.
</Callout>

## 면접 포인트 [#interview]

- 빅오는 **최악의 경우**를 가정
- 상수는 생략 ($O(2n) = O(n)$)
- 최고차항만 표기 ($O(n^2 + n) = O(n^2)$)

````

### 6. 기존 Java 섹션 역할 재정의

```mdx filename="src/content/docs/java/index.mdx"
---
title: Java17 · 타입·자료구조·알고리즘
description: Java 17 API 레퍼런스 중심의 빠른 참조 가이드
---

# Java17 학습 허브

이 섹션은 **API 레퍼런스 & 빠른 참조용**입니다.

<Callout type="info">
📚 실습 중심 학습은 [자료구조와 알고리즘 실습](/ds-algo-book) 섹션을 참고하세요.
</Callout>

## 구성

1. **기본 데이터 타입** - Java 17 타입 시스템
2. **자바 컬렉션** - Collections Framework API
3. **핵심 알고리즘** - 표준 라이브러리 활용
````

## 🎯 작업 순서 추천

1. **폴더 구조 생성** (5분)

   ```bash
   mkdir -p src/content/ds-algo-book/ch{01..17}-*/
   ```

2. **\_meta.json 파일 작성** (10분)

   - 최상위 + 각 챕터별

3. **index.mdx 작성** (5분)

   - 책 소개 및 학습 가이드

4. **챕터별 순차 작성** (학습 진행하며)

   - 1장 완료 → MDX 작성 → 2장 시작

5. **코드 예제는 깃허브 연동**
   ```mdx
   <Callout type="success" title="실습 코드">
     [GitHub 저장소에서 전체 코드
     보기](https://github.com/mango0422/ds-algo-practice/tree/main/ch01)
   </Callout>
   ```
 
## ✅ 버전 호환성 체크

모든 패키지가 최신 안정 버전이므로 **버전 불일치 문제 없음**:

- Nextra 4.6.0의 모든 기능 사용 가능
- React 19의 새 기능(Compiler 등) 호환
- Tailwind CSS 4의 새 문법 지원

이 구조로 진행하시면 책 학습 + 블로그 정리가 체계적으로 가능합니다! 🚀
