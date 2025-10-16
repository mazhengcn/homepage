import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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

export function TimeLine() {
  return (
    <section className="bg-background py-32">
      <div className="container">
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          Work and Education
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {timelineData.map((entry) => (
            <div key={entry.date} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
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
    </section>
  )
}
