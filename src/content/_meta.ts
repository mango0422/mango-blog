import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    title: "홈",
    display: "hidden",
    theme: {
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
    },
  },
  hexagonal: { title: "Hexagonal Architecture", type: "page" },
  springboot: { title: "SpringBoot", type: "page" },
  til: { title: "TIL", type: "page" },
  "---": { type: "separator" },
  settings: {
    title: "설정",
    type: "page",
    theme: {
      toc: false,
      pagination: false,
    },
  },
};

export default meta;
