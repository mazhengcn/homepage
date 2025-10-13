import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const readingTimePluginPath = require.resolve("./src/lib/remark-reading-time")
const lastModifiedPluginPath = require.resolve("./src/lib/remark-last-modified")

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    reactCompiler: true,
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      // Without options
      "remark-gfm",
      "remark-math",
      readingTimePluginPath,
      lastModifiedPluginPath,
    ],
    rehypePlugins: [
      // With options
      "rehype-katex",
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
