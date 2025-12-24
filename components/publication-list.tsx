"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type pubs from "@/lib/db/publications.json"
import { Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

type Publication = (typeof pubs)[number]

interface PublicationsListProps {
  publications: Publication[]
  showSearch?: boolean
}

export function PublicationList({
  publications,
  showSearch = true,
}: PublicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const totalNum = publications.length

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) {
      return publications
    }

    const query = searchQuery.toLowerCase()

    return publications.filter((pub) => {
      // Search in title
      if (pub.title?.toLowerCase().includes(query)) return true

      // Search in author names
      const authorString =
        pub.author
          ?.map((a: { family: string; given: string }) =>
            `${a.given} ${a.family}`.toLowerCase(),
          )
          .join(" ") || ""
      if (authorString.includes(query)) return true

      // Search in year
      const year = pub.issued?.["date-parts"]?.[0]?.[0]?.toString() || ""
      if (year.includes(query)) return true

      // Search in type
      const type =
        pub.type === "article-journal"
          ? "journal"
          : pub.type === "paper-conference"
            ? "conference"
            : pub.type === "chapter"
              ? "chapter"
              : "other"
      if (type.includes(query)) return true

      // Search in tags
      if (pub.tags?.some((tag) => tag.toLowerCase().includes(query)))
        return true

      // Search in journal/container-title
      if (pub["container-title"]?.toLowerCase().includes(query)) return true

      return false
    })
  }, [publications, searchQuery])

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search publications by title, author, year, type, tags, or journal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}
      {filteredPublications.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          No publications found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        showSearch && (
          <div className="text-sm text-muted-foreground">
            Showing {filteredPublications.length} of {totalNum} publication
            {totalNum !== 1 ? "s" : ""}
          </div>
        )
      )}
      <ItemGroup className="gap-6">
        {filteredPublications.map((pub: Publication, index: number) => {
          // Format author names
          const authorString =
            pub.author
              ?.map(
                (a: { family: string; given: string }) =>
                  `${a.given} ${a.family}`,
              )
              .join(", ") || "Unknown Author"

          // Get journal name from container-title
          const journal = pub["container-title"] || ""

          const type =
            pub.type === "article-journal"
              ? "journal"
              : pub.type === "paper-conference"
                ? "conference"
                : pub.type === "chapter"
                  ? "chapter"
                  : "other"

          // Extract year from issued.date-parts
          const year = pub.issued?.["date-parts"]?.[0]?.[0] || "N/A"

          // Determine status based on container-title or other fields
          const status =
            pub["container-title"] === "arXiv"
              ? "preprint"
              : pub.issued.status
                ? pub.issued.status
                : "published"

          // PDF link
          const pdfLink =
            pub["pdf-link"] ?? `https://arxiv.org/pdf/${pub.arXiv}`

          return (
            <HoverCard key={pub.id}>
              <HoverCardTrigger asChild>
                <Item
                  variant="outline"
                  className="transition-colors hover:bg-accent/50"
                >
                  <ItemMedia variant="icon">{totalNum - index}</ItemMedia>
                  <ItemContent>
                    <ItemTitle className="font-semibold">{pub.title}</ItemTitle>
                    <ItemDescription className="text-foreground/80">
                      {authorString}
                    </ItemDescription>
                    <ItemDescription className="italic">
                      {journal}
                    </ItemDescription>
                    <ItemDescription className="mt-1 flex w-full flex-wrap items-center gap-2 text-xs">
                      <Badge className="px-1 font-mono tabular-nums">
                        {year}
                      </Badge>
                      <Badge variant="secondary" className="px-1 font-mono">
                        {type}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`${
                          status === "published"
                            ? "bg-lime-600 text-white dark:bg-lime-700"
                            : "bg-orange-300 text-black"
                        } px-1 font-mono`}
                      >
                        {status}
                      </Badge>
                      {pub.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="px-1 font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="flex-col">
                    <Button variant="outline" size="sm">
                      <Link href={`https://www.doi.org/${pub.DOI}`}>URL</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={pdfLink}>PDF</Link>
                    </Button>
                  </ItemActions>
                </Item>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto max-w-3xl bg-background/80 p-6 font-mono text-sm/relaxed backdrop-blur-md">
                {pub.abstract ? pub.abstract : "No abstract available."}
              </HoverCardContent>
            </HoverCard>
          )
        })}
      </ItemGroup>
    </div>
  )
}
