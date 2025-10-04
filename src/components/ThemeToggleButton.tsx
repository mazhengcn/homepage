import React, { useEffect, useState } from 'react'
import { IoSunny, IoMoon } from 'react-icons/io5'
import { Button } from '@/components/ui/button'

const themes = ['light', 'dark']

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div className="bg-secondary inline-flex items-center rounded-full p-px">
      {themes.map(t => {
        const checked = t === theme
        return (
          <Button
            key={t}
            className={`cursor-pointer rounded-full ${checked ? 'hover:bg-background text-foreground bg-[var(--background)]' : 'text-foreground bg-transparent hover:bg-transparent'}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            size="icon"
          >
            {t === 'light' ? <IoSunny /> : <IoMoon />}
          </Button>
        )
      })}
    </div>
  ) : (
    <div />
  )
}
