import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { createRelativeLink } from "fumadocs-ui/mdx"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPageImage, source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

dayjs.extend(utc)

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) {
    notFound()
  }
  const MDX = page.data.body
  const readingTime = page.data._exports.readingTime as { text: string }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>
        <p>{page.data.description}</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Last modified: {dayjs(page.data.lastModified).format("MMMM D, YYYY")}{" "}
          · {readingTime.text}
        </p>
      </DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  }
}
