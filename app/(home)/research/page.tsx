import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { source } from "@/lib/source"
import { ArrowRight } from "lucide-react"
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
      <section className="-ml-8 prose-ul:list-none">
        <ul className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
          {pageTreeMeta.map(meta => {
            return (
              <li key={meta.$id}>
                <Link href={`/docs/${meta.$id}`}>
                  <Card className="inset-shadow-default flex h-full flex-col transition-shadow hover:bg-accent hover:text-accent-foreground">
                    <CardHeader className="flex-1">
                      <CardTitle className="text-xl font-bold">
                        {meta.name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {/* @ts-expect-error this is intentional */}
                        {meta.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="font-mono text-sm text-muted-foreground">
                      Learn more
                      <ArrowRight className="inline size-4" />
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
