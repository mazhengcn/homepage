// source.config.ts
import { remarkMdxFiles } from "fumadocs-core/mdx-plugins";
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";

// lib/remark-plugins/remark-reading-time.mjs
import { toString as mdaToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
function remarkReadingTime() {
  return (tree, vfile) => {
    const textOnPage = mdaToString(tree);
    const readingTime = getReadingTime(textOnPage);
    vfile.data.readingTime = readingTime;
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
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.iso.date().or(z.date())
  })
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
  blog,
  source_config_default as default,
  docs
};
