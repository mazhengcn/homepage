import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { notFound } from "next/navigation"
import { source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

dayjs.extend(utc)

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) {
    notFound()
  }
  const MDX = page.data.body
  const readingTime = page.data._exports.readingTime as { text: string }

  return (
    <>
      <h1 className="pt-12">{page.data.title}</h1>
      <p>{page.data.description}</p>
      {/* <p className="opacity-75">Contributors: {metadata.author}</p> */}
      <p className="mb-4 text-sm opacity-75">
        Last modified: {dayjs(page.data.lastModified).format("MMMM D, YYYY")} ·{" "}
        {readingTime.text}
      </p>
      <hr />
      <MDX components={getMDXComponents()} />
    </>
  )
}
