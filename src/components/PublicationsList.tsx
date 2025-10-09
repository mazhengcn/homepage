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

export function PublicationsList({ publications }: any) {
  return (
    <ItemGroup className="not-prose gap-6">
      {publications.map((pub, index) => {
        return (
          <Item key={pub.id} variant="outline">
            <ItemMedia variant="icon">{index + 1}</ItemMedia>
            <ItemContent>
              <ItemTitle>{pub.title}</ItemTitle>
              <ItemDescription className="text-foreground/80">
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
                      ? 'bg-lime-600 text-white dark:bg-lime-700'
                      : 'bg-orange-300 text-black'
                  } font-mono px-1`}
                >
                  {pub.status}
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
                <a href={`https://www.doi.org/${pub.doi}`}>URL</a>
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
