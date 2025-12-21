import matter from "gray-matter"
import { TalksList } from "./talks-list"

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

interface GitHubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: "file" | "dir"
}

interface SlideMetadata {
  title?: string
  layout?: string
  colorSchema?: string
  [key: string]: string | boolean | number | undefined
}

interface TalkInfo {
  dirname: string
  metadata: SlideMetadata
  html_url: string
}

async function getRepoContents(): Promise<GitHubContent[]> {
  const username = "mazhengcn"
  const repo = "talks"
  const path = "talks"

  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/contents/${path}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  )

  if (!res.ok) {
    throw new Error("Failed to fetch repo contents")
  }

  return res.json()
}

async function getSlidesMetadata(
  username: string,
  repo: string,
  dirname: string,
): Promise<SlideMetadata | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${username}/${repo}/main/talks/${dirname}/slides.md`,
      {
        next: { revalidate: 3600 },
      },
    )

    if (!res.ok) {
      return null
    }

    const content = await res.text()
    const { data } = matter(content)

    return data as SlideMetadata
  } catch (error) {
    console.error(`Failed to fetch slides.md for ${dirname}:`, error)
    return null
  }
}

async function getTalksInfo(): Promise<TalkInfo[]> {
  const username = "mazhengcn"
  const repo = "talks"

  const contents = await getRepoContents()

  // Filter only directories
  const directories = contents.filter((item) => item.type === "dir")

  // Fetch metadata for each directory
  const talksInfo = await Promise.all(
    directories.map(async (dir) => {
      const metadata = await getSlidesMetadata(username, repo, dir.name)
      return {
        dirname: dir.name,
        metadata: metadata || {},
        html_url: dir.html_url,
      }
    }),
  )

  // Sort by dirname in descending order (newest first)
  return talksInfo.sort((a, b) => b.dirname.localeCompare(a.dirname))
}

function filterTalks(talks: TalkInfo[], query: string): TalkInfo[] {
  if (!query.trim()) {
    return talks
  }

  const normalizedQuery = query.toLowerCase()

  return talks.filter((talk) => {
    // Search in title
    const title = talk.metadata.title?.toLowerCase() || ""
    if (title.includes(normalizedQuery)) return true

    // Search in dirname
    if (talk.dirname.toLowerCase().includes(normalizedQuery)) return true

    // Search in layout
    const layout = talk.metadata.layout?.toString().toLowerCase() || ""
    if (layout.includes(normalizedQuery)) return true

    // Search in colorSchema
    const colorSchema =
      talk.metadata.colorSchema?.toString().toLowerCase() || ""
    if (colorSchema.includes(normalizedQuery)) return true

    // Search in highlighter
    const highlighter =
      talk.metadata.highlighter?.toString().toLowerCase() || ""
    if (highlighter.includes(normalizedQuery)) return true

    return false
  })
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams
  const allTalks = await getTalksInfo()
  const filteredTalks = filterTalks(allTalks, q || "")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Talks & Presentations</h1>

      <TalksList talks={filteredTalks} searchQuery={q} />
    </div>
  )
}
