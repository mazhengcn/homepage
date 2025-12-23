"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowUpRight,
  Calendar,
  FileText,
  Github,
  Presentation,
  Search,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

interface SlideMetadata {
  title?: string
  date?: string
  event?: string
  location?: string
  description?: string
  tags?: string[]
  theme?: string
  layout?: string
}

interface TalkInfo {
  dirname: string
  metadata: SlideMetadata
  html_url: string
  displayDate?: string
  previewImage?: string
  pdfUrl?: string
  sourceUrl?: string
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
      const title = talk.metadata.title?.toLowerCase() || ""
      if (title.includes(query)) return true

      const description = talk.metadata.description?.toLowerCase() || ""
      if (description.includes(query)) return true

      const event = talk.metadata.event?.toLowerCase() || ""
      if (event.includes(query)) return true

      const location = talk.metadata.location?.toLowerCase() || ""
      if (location.includes(query)) return true

      if (talk.dirname.toLowerCase().includes(query)) return true

      const tags = talk.metadata.tags || []
      if (tags.some((tag) => tag.toLowerCase().includes(query))) return true

      return false
    })
  }, [talks, searchQuery])

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search presentations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      {searchQuery && filteredTalks.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {filteredTalks.length} result{filteredTalks.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Empty State */}
      {filteredTalks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <Presentation className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">
            {searchQuery
              ? "No presentations found"
              : "No presentations available"}
          </p>
          {searchQuery && (
            <p className="mt-1 text-sm text-muted-foreground/70">
              Try different search terms
            </p>
          )}
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTalks.map((talk) => (
            <Link
              key={talk.dirname}
              href={talk.html_url}
              className="group block"
            >
              <Card className="relative flex h-full flex-col overflow-hidden border-border/40 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-border/50 dark:hover:border-primary/60">
                {/* Preview Area */}
                <div className="relative -mt-6 aspect-video w-full overflow-hidden bg-linear-to-br from-primary/8 to-primary/3">
                  {talk.previewImage ? (
                    <>
                      {/* Preview Image */}
                      <Image
                        src={talk.previewImage}
                        alt={`Preview of ${talk.metadata.title || talk.dirname}`}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      {/* Overlay gradient for better text readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      {/* Subtle pattern fallback */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />

                      {/* Center content fallback */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15 group-hover:shadow-md">
                          <span className="text-4xl font-bold text-primary">
                            {talk.dirname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hover indicator */}
                  <div className="absolute top-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <CardHeader className="flex flex-1 flex-col space-y-3 p-5">
                  <div className="space-y-2">
                    <CardTitle className="line-clamp-2 text-base leading-snug font-semibold transition-colors group-hover:text-primary">
                      {talk.metadata.title || talk.dirname}
                    </CardTitle>

                    {talk.metadata.description && (
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {talk.metadata.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {talk.metadata.event && (
                      <div className="flex items-center gap-2">
                        <Presentation className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                        <span className="line-clamp-1 font-medium">
                          {talk.metadata.event}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                        <span>{talk.displayDate || talk.dirname}</span>
                      </div>
                      {talk.metadata.location && (
                        <>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="line-clamp-1">
                            {talk.metadata.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto space-y-2.5 pt-2">
                    {/* Tags */}
                    {(talk.metadata.tags || talk.metadata.theme) && (
                      <div className="flex flex-wrap gap-1.5">
                        {talk.metadata.tags?.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="h-6 px-2.5 text-xs font-medium"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {talk.metadata.theme && (
                          <Badge
                            variant="outline"
                            className="h-6 px-2.5 text-xs font-medium"
                          >
                            {talk.metadata.theme}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {(talk.pdfUrl || talk.sourceUrl) && (
                      <div className="flex gap-2">
                        {talk.pdfUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(
                                talk.pdfUrl,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            PDF
                          </button>
                        )}
                        {talk.sourceUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(
                                talk.sourceUrl,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            <Github className="h-3.5 w-3.5" />
                            Source
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
