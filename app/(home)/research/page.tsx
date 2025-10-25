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
import { source } from "@/lib/source"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

export default function ResearchPage() {
  const pageTreeMeta = source.pageTree.children
  return (
    <>
      <section className="mt-12">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Research Interests
        </h1>
        <p className="mb-8 indent-8 text-lg">
          Welcome to my homepage, I&apos;m a mathematician and tech enthusiast.
          My research interests include computational mathematics and deep
          learning methods. I am particularly interested in the interplay
          between deep learning and mathematics, and how deep learning methods
          can be applied to solve problems in mathematical and engineering.
        </p>
      </section>
      <section>
        <ItemGroup className="not-prose flex flex-col gap-6">
          {pageTreeMeta.map((meta) => {
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
      </section>
      <hr />
      <section>
        <h1>Current students</h1>
      </section>
    </>
  )
}
