"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, Calendar, Presentation, Search } from "lucide-react"
import Link from "next/link"
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
      const title = talk.metadata.title?.toLowerCase() || ""
      if (title.includes(query)) return true

      if (talk.dirname.toLowerCase().includes(query)) return true

      const colorSchema =
        talk.metadata.colorSchema?.toString().toLowerCase() || ""
      if (colorSchema.includes(query)) return true

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredTalks.map((talk) => (
            <Link
              key={talk.dirname}
              href={talk.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Card className="relative h-full overflow-hidden transition-all duration-300 hover:border-primary/60 hover:shadow-lg">
                {/* Preview Area */}
                <div className="relative -mt-6 aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary/8 to-primary/3">
                  {/* Subtle pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15 group-hover:shadow-md">
                      <span className="text-4xl font-bold text-primary">
                        {talk.dirname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-3 right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-2 min-h-[3.5rem] text-lg leading-tight transition-colors group-hover:text-primary">
                    {talk.metadata.title || talk.dirname}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {talk.dirname}
                  </CardDescription>
                </CardHeader>

                {/* Badges */}
                {(talk.metadata.colorSchema || talk.metadata.layout) && (
                  <CardContent className="flex min-h-[2rem] flex-wrap gap-1.5">
                    {talk.metadata.colorSchema && (
                      <Badge variant="secondary" className="h-6 px-2.5 text-xs">
                        {talk.metadata.colorSchema}
                      </Badge>
                    )}
                    {talk.metadata.layout && (
                      <Badge variant="outline" className="h-6 px-2.5 text-xs">
                        {talk.metadata.layout}
                      </Badge>
                    )}
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
