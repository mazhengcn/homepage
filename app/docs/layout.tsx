import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import BackToTopButton from "@/components/back-to-top"
import Footer from "@/components/footer"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"

export default function Layout({ children }: LayoutProps<"/docs">) {
  const { nav, ...base } = baseOptions();
  return (
    <DocsLayout {...base}  tabMode="sidebar" nav={{ ...nav, mode: 'top' }} tree={source.pageTree}>
      {children}
      <BackToTopButton />
      <Footer />
    </DocsLayout>
  )
}
