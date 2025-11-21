// src/app/[[...mdxPath]]/page.tsx
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type { ReactNode, ComponentType } from "react";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

type MdxParams = {
  mdxPath?: string[];
};

type PageProps = {
  params: Promise<MdxParams>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath ?? []);
  return metadata;
}

// 1) 컴포넌트 한 번 받아오고
const components = getMDXComponents();

// 2) wrapper 없으면 fallback 컴포넌트 사용
const Wrapper: ComponentType<{
  children?: ReactNode;
  toc?: unknown;
  metadata?: unknown;
  sourceCode?: unknown;
}> =
  (components.wrapper as ComponentType<{
    children?: ReactNode;
    toc?: unknown;
    metadata?: unknown;
    sourceCode?: unknown;
  }>) ?? (({ children }) => <>{children}</>);

export default async function Page(props: PageProps) {
  const params = await props.params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath ?? []);

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
