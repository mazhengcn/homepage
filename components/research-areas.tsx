import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import type * as PageTree from "fumadocs-core/page-tree"
import Image from "next/image"
import Link from "next/link"

const coverImages = {
  kinetic: "/portrait.jpg",
  inverse: "/deeprte.png",
  fusion: "/portrait.jpg",
}

export default function ResearchAreas({ metas }: { metas: PageTree.Node[] }) {
  return (
    <ItemGroup className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {metas.map((meta) => (
        <Item key={meta.$id} variant="outline" asChild>
          <Link href={`/docs/${meta.$id}`}>
            <ItemHeader>
              <Image
                src={coverImages[meta.$id]}
                alt={meta.$id}
                width={640}
                height={640}
                className="aspect-square w-full rounded-sm object-cover"
              />
            </ItemHeader>
            <ItemContent>
              <ItemTitle className="text-center text-base">
                {meta.name}
              </ItemTitle>
              <ItemDescription className="text-center text-base">
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
