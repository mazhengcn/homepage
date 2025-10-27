import { PublicationList } from "@/components/publication-list"
import pubs from "@/lib/db/publications.json"

pubs.sort((a, b) => {
  //@ts-expect-error this is intentional
  const yearA = (a.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  //@ts-expect-error this is intentional
  const yearB = (b.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  return yearB - yearA
})

export default function PublicationsPage() {
  return (
    <div className="pt-10">
      <section>
        <h1 className="text-center text-5xl font-bold">Publications</h1>
      </section>
      <section className="mt-10 items-center">
        <PublicationList publications={pubs} />
      </section>
    </div>
  )
}
