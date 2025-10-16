import { PublicationList } from "@/components/publication-list"
import pubs from "@/lib/db/publications.json"

pubs.sort((a, b) => {
  // @ts-ignore biome-ignore: lint/suspicious/noUnsafeMemberAccess: Accessing nested properties without checks
  const yearA = (a.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  // @ts-ignore biome-ignore: lint/suspicious/noUnsafeMemberAccess: Accessing nested properties without checks
  const yearB = (b.issued?.["date-parts"]?.[0]?.[0] as number) || 0
  return yearB - yearA
})

export default function PublicationsPage() {
  return (
    <div className="pt-10">
      <section>
        <h1 className="text-center">Publications</h1>
      </section>
      <section className="items-center">
        <PublicationList publications={pubs} />
      </section>
    </div>
  )
}
