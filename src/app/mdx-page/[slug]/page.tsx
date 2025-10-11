import matter from "gray-matter"
import { get } from "http"
import { fromMarkdown } from "mdast-util-from-markdown"
import { toString as mdastToString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Content, metadata } = await import(`@/content/${slug}.mdx`)
  const minutesRead = getReadingTime(String(Content()))
  console.log("Minutes read:", mdastToString(Content()))
  return (
    <>
      <h1 className="pt-12">{metadata.title}</h1>
      <p>{metadata.description}</p>
      <p className="opacity-75">Contributors: {metadata.author}</p>
      <p className="mb-4 text-sm opacity-75">
        Last modified: xxx · {minutesRead.text}
      </p>
      <hr />
      <Content />
    </>
  )
}

export function generateStaticParams() {
  return [{ slug: "welcome-1" }, { slug: "about-2" }]
}

export const dynamicParams = true
