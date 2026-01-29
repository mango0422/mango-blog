// src/mdx-components.tsx
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import { Steps, Tabs, FileTree } from "nextra/components";
import { Callout } from "@/components/mdx/Callout";
import { Solution } from "@/components/mdx/Solution";
import { Complexity } from "@/components/mdx/Complexity";
import { JavaDoc } from "@/components/mdx/JavaDoc";
import { CodeAlign } from "@/components/mdx/CodeAlign";
import { Mermaid } from "@/components/Mermaid";
import type { ComponentProps, ReactElement } from "react";

const themeComponents = getThemeComponents();

function Pre({ children, ...props }: ComponentProps<"pre">) {
  const codeElement = children as ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (
    codeElement?.props?.className?.includes("language-mermaid") &&
    typeof codeElement?.props?.children === "string"
  ) {
    return <Mermaid chart={codeElement.props.children} />;
  }

  const ThemePre = themeComponents.pre;
  if (ThemePre) {
    return <ThemePre {...props}>{children}</ThemePre>;
  }
  return <pre {...props}>{children}</pre>;
}

export function useMDXComponents(
  components: MDXComponents = {} as MDXComponents
): MDXComponents {
  return {
    ...themeComponents,

    Steps,
    Tabs,
    FileTree,
    Callout,
    Solution,
    Complexity,
    JavaDoc,
    CodeLayout: CodeAlign,
    pre: Pre,

    ...components,
  };
}
