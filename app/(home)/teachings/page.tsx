import { TeachingsList } from "@/components/teachings-list"
import type {
  TeachingMetadata,
  TeachingsCollection,
} from "@/types/teachings-metadata"

interface TeachingInfo {
  id: string
  title: string
  date: string
  language?: string
  slidesUrl: string
  pdfUrl?: string
  sourceUrl?: string
  previewImage?: string
}

async function getTeachingsMetadata(): Promise<TeachingsCollection> {
  const res = await fetch(
    "https://zheng-teachings.netlify.app/teachings-metadata.json",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  )

  if (!res.ok) {
    throw new Error("Failed to fetch teachings metadata")
  }

  return res.json()
}

function transformTeachingMetadata(teaching: TeachingMetadata): TeachingInfo {
  const slidesUrl =
    teaching.slidesUrl ||
    `https://zheng-teachings.netlify.app/${teaching.id}`

  // Generate preview image URL (Slidev exports og-image.png with 16:9 ratio)
  const previewImage = `${slidesUrl}og-image.png`

  return {
    id: teaching.id,
    title: teaching.title,
    date: teaching.date,
    language: teaching.language,
    slidesUrl,
    pdfUrl: teaching.pdfUrl,
    sourceUrl: teaching.sourceUrl,
    previewImage,
  }
}

async function getTeachingsInfo(): Promise<TeachingInfo[]> {
  const collection = await getTeachingsMetadata()

  const teachings = collection.teachings
    .filter((teaching) => teaching.published !== false)
    .map(transformTeachingMetadata)

  // Sort by date in descending order (newest first)
  return teachings.sort((a, b) => b.date.localeCompare(a.date))
}

export default async function Page() {
  const teachings = await getTeachingsInfo()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Teachings</h1>

      <TeachingsList teachings={teachings} />
    </div>
  )
}
