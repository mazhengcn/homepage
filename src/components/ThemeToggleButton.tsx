import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { IoMoon, IoSunny } from 'react-icons/io5'

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
    <div className="inline-flex items-center rounded-full bg-secondary p-px">
      {themes.map(t => {
        const checked = t === theme
        return (
          <Button
            key={t}
            className={`cursor-pointer rounded-full ${checked ? 'bg-[var(--background)] text-foreground hover:bg-background' : 'bg-transparent text-foreground hover:bg-transparent'}`}
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
