import ResearchAreas from "@/components/research-areas"
import Students from "@/components/students"
import { source } from "@/lib/source"

export default function ResearchPage() {
  const pageTreeMeta = source.pageTree.children
  return (
    <>
      <section className="mt-12">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Research Interests
        </h1>
        <p className="mt-10 mb-8 indent-8 text-lg">
          Welcome to my homepage, I&apos;m a mathematician and tech enthusiast.
          My research interests include computational mathematics and deep
          learning methods. I am particularly interested in the interplay
          between deep learning and mathematics, and how deep learning methods
          can be applied to solve problems in mathematical and engineering.
        </p>
      </section>
      <ResearchAreas metas={pageTreeMeta} />
      <section className="mt-10">
        <h1 className="mt-10 mb-10 text-center text-3xl font-bold md:text-5xl">
          Ph.D. Students
        </h1>
        <Students metas={pageTreeMeta} />
      </section>
    </>
  )
}
