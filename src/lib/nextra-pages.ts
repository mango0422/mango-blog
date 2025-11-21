// src/lib/nextra-pages.ts
import { normalizePages } from "nextra/normalize-pages";
import { getPageMap } from "nextra/page-map";

export async function getDirectoryPages(route: string) {
  const { directories } = normalizePages({
    list: await getPageMap(route),
    route,
  });

  return directories;
}
