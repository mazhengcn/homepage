import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import remarkReadingTime from "@/lib/remark-plugins/remark-reading-time.mjs"

export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    valueToExport: ["readingTime"],
  },
  lastModifiedTime: "git",
})
