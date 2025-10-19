import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
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

type Publication = (typeof pubs)[number]

interface PublicationsListProps {
  publications: Publication[]
}

export function PublicationList({ publications }: PublicationsListProps) {
  const totalNum = publications.length
  return (
    <ItemGroup className="not-prose gap-6">
      {publications.map((pub: Publication, index: number) => {
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
          pub["container-title"] === "arXiv" ? "preprint" : "published"

        return (
          <HoverCard key={pub.id}>
            <HoverCardTrigger asChild>
              <Item
                variant="outline"
                className="hover:bg-accent/50 transition-colors"
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
                        className="font-mono px-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="flex-col">
                  <Button variant="outline" size="sm">
                    <a href={`https://www.doi.org/${pub.DOI}`}>URL</a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://arxiv.org/pdf/${pub.arXiv}`}>PDF</a>
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
  )
}
