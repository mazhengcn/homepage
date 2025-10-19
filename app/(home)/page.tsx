import Image from "next/image"
import { IoDocument, IoMail } from "react-icons/io5"
import LinkButton from "@/components/link-button"
import Resume from "@/components/resume"
import { Card, CardContent } from "@/components/ui/card"
import PortraitImage from "@/public/portrait.jpg"

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto pt-10">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 overflow-auto md:flex-row md:justify-center md:gap-26">
          <Image
            src={PortraitImage}
            alt="Portrait of Zheng Ma"
            className="h-60 w-60 rounded-full border border-border object-cover"
          />
          <div className="flex flex-col items-center text-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                Zheng Ma{" "}
                <span className="font-cn font-bold tracking-tight">
                  (马 征)
                </span>
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
      <Card className="mt-10">
        <CardContent>
          <Resume />
        </CardContent>
      </Card>
    </div>
  )
}
