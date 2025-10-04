import * as React from 'react'
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

interface Props {
  tags: string[]
}

export function DropdownMenuWithIcon({ tags }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm">
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
