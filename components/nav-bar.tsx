import Image from "next/image"
import Link from "next/link"

import { NavDropdownMenu } from "@/components/nav-dropdown-menu"
import { NavMenu } from "@/components/nav-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import PortraitImage from "@/public/portrait.jpg"

const navLinks = [
  { href: "/research", text: "Research" },
  { href: "/publications", text: "Publications" },
  { href: "/teachings", text: "Teachings" },
  { href: "https://github.com/mazhengcn", text: "Github" },
]

const TAGS = ["Inverse Problems", "Machine Learning", "Medical Imaging"]

export default function NavBar() {
  return (
    <header className="transidtion-colors fixed z-20 mx-auto w-full border-b bg-background/80 p-2 backdrop-blur-md duration-300">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center gap-3">
          <Link href="/" className="group flex flex-auto items-center">
            <Image
              src={PortraitImage}
              alt="Portrait of Zheng Ma"
              className="h-8 w-8 rounded-full"
            />
            <h2 className="p-2 text-lg font-semibold tracking-tighter">Home</h2>
          </Link>
          <div className="hidden items-center md:flex">
            <NavMenu tags={TAGS} />
          </div>
          <div className="flex-1"></div>
          {/* <ModeToggle /> */}
          <ThemeToggle mode="light-dark" />
          <NavDropdownMenu navLinks={navLinks} className="md:hidden" />
        </nav>
      </div>
    </header>
  )
}
