"use client"
import { ArrowUpIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    const handleScroll = () => {
      if (typeof window !== "undefined" && window.scrollY > 10) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMounted])

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!isMounted) {
    return
  }

  return (
    isVisible && (
      <Button
        className="fixed right-4 bottom-4 cursor-pointer"
        onClick={scrollToTop}
        variant="outline"
        size="icon-lg"
        aria-label="Scroll to top"
      >
        <ArrowUpIcon />
      </Button>
    )
  )
}
