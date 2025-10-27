import { PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export const Students = [
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
    avatar: "/people/yan-xiongbin.jpg",
    email: "evilrabbit@vercel.com",
    period: "2022 - 2024",
    position:
      "First position after postdoc: Associate professor of Institute of Computational Mathematics, Lanzhou University",
    type: "postdoc",
    status: "former",
  },
]

function MemberList({ people }: { people: typeof Students }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup>
        {people.map((person, index) => (
          <div key={person.name}>
            <Item>
              <ItemMedia className="group-has-[[data-slot=item-description]]/item:translate-y-0 group-has-[[data-slot=item-description]]/item:self-start">
                <Avatar>
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.name}</ItemTitle>
                <ItemDescription>{person.period}</ItemDescription>
                <ItemDescription>
                  {person.position && person.position}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </div>
        ))}
      </ItemGroup>
    </div>
  )
}

export default function GroupMembers() {
  const currentPhDs = Students.filter(
    (person) => person.type === "phd" && person.status === "current",
  )
  const formerPhDs = Students.filter(
    (person) => person.type === "phd" && person.status === "former",
  )
  const currentPostdocs = Students.filter(
    (person) => person.type === "postdoc" && person.status === "current",
  )
  const formerPostdocs = Students.filter(
    (person) => person.type === "postdoc" && person.status === "former",
  )
  return (
    <section className="mt-10">
      <h1 className="mt-10 text-center text-3xl font-bold md:text-5xl">
        People
      </h1>
      <h2 className="mt-5 mb-5 text-xl font-semibold">
        Current Ph.D. Students
      </h2>
      <MemberList people={currentPhDs} />
      <h2 className="mt-5 mb-5 text-xl font-semibold">Former Ph.D. Students</h2>
      <MemberList people={formerPhDs} />
      <h2 className="mt-5 mb-5 text-xl font-semibold">Former Postdocs</h2>
      <MemberList people={formerPostdocs} />
    </section>
  )
}
