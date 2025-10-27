import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type * as PageTree from "fumadocs-core/page-tree"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

export default function Students({ metas }: { metas: PageTree.Node[] }) {
  return (
    <ItemGroup className="not-prose flex flex-col gap-6">
      {metas.map((meta) => {
        return (
          <Item key={meta.$id} variant="outline" asChild>
            <Link href={`/docs/${meta.$id}`}>
              <ItemMedia className="group-has-[[data-slot=item-description]]/item:translate-y-0 group-has-[[data-slot=item-description]]/item:self-center">
                <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                  <Avatar className="hidden sm:flex">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="hidden sm:flex">
                    <AvatarImage
                      src="https://github.com/maxleiter.png"
                      alt="@maxleiter"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-lg">{meta.name}</ItemTitle>
                <ItemDescription className="text-lg">
                  {/* @ts-expect-error this is intentional */}
                  {meta.description}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4" />
              </ItemActions>
            </Link>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
