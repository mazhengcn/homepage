import Image from "next/image"
import { IoDocument, IoMail } from "react-icons/io5"
import LinkButton from "@/components/link-button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import PortraitImage from "@/public/portrait.jpg"

type TimelineEntry = {
  date: string
  title: string
  content: string
}

const timelineData: TimelineEntry[] = [
  {
    date: "2020 - now",
    title: "Tenured-track Associate Professor",
    content:
      "I joined the School of Mathematical Sciences at Shanghai Jiao Tong University as a tenured-track Associate Professor. My research focuses on computational mathematics and deep learning methods, exploring the intersection of these fields to solve complex problems in mathematics and engineering.",
  },
  {
    date: "2017 - 2020",
    title: "Golomb Visiting Assistant Professor",
    content:
      "I served as a Golomb Visiting Assistant Professor in the Department of Mathematics at Purdue University. During this time, I engaged in research and teaching, contributing to the academic community while furthering my expertise in computational mathematics and its applications.",
  },
  {
    date: "2012 - 2017",
    title: "Ph.D. in Computational Mathematics",
    content:
      "I completed my Ph.D. in Computational Mathematics at Shanghai Jiao Tong University. My dissertation focused on developing novel algorithms for solving large-scale optimization problems, with applications in machine learning and data analysis.",
  },
  {
    date: "2008 - 2012",
    title: "B.S. in Mathematics",
    content:
      "I obtained my B.S. in Mathematics from Zhiyuan College, Shanghai Jiao Tong University. During my undergraduate studies, I developed a strong foundation in mathematical theory and its applications, which sparked my interest in pursuing advanced studies in computational mathematics.",
  },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto pt-10">
      <Card className="py-2">
        <CardContent className="flex flex-col items-center gap-6 overflow-auto md:flex-row md:justify-center md:gap-30">
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="h-60 w-60 rounded-full border border-border object-cover"
          />
          <div className="flex flex-col items-center text-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Zheng Ma <span className={`font-cn font-bold`}>(马 征)</span>
              </h1>
              <p className="-mt-4 text-lg text-gray-600 dark:text-gray-400 font-mono">
                Mathmatician and Tech Enthusiast
              </p>
            </div>
            <div className="flex gap-2">
              <LinkButton href="/cv.pdf">
                <IoDocument />
                Resume
              </LinkButton>
              <LinkButton href="mailto:zhengma@sjtu.edu.cn">
                <IoMail />
                Email
              </LinkButton>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center px-6 mt-15">
        <h1 className="text-foreground mb-10 text-center text-4xl font-bold tracking-tighter">
          Work and Education
        </h1>
        <div className="relative mx-auto max-w-3xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {timelineData.map((entry) => (
            <div key={entry.date} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight md:mb-4 md:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight md:absolute">
                {entry.date}
              </h5>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  {entry.content}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
