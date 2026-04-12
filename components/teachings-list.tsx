"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Code2,
  FileText,
  Search,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

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

interface TeachingsListProps {
  teachings: TeachingInfo[]
}

export function TeachingsList({ teachings }: TeachingsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTeachings = useMemo(() => {
    if (!searchQuery.trim()) return teachings

    const query = searchQuery.toLowerCase()
    return teachings.filter((teaching) => {
      const title = teaching.title.toLowerCase()
      if (title.includes(query)) return true
      if (teaching.id.toLowerCase().includes(query)) return true
      return false
    })
  }, [teachings, searchQuery])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-75 flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 transition-shadow focus-visible:shadow-md"
          />
        </div>
      </div>

      {filteredTeachings.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No courses found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          Showing {filteredTeachings.length} of {teachings.length} course
          {teachings.length !== 1 ? "s" : ""}
        </div>
      )}

      {filteredTeachings.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeachings.map((teaching) => (
            <Link
              key={teaching.id}
              href={teaching.slidesUrl}
              className="group block"
            >
              <Card className="relative flex h-full flex-col overflow-hidden border-border/40 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-border/50 dark:hover:border-primary/60">
                {/* Preview Area */}
                <div className="relative -mt-6 aspect-video w-full overflow-hidden bg-linear-to-br from-primary/8 to-primary/3">
                  {teaching.previewImage ? (
                    <>
                      <Image
                        src={teaching.previewImage}
                        alt={`Preview of ${teaching.title}`}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15 group-hover:shadow-md">
                          <BookOpen className="h-10 w-10 text-primary/60" />
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

                <CardHeader className="flex flex-1 flex-col space-y-3 px-5">
                  <div className="space-y-2">
                    <CardTitle className="line-clamp-2 text-base leading-snug font-semibold transition-colors group-hover:text-primary">
                      {teaching.title}
                    </CardTitle>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      <span>{teaching.date}</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-2.5 pt-2">
                    {/* Action Buttons */}
                    {(teaching.pdfUrl || teaching.sourceUrl) && (
                      <div className="flex gap-2">
                        {teaching.pdfUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(
                                teaching.pdfUrl,
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
                        {teaching.sourceUrl && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(
                                teaching.sourceUrl,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }}
                            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                          >
                            <Code2 className="h-3.5 w-3.5" />
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
