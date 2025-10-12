import Link from "next/link"

const today = new Date()

export default function Footer() {
  return (
    <footer className="mt-10 p-4 text-center text-zinc-500">
      &copy; {today.getFullYear()} Built with{" "}
      <Link href={"https://nextjs.org/"}>Next.js</Link>. All rights reserved.
    </footer>
  )
}
