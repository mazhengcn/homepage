import { DocsLayout } from "fumadocs-ui/layouts/docs"
import BackToTopButton from "@/components/back-to-top"
import Footer from "@/components/footer"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
      <BackToTopButton />
      <Footer />
    </DocsLayout>
  )
}
