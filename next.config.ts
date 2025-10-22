import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const withMDX = createMDX({})

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  // pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
