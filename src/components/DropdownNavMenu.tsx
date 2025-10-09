import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Menu as IconMenu } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  navLinks: { href: string; text: string }[]
  className: string
}

export function DropdownNavMenu({ navLinks, className }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={val => setDropdownOpen(val)}
    >
      <DropdownMenuTrigger
        asChild
        onClick={() => {
          setDropdownOpen(val => !val)
        }}
      >
        <Button
          variant="outline"
          size="icon"
          className={cn('cursor-pointer', className)}
        >
          <IconMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuGroup>
          {navLinks.map((link, index) => {
            return (
              <DropdownMenuItem key={index} asChild>
                <a href={link.href}>{link.text}</a>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
