// src/mdx-components.tsx
import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import { Callout } from "@/components/mdx/Callout";

const themeComponents = getThemeComponents();

export function useMDXComponents(
  components: MDXComponents = {} as MDXComponents
): MDXComponents {
  return {
    ...themeComponents,

    Callout, // <- MDX에서 <Callout> 사용 가능

    ...components,
  };
}
