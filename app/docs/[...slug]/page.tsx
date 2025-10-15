import { notFound } from "next/navigation"
import { source } from "@/lib/source"
import { getMDXComponents } from "@/mdx-components"

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
  console.log(page.data.title)
  return <MDX components={getMDXComponents()} />
}
