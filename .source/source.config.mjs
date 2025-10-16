// source.config.ts
import { remarkMdxFiles } from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// lib/remark-plugins/remark-reading-time.mjs
import { toString as mdaToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
function remarkReadingTime() {
  return (tree, file) => {
    const textOnPage = mdaToString(tree);
    const readingTime = getReadingTime(textOnPage);
    file.data.readingTime = readingTime;
  };
}

// source.config.ts
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxFiles, remarkReadingTime],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    valueToExport: ["readingTime"]
  },
  lastModifiedTime: "git"
});
export {
  source_config_default as default,
  docs
};
