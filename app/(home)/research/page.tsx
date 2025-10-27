import ResearchAreas from "@/components/research-areas"
import Students from "@/components/students"
import { source } from "@/lib/source"

export default function ResearchPage() {
  const pageTreeMeta = source.pageTree.children
  console.log(source.pageTree)
  return (
    <>
      <section className="mt-12">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Research Interests
        </h1>
        <p className="mb-8 indent-8 text-lg">
          Welcome to my homepage, I&apos;m a mathematician and tech enthusiast.
          My research interests include computational mathematics and deep
          learning methods. I am particularly interested in the interplay
          between deep learning and mathematics, and how deep learning methods
          can be applied to solve problems in mathematical and engineering.
        </p>
      </section>
      <ResearchAreas metas={pageTreeMeta} />
      <hr />
      <section>
        <h1>Students</h1>
        <Students metas={pageTreeMeta} />
      </section>
    </>
  )
}
