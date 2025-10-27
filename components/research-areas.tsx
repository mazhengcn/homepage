import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type * as PageTree from "fumadocs-core/page-tree"
import Image from "next/image"
import Link from "next/link"

export default function ResearchAreas({ metas }: { metas: PageTree.Node[] }) {
  return (
    <ItemGroup className="not-prose grid grid-cols-3 gap-4">
      {metas.map((meta) => (
        <Item key={meta.$id} variant="outline" asChild>
          <Link href={`/docs/${meta.$id}`}>
            <ItemHeader>
              <Image
                src={meta.image}
                alt={meta.$id}
                width={640}
                height={640}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
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
          </Link>
        </Item>
      ))}
    </ItemGroup>
  )
}
