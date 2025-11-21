// src/app/[[...mdxPath]]/page.tsx
import { generateStaticParamsFor, importPage } from "nextra/pages";
import type { Heading, NextraMetadata } from "nextra/pages";
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

type WrapperProps = {
  children?: ReactNode;
  toc?: Heading[]; // global.d.ts에서 가져온 타입
  metadata?: NextraMetadata;
  sourceCode?: string;
};

// 1) 컴포넌트 한 번 받아오고
const components = getMDXComponents();

const Wrapper: ComponentType<WrapperProps> =
  (components.wrapper as ComponentType<WrapperProps>) ??
  (({ children }) => <>{children}</>);

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
