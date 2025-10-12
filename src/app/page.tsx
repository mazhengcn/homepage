import Image from "next/image"
import "katex/dist/katex.min.css"
import { IoDocument, IoMail } from "react-icons/io5"
import LinkButton from "@/components/link-button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import PortraitImage from "@/public/portrait.jpg"

export default function Home() {
  return (
    <div className="pt-10">
      <h1 className="text-center">Home</h1>
      <Card>
        <CardContent className="flex flex-col items-center gap-6 overflow-auto md:flex-row md:justify-center md:gap-24">
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="h-60 w-60 rounded-full border-2 border-border object-cover"
          />
          <div className="flex flex-col items-center text-center">
            <div>
              <h1 className="text-4xl font-bold">
                Zheng Ma <span className="font-sans-cn font-bold">(马 征)</span>
              </h1>
              <p className="-mt-4 text-lg text-gray-600 dark:text-gray-400">
                Mathmatician and Tech Enthusiast
              </p>
            </div>
            <div className="flex gap-2">
              <LinkButton href="/cv.pdf">
                <IoDocument />
                Full CV here
              </LinkButton>
              <LinkButton href="mailto:zhengma@sjtu.edu.cn">
                <IoMail />
                Contact me
              </LinkButton>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 p-8">
        <CardTitle>
          <div className="text-center text-3xl font-bold underline decoration-muted-foreground decoration-4 underline-offset-8">
            Work Experience
          </div>
        </CardTitle>
        <CardContent className="mt-4 flex flex-col items-start gap-6">
          <div>
            <span className="font-semibold">2020 - present</span>:{" "}
            <span className="italic">Tenured-track Associate Professor</span>,
            School of Mathematical Sciences, Shanghai Jiao Tong University,
            China
          </div>
          <div>
            <span className="font-semibold">2017 - 2020</span>:{" "}
            <span className="italic">Golomb Visiting Assistant Professor</span>,
            Department of Mathematics, Purdue University, U.S.
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 p-8">
        <CardTitle>
          <div className="text-center text-3xl font-bold underline decoration-muted-foreground decoration-4 underline-offset-8">
            Education
          </div>
        </CardTitle>
        <CardContent className="mt-4 flex flex-col items-start gap-6">
          <div>
            <span className="font-semibold">2012 - 2017</span>: Ph.D. in
            Mathematics, Shanghai Jiao Tong University, China
          </div>
          <div>
            <span className="font-semibold">2008 - 2012</span>: B.S. in
            Mathematics, Zhiyuan College, Shanghai Jiao Tong University, China
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
