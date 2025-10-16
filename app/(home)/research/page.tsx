import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const posts = [
  {
    id: "test-post",
    title: "Test Post",
    description: "This is a test post.",
  },
  {
    id: "test-post-2",
    title: "Test Post",
    description: "This is a test post.",
  },
  {
    id: "test-post-3",
    title: "Test Post",
    description: "This is a test post.",
  },
]

export default function ResearchPage() {
  return (
    <>
      <section className="mt-12">
        <h1 className="text-center">Research Interests</h1>
        <p className="mb-8 indent-4">
          Welcome to my homepage, I'm a mathematician and tech enthusiast. My
          research interests include computational mathematics and deep learning
          methods. I am particularly interested in the interplay between deep
          learning and mathematics, and how deep learning methods can be applied
          to solve problems in mathematical and engineering.
        </p>
      </section>
      <section className="-ml-8 prose-ul:list-none">
        <ul className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Card className="h-full hover:bg-accent  hover:text-accent-foreground transition-shadow inset-shadow-default flex flex-col">
                  <CardHeader className="flex-1">
                    <CardTitle className="text-xl font-bold">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link
                      href="/docs/f-principle/"
                      className="font-mono text-sm text-muted-foreground"
                    >
                      Learn more
                      <ArrowRight className="size-4 inline" />
                    </Link>
                  </CardFooter>
                </Card>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
