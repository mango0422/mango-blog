// global.d.ts

declare module "nextra/pages" {
  import type { ComponentType, ReactElement } from "react";
  import type { Heading as MdastHeading } from "mdast";
  import type { Metadata } from "next";

  /** Nextra가 사용하는 목차(Heading) 타입 */
  export type Heading = {
    // H1은 제외
    depth: Exclude<MdastHeading["depth"], 1>;
    value: string | ReactElement;
    id: string;
  };

  export type ReadingTime = {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };

  /** Nextra의 $NextraMetadata */
  export type NextraMetadata = Omit<Metadata, "title"> & {
    title: string;
    filePath: string;
    timestamp?: number;
    readingTime?: ReadingTime;
  };

  /** Nextra의 EvaluateResult (any 제거 버전) */
  export interface EvaluateResult {
    /** 렌더링할 MDX 컴포넌트 */
    default: ComponentType<Record<string, unknown>>;
    /** 목차 리스트 */
    toc: Heading[];
    /** front matter/metadata */
    metadata: NextraMetadata;
    /** 원본 MDX 소스 */
    sourceCode: string;
  }

  /**
   * content 디렉터리에서 MDX/Markdown 페이지를 불러옴
   */
  export function importPage(
    pathSegments?: string[],
    lang?: string
  ): Promise<EvaluateResult>;

  /**
   * Next.js generateStaticParams용 헬퍼
   */
  export function generateStaticParamsFor(
    segmentKey: string,
    localeSegmentKey?: string
  ): () => Promise<Array<Record<string, string | string[]>>>;
}

// CSS import용 선언
declare module "*.css";
