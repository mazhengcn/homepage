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
  kinetic: "/research/reentry.png",
  inverse: "/research/rad-therapy.jpg",
  fusion: "/research/icf.png",
}

export default function ResearchAreas({ metas }: { metas: PageTree.Node[] }) {
  return (
    <ItemGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {metas.map((meta) => {
        const id = meta.$id ? meta.$id : ""
        return (
          <Item key={id} variant="outline" asChild>
            <Link href={`/docs/${id}`}>
              <ItemHeader>
                {meta.$id && (
                  <Image
                    src={coverImages[id as keyof typeof coverImages]}
                    alt={meta.$id}
                    width={640}
                    height={640}
                    className="aspect-square w-full rounded-sm object-cover"
                  />
                )}
              </ItemHeader>
              <ItemContent>
                <ItemTitle className="text-base">{meta.name}</ItemTitle>
                <ItemDescription className="text-base">
                  {/* @ts-expect-error this is intentional */}
                  {meta.description}
                </ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
