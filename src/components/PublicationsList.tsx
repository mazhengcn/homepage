import { Badge } from '@/components/ui/badge'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { ExternalLinkIcon } from 'lucide-react'
import React from 'react'

interface Publications {
  id: string
  title: string
  author: string
  journal: string
  year: number
  pages: number
  volume: number
  status: 'published' | 'in-review' | 'preprint'
  tags?: string[]
  url?: string
  pdflink?: string
}

export function PublicationsList({
  publications,
}: {
  publications: Publications[]
}) {
  return (
    <ItemGroup className="not-prose gap-6">
      {publications.map(pub => {
        return (
          <Item key={pub.id} variant="outline" asChild>
            <a href={pub.url || pub.pdflink} target="_blank" rel="noreferrer">
              <ItemMedia variant="icon">100</ItemMedia>
              <ItemContent>
                <ItemTitle>{pub.title}</ItemTitle>
                <ItemDescription className="text-foreground/75">
                  {pub.author}
                </ItemDescription>
                <ItemDescription className="italic">
                  {pub.journal}
                </ItemDescription>
                <ItemDescription className="mt-1 flex w-full flex-wrap items-center gap-2 text-xs">
                  <Badge className="font-mono tabular-nums px-1">
                    {pub.year}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={`${
                      pub.status === 'published'
                        ? 'bg-green-700 text-white dark:bg-green-600'
                        : 'bg-yellow-400 text-black dark:bg-yellow-300'
                    } font-mono px-1`}
                  >
                    {pub.status}
                  </Badge>
                  {pub.tags.map(tag => (
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
              <ItemActions>
                <ExternalLinkIcon className="size-4" />
              </ItemActions>
            </a>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
