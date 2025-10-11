export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { default: Content } = await import(`@/content/${slug}.md`)

  return <Content />
}

export function generateStaticParams() {
  return [{ slug: "welcome-1" }, { slug: "about-2" }]
}

export const dynamicParams = true
