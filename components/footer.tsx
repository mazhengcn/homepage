import Image from "next/image"
import Link from "next/link"
import nextLogo from "@/public/next.svg"

const today = new Date()

export default function Footer() {
  return (
    <footer className="mt-10 p-4 text-center text-zinc-500 items-start flex gap-2 justify-center">
      &copy; {today.getFullYear()} Powered by{" "}
      <Link href={"https://nextjs.org/"}>
        <Image
          src={nextLogo}
          alt="Next.js Logo"
          className="inline w-16 dark:invert"
        />
      </Link>
      . All rights reserved.
    </footer>
  )
}
