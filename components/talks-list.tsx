"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search } from "lucide-react"
import { useMemo, useState } from "react"

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

interface TalksListProps {
  talks: TalkInfo[]
}

export function TalksList({ talks }: TalksListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTalks = useMemo(() => {
    if (!searchQuery.trim()) {
      return talks
    }

    const query = searchQuery.toLowerCase()

    return talks.filter((talk) => {
      // Search in title
      const title = talk.metadata.title?.toLowerCase() || ""
      if (title.includes(query)) return true

      // Search in dirname
      if (talk.dirname.toLowerCase().includes(query)) return true

      // Search in layout
      const layout = talk.metadata.layout?.toString().toLowerCase() || ""
      if (layout.includes(query)) return true

      // Search in colorSchema
      const colorSchema =
        talk.metadata.colorSchema?.toString().toLowerCase() || ""
      if (colorSchema.includes(query)) return true

      // Search in highlighter
      const highlighter =
        talk.metadata.highlighter?.toString().toLowerCase() || ""
      if (highlighter.includes(query)) return true

      return false
    })
  }, [talks, searchQuery])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search talks by title, date, theme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTalks.map((talk) => (
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

      {filteredTalks.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          {searchQuery
            ? `No talks found matching "${searchQuery}"`
            : "No talks found."}
        </div>
      )}
    </div>
  )
}
