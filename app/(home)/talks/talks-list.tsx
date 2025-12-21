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
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

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
  searchQuery?: string
}

export function TalksList({ talks, searchQuery = "" }: TalksListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [inputValue, setInputValue] = useState(searchQuery)

  // Debounce the URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (inputValue) {
        params.set("q", inputValue)
      } else {
        params.delete("q")
      }

      const newUrl = inputValue ? `?${params.toString()}` : ""

      startTransition(() => {
        router.push(newUrl || "?", { scroll: false })
      })
    }, 300) // 300ms debounce delay

    return () => clearTimeout(timer)
  }, [inputValue, router, searchParams])

  // Sync input value with searchParams when navigating back/forward
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search talks by title, date, theme..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10"
        />
        {isPending && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

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
          {searchQuery
            ? `No talks found matching "${searchQuery}"`
            : "No talks found."}
        </div>
      )}
    </div>
  )
}
