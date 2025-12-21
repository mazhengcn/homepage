import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import matter from "gray-matter"
import { ExternalLink } from "lucide-react"

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

export default async function Page() {
  const talks = await getTalksInfo()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Talks & Presentations</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk) => (
          <Card
            key={talk.dirname}
            className="transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-2xl">
                {talk.metadata.title || talk.dirname}
              </CardTitle>
              <CardDescription>{talk.dirname}</CardDescription>
            </CardHeader>

            {talk.metadata && Object.keys(talk.metadata).length > 0 && (
              <CardContent>
                <div className="grid gap-2">
                  {talk.metadata.layout && (
                    <div className="flex gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Layout:
                      </span>
                      <span className="text-sm">{talk.metadata.layout}</span>
                    </div>
                  )}
                  {talk.metadata.colorSchema && (
                    <div className="flex gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Theme:
                      </span>
                      <span className="text-sm">
                        {talk.metadata.colorSchema}
                      </span>
                    </div>
                  )}
                  {talk.metadata.highlighter && (
                    <div className="flex gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Highlighter:
                      </span>
                      <span className="text-sm">
                        {talk.metadata.highlighter}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            )}

            <CardFooter>
              <a
                href={talk.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>

      {talks.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No talks found.
        </div>
      )}
    </div>
  )
}
