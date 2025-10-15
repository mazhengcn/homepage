// import createMDX from "@next/mdx"

import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

// const readingTimePluginPath = require.resolve(
//   "@/lib/markdown-plugins/remark-reading-time",
// )
// const lastModifiedPluginPath = require.resolve(
//   "@/lib/markdown-plugins/remark-last-modified",
// )

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   extension: /\.(md|mdx)$/,
//   options: {
//     remarkPlugins: [
//       "remark-gfm",
//       "remark-math",
//       readingTimePluginPath,
//       lastModifiedPluginPath,
//     ],
//     rehypePlugins: ["rehype-katex"],
//   },
// })

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  // pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
