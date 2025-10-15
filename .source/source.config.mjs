// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
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
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    valueToExport: ["readingTime"]
  },
  lastModifiedTime: "git"
});
export {
  source_config_default as default,
  docs
};
