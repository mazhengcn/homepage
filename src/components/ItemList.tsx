import * as React from 'react'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  ItemActions,
  ItemMedia,
} from '@/components/ui/item'
import { ExternalLinkIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface Publications {
  id: string
  title: string
  author: string
  journal: string
  year: number
  pages: number
  volume: number
}

export function ItemList({ publications }: { publications: Publications[] }) {
  return (
    <ItemGroup className="not-prose gap-6">
      {publications.map(pub => {
        return (
          <Item key={pub.id} variant="outline" asChild>
            <a href="/">
              <ItemMedia variant="icon">100</ItemMedia>
              <ItemContent>
                <ItemTitle>{pub.title}</ItemTitle>
                <ItemDescription>{pub.author}</ItemDescription>
                <ItemDescription className="italic">
                  {pub.journal}
                </ItemDescription>
                <ItemDescription className="flex w-full flex-wrap items-center gap-2 text-xs">
                  <Badge className="font-mono tabular-nums">2024</Badge>
                  <Badge
                    variant="secondary"
                    className="bg-green-700 text-white dark:bg-green-600"
                  >
                    Journal
                  </Badge>
                  <Badge variant="destructive">Preprint</Badge>
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
