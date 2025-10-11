import createMDX from "@next/mdx"

const resolvePath = (path: string) => {
  return require.resolve(path)
}

const readingTimePluginPath = resolvePath("./src/lib/remark-reading-time")
const lastModifiedPluginPath = resolvePath("./src/lib/remark-last-modified")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
