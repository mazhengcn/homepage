import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  title: string
  content: string
  date: Date
}

export default function CardSpotlight({ title, content, date }: Props) {
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
    <div className="h-max">
      <div className="spotlight-card group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
        <Card className="transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{content}</p>
          </CardContent>
          <CardFooter>
            <div className="text-muted-foreground font-mono text-xs">
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
          </CardFooter>
        </Card>
        <div className="blob bg-primary absolute left-0 top-0 h-20 w-20 rounded-full opacity-0 blur-2xl transition-all duration-300 ease-in-out" />
        <div className="fake-blob absolute left-0 top-0 h-20 w-20 rounded-full" />
      </div>
    </div>
  )
}
