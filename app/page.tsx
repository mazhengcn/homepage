import Image from "next/image"
import "katex/dist/katex.min.css"
import { IoDocument, IoMail } from "react-icons/io5"
import LinkButton from "@/components/link-button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { notoSansSC } from "@/lib/fonts"
import PortraitImage from "@/public/portrait.jpg"

export default function Home() {
  return (
    <div className="pt-10">
      <h1 className="text-center">Home</h1>
      <Card className="py-2">
        <CardContent className="flex flex-col items-center gap-6 overflow-auto md:flex-row md:justify-center md:gap-30">
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="h-60 w-60 rounded-full border border-border object-cover"
          />
          <div className="flex flex-col items-center text-center">
            <div>
              <h1 className="text-4xl font-bold">
                Zheng Ma{" "}
                <span className={`${notoSansSC.variable} font-bold`}>
                  (马 征)
                </span>
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
      <Card className="mt-6 px-8 pt-8 pb-10">
        <CardTitle>
          <div className="text-center text-3xl font-bold underline decoration-muted-foreground decoration-4 underline-offset-10">
            Work Experience
          </div>
        </CardTitle>
        <CardContent className="mt-4 flex items-start gap-6">
          <div className="basis-1/6 flex flex-col gap-14">
            <div className="font-semibold">2020 - now</div>
            <div className="font-semibold">2017 - 2020</div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              Tenured-track Associate Professor, School of Mathematical
              Sciences, Shanghai Jiao Tong University, China
            </div>
            <div>
              Golomb Visiting Assistant Professor, Department of Mathematics,
              Purdue University, U.S.
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 px-8 pt-8 pb-10">
        <CardTitle>
          <div className="text-center text-3xl font-bold underline decoration-muted-foreground decoration-4 underline-offset-10">
            Education
          </div>
        </CardTitle>
        <CardContent className="mt-4 flex items-start gap-6">
          <div className="flex flex-col gap-6">
            <div className="font-semibold">2012 - 2017</div>
            <div className="font-semibold">2008 - 2012</div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              Ph.D. in Mathematics, Shanghai Jiao Tong University, China
            </div>
            <div>
              B.S. in Mathematics, Zhiyuan College, Shanghai Jiao Tong
              University, China
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
