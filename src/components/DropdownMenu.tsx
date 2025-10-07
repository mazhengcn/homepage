import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu as IconMenu } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  tags: string[]
}

export function DropdownMenuWithIcon({ tags }: Props) {
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
        className="cursor-pointer"
      >
        <Button variant="outline" size="icon">
          <IconMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuGroup>
          {tags.map(tag => {
            return (
              <DropdownMenuItem asChild key={tag}>
                <a href={`/categories/${tag.toLowerCase()}`}>{tag}</a>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
