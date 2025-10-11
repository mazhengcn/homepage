import createMDX from "@next/mdx"

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
    ],
    rehypePlugins: [
      // With options
      ["rehype-katex", { strict: true, throwOnError: true }],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
