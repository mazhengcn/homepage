export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const {
    default: Content,
    metadata,
    readingTime,
  } = await import(`@/content/${slug}.mdx`)

  console.log(metadata, readingTime.words)

  return (
    <>
      <h1 className="pt-12">{metadata.title}</h1>
      <p>{metadata.description}</p>
      <p className="opacity-75">Contributors: {metadata.author}</p>
      <p className="mb-4 text-sm opacity-75">
        Last modified: xxx · {readingTime.text}
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
