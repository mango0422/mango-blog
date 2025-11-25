// src/mdx-components.tsx
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import { Steps, Tabs, FileTree } from "nextra/components";
import { Callout } from "@/components/mdx/Callout";
import { Solution } from "@/components/mdx/Solution";
import { Complexity } from "@/components/mdx/Complexity";
import { JavaDoc } from "@/components/mdx/JavaDoc";
import { CodeAlign } from "@/components/mdx/CodeAlign";

const themeComponents = getThemeComponents();

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

    ...components,
  };
}
