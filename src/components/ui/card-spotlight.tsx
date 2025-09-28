import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  title: string
  content: string
}

export default function CardSpotlight({ title, content }: Props) {
  useEffect(() => {
    const all = document.querySelectorAll('.spotlight-card')

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach(e => {
        const blob = e.querySelector('.blob') as HTMLElement
        const fblob = e.querySelector('.fake-blob') as HTMLElement

        if (!blob || !fblob) return

        const rec = fblob.getBoundingClientRect()

        blob.style.opacity = '1'

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - rec.width / 2
              }px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: 'forwards',
          }
        )
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="h-max w-max">
      <div className="spotlight-card group relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out hover:shadow-lg">
        <Card className="max-w-80 border border-orange-200 bg-white/50 transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </CardHeader>
          <CardContent className="opacity-70">{content}</CardContent>
        </Card>
        <div className="blob absolute left-0 top-0 h-20 w-20 rounded-full bg-orange-300/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-orange-400/60" />
        <div className="fake-blob absolute left-0 top-0 h-20 w-20 rounded-full" />
      </div>
    </div>
  )
}
