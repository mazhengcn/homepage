import { remarkMdxFiles } from "fumadocs-core/mdx-plugins"
import { metaSchema, pageSchema } from "fumadocs-core/source/schema"
import { defineCollections, defineConfig, defineDocs } from "fumadocs-mdx/config"
import lastModified from "fumadocs-mdx/plugins/last-modified"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import { z } from "zod"

import remarkReadingTime from "@/lib/remark-plugins/remark-reading-time.mjs"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      created: z.iso.date().or(z.date()).optional(),
      updated: z.iso.date().or(z.date()).optional(),
    }),
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: {
    schema: metaSchema,
  },
})

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: pageSchema.extend({
    author: z.string().optional(),
    date: z.iso.date().or(z.date()).optional(),
  }),
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxFiles, remarkReadingTime],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    valueToExport: ["readingTime"],
  },
  plugins: [lastModified()],
})
