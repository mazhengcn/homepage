"use client"
import { cva } from "class-variance-authority"
import { Airplay, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLayoutEffect, useState } from "react"
import { cn } from "@/lib/utils"

const itemVariants = cva("size-6.5 rounded-full p-1.5 text-muted-foreground", {
  variants: {
    active: {
      true: "bg-accent text-accent-foreground",
      false: "text-muted-foreground",
    },
  },
})
const full = [
  ["light", Sun],
  ["dark", Moon],
  ["system", Airplay],
]

export function ThemeToggle({ mode = "light-dark" }) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  const container = cn("inline-flex items-center rounded-full border p-1")
  if (mode === "light-dark") {
    console.log("themes", { theme, resolvedTheme })
    const value = mounted ? resolvedTheme : null
    return (
      <button
        type="button"
        className={container}
        onClick={() => setTheme(value === "light" ? "dark" : "light")}
        data-theme-toggle=""
      >
        {full.map(([key, Icon]) => {
          if (key === "system") return null
          return (
            <Icon
              // biome-ignore lint/suspicious/noTsIgnore: <ignore>
              // @ts-ignore
              key={key}
              fill="currentColor"
              className={cn(itemVariants({ active: value === key }))}
            />
          )
        })}
      </button>
    )
  }
  const value = mounted ? theme : null
  return (
    <div className={container}>
      {full.map(([key, Icon]) => (
        <button
          type="button"
          // biome-ignore lint/suspicious/noTsIgnore: <ignore>
          // @ts-ignore
          key={key}
          className={cn(itemVariants({ active: value === key }))}
          // biome-ignore lint/suspicious/noTsIgnore: <ignore>
          // @ts-ignore
          onClick={() => setTheme(key)}
        >
          <Icon className="size-full" fill="currentColor" />
        </button>
      ))}
    </div>
  )
}
