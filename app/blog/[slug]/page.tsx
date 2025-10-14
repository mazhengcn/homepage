import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const {
    default: MDXContent,
    metadata,
    lastModified,
    readingTime,
  } = await import(`@/content/${slug}.mdx`)

  return (
    <>
      <h1 className="pt-12">{metadata.title}</h1>
      <p>{metadata.description}</p>
      <p className="opacity-75">Contributors: {metadata.author}</p>
      <p className="mb-4 text-sm opacity-75">
        Last modified: {dayjs(lastModified).format("MMMM D, YYYY")} ·{" "}
        {readingTime.text}
      </p>
      <hr />
      <MDXContent />
    </>
  )
}

export function generateStaticParams() {
  return [{ slug: "condense" }, { slug: "f-principle" }]
}

export const dynamicParams = true
