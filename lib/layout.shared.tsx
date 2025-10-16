import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { IoLogoGithub } from "react-icons/io5"

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
      title: "Home",
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      { text: "Research", url: "/research" },
      { text: "Publications", url: "/publications" },
      {
        icon: <IoLogoGithub />,
        text: "GitHub",
        url: "https://github.com/mazhengcn",
      },
    ],
  }
}
