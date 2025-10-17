import { remarkMdxFiles } from "fumadocs-core/mdx-plugins"
import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import remarkReadingTime from "@/lib/remark-plugins/remark-reading-time.mjs"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export const blog = defineCollections({
  dir: "content/blog",
  type: "doc",
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxFiles, remarkReadingTime],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    valueToExport: ["readingTime"],
  },
  lastModifiedTime: "git",
})
