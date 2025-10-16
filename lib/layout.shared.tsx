import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"
import PortraitImage from "@/public/portrait.jpg"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
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
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      { text: "Research", url: "/research" },
      { text: "Publications", url: "/publications" },
    ],
    githubUrl: "https://github.com/mazhengcn",
  }
}
