import PortraitImage from "@/public/portrait.jpg"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

export const linkItems = [
  { text: "Research", url: "/research" },
  { text: "Publications", url: "/publications" },
]

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      transparentMode: "always",
      title: (
        <>
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="size-6 rounded-full"
          />
          Home
        </>
      ),
    },
    links: linkItems,
    // see https://fumadocs.dev/docs/ui/navigation/links
    githubUrl: "https://github.com/mazhengcn",
  }
}
