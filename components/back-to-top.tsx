"use client"
import { ArrowUpIcon } from "lucide-react"
import { Activity, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      if (typeof window !== "undefined" && window.scrollY > 20) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      {isVisible && (
        <Button
          className="fixed right-4 bottom-4 cursor-pointer"
          onClick={scrollToTop}
          variant="outline"
          size="icon-lg"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </Button>
      )}
    </>
  )
}
