import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import type pubs from '@/db/publications.json'

type Publication = (typeof pubs)[number]

interface PublicationsListProps {
  publications: Publication[]
}

export function PublicationsList({ publications }: PublicationsListProps) {
  return (
    <ItemGroup className="not-prose gap-6">
      {publications.map((pub: Publication, index: number) => {
        // Format author names
        const authorString =
          pub.author
            ?.map(
              (a: { family: string; given: string }) => `${a.given} ${a.family}`
            )
            .join(', ') || 'Unknown Author'

        // Get journal name from container-title
        const journal = pub['container-title'] || ''

        // Extract year from issued.date-parts
        const year = pub.issued?.['date-parts']?.[0]?.[0] || 'N/A'

        // Determine status based on container-title or other fields
        const status =
          pub['container-title'] === 'arXiv' ? 'preprint' : 'published'

        return (
          <Item key={pub.id} variant="outline">
            <ItemMedia variant="icon">{index + 1}</ItemMedia>
            <ItemContent>
              <ItemTitle>{pub.title}</ItemTitle>
              <ItemDescription className="text-foreground/80">
                {authorString}
              </ItemDescription>
              <ItemDescription className="italic">{journal}</ItemDescription>
              <ItemDescription className="mt-1 flex w-full flex-wrap items-center gap-2 text-xs">
                <Badge className="font-mono tabular-nums px-1">{year}</Badge>
                <Badge
                  variant="secondary"
                  className={`${
                    status === 'published'
                      ? 'bg-lime-600 text-white dark:bg-lime-700'
                      : 'bg-orange-300 text-black'
                  } font-mono px-1`}
                >
                  {status}
                </Badge>
                {/* {pub.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="font-mono px-1">
                    {tag}
                  </Badge>
                ))} */}
              </ItemDescription>
            </ItemContent>
            <ItemActions className="flex-col">
              <Button variant="outline" size="sm">
                <a href={`https://www.doi.org/${pub.DOI}`}>URL</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/">PDF</a>
              </Button>
            </ItemActions>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
