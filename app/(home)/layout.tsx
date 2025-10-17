import { HomeLayout } from "fumadocs-ui/layouts/home"
import BackToTopButton from "@/components/back-to-top"
import Footer from "@/components/footer"
import { baseOptions, linkItems } from "@/lib/layout.shared"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout {...baseOptions()} links={linkItems}>
      <main>
        <article className="prose prose-lg dark:prose-invert prose-a:no-underline mx-auto max-w-5xl px-8">
          {children}
        </article>
      </main>
      <BackToTopButton />
      <Footer />
    </HomeLayout>
  )
}
