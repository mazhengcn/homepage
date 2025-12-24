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
  {
    type: "menu" as const,
    text: "Research",
    url: "/research",
    items: [
      {
        text: "Kinetic Equations",
        description: "AI for kinetic equations",
        url: "/docs/kinetic",
      },
      {
        text: "Inverse Problems",
        description: "AI for PDE inverse problems",
        url: "/docs/inverse",
      },
      {
        text: "Fusion Confinement",
        description: "AI for fusion confinement",
        url: "/docs/fusion",
      },
    ],
  },
  { text: "Publications", url: "/publications" },
  { text: "Talks", url: "/talks" },
  { text: "Blog", url: "/blog" },
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
    // see https://fumadocs.dev/docs/ui/navigation/links
    githubUrl: "https://github.com/mazhengcn",
  }
}
