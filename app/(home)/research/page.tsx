import GroupMembers from "@/components/group-members"
import ResearchAreas from "@/components/research-areas"
import { source } from "@/lib/source"

const people = [
  {
    name: "Yekun Zhu",
    avatar: "/people/zhu-yekun.jpg",
    email: "shadcn@vercel.com",
    period: "2021 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Nan Zhou",
    avatar: "/people/zhou-nan.jpg",
    email: "maxleiter@vercel.com",
    period: "2022 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Chen Min",
    avatar: "/people/min-chen.jpg",
    email: "evilrabbit@vercel.com",
    period: "2022 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Jishen Peng",
    avatar: "/people/peng-jishen.jpg",
    email: "evilrabbit@vercel.com",
    period: "2024 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Enze Jiang",
    avatar: "/people/jiang-enze.jpg",
    email: "evilrabbit@vercel.com",
    period: "2024 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Tongrun Lin",
    avatar: "/people/lin-tongrun.jpg",
    email: "evilrabbit@vercel.com",
    period: "2025 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Gengyuan Liu",
    avatar: "/people/liu-gengyuan.jpg",
    email: "evilrabbit@vercel.com",
    period: "2025 - present",
    type: "phd",
    status: "current",
  },
  {
    name: "Keke Wu",
    avatar: "/people/wu-keke.jpg",
    email: "evilrabbit@vercel.com",
    period: "2021 - 2024",
    type: "phd",
    status: "former",
  },
  {
    name: "Xiongbin Yan",
    avatar:
      "https://mathteacher.lzu.edu.cn/system/resource/headImgs/20250408102840.jpg",
    email: "evilrabbit@vercel.com",
    period: "2022 - 2024",
    position:
      "First position after postdoc: Associate professor of Institute of Computational Mathematics, Lanzhou University",
    type: "postdoc",
    status: "former",
  },
]

export default function ResearchPage() {
  const pageTreeMeta = source.pageTree.children
  const currentPhDs = people.filter(
    (person) => person.type === "phd" && person.status === "current",
  )
  const formerPhDs = people.filter(
    (person) => person.type === "phd" && person.status === "former",
  )
  const currentPostdocs = people.filter(
    (person) => person.type === "postdoc" && person.status === "current",
  )
  const formerPostdocs = people.filter(
    (person) => person.type === "postdoc" && person.status === "former",
  )
  return (
    <>
      <section className="mt-12">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Research Interests
        </h1>
        <p className="mt-10 mb-8 indent-8 text-lg">
          Welcome to my homepage, I&apos;m a mathematician and tech enthusiast.
          My research interests include computational mathematics and deep
          learning methods. I am particularly interested in the interplay
          between deep learning and mathematics, and how deep learning methods
          can be applied to solve problems in mathematical and engineering.
        </p>
      </section>
      <ResearchAreas metas={pageTreeMeta} />
      <section className="mt-10">
        <h1 className="mt-10 text-center text-3xl font-bold md:text-5xl">
          People
        </h1>
        <h2 className="mt-5 mb-5 text-xl font-semibold">
          Current Ph.D. Students
        </h2>
        <GroupMembers people={currentPhDs} />
        <h2 className="mt-5 mb-5 text-xl font-semibold">
          Former Ph.D. Students
        </h2>
        <GroupMembers people={formerPhDs} />
        <h2 className="mt-5 mb-5 text-xl font-semibold">Former Postdocs</h2>
        <GroupMembers people={formerPostdocs} />
      </section>
    </>
  )
}
