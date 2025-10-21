import { Building2, Calendar } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "Tenure-Track Associate Professor",
    company: "Shanghai Jiao Tong University",
    period: "2020 - Present",
    description:
      "'Full stack AI for Science' (Theory -> Algorithms -> Engineering) development of methods solving scientific problems with deep learning, particularly in the fields of kinetic theory and full wave inversion",
    tags: ["DeepRTE", "APNNs", "Inverse Problems"],
  },
  {
    title: "Golomb Visiting Assistant Professor",
    company: "Purdue University",
    period: "2017 - 2020",
    description:
      "Conducted research in applied mathematics, focusing on numerical methods for partial differential equations and scientific computing.",
    tags: ["Fast Spectral Algorithms", "Model Reduction", "Deep Learning"],
  },
  {
    title: "Ph.D. in Computational Mathematics",
    company: "Shanghai Jiao Tong University",
    period: "2012 - 2017",
    description:
      "Supervised by Prof. Shi Jin. Dissertation: Numerical Methods for Kinetic Equations in the Diffusive Regimes.",
    tags: ["Thesis", "APUQ", "Conservation Laws"],
  },
  {
    title: "B.S. in Mathematics, Minor in Applied Physics",
    company: "Shanghai Jiao Tong University",
    period: "2008 - 2012",
    description: "Graduated from the the first 'Class of Science (Math and Physics)' which is the predecessor of the Zhiyuan College at SJTU.",
    tags: [],
  },
]

export default function Resume() {
  return (
    <div className="mx-auto py-4 px-2 not-prose">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute left-0 top-4 bottom-0 border-l-2" />
        {experiences.map(({ company, description, period, tags, title }) => (
          <div key={title} className="relative pl-8 pb-12 last:pb-0">
            {/* Timeline dot */}
            <div className="absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background" />

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="shrink-0 h-9 w-9 bg-accent rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-base font-medium">{company}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{period}</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full"
                    asChild
                  >
                    <Link href={`/publications/${tag}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
