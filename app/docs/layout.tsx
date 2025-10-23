import BackToTopButton from "@/components/back-to-top"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"
import fumadocsLogo from "@/public/fumadocs-logo.png"
import { DocsLayout } from "fumadocs-ui/layouts/notebook"
import Image from "next/image"
import Link from "next/link"

const today = new Date()

function SideFooter() {
  return (
    <footer className="flex items-center justify-center p-4 text-center text-zinc-500">
      &copy; {today.getFullYear()} Powered by
      <Link href="https://fumadocs.dev/">
        <Image src={fumadocsLogo} alt="Next.js Logo" className="inline w-14" />
      </Link>
    </footer>
  )
}

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions()}
      sidebar={{ footer: SideFooter }}
      tree={source.pageTree}
    >
      {children}
      <BackToTopButton />
    </DocsLayout>
  )
}
