import * as React from 'react'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item'

import type { CollectionEntry } from 'astro:content'

export function ItemList({ posts }: { posts: CollectionEntry<'blog'>[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup className="gap-4">
        {posts.map(post => (
          <Item key={post.data.title} variant="outline" asChild role="listitem">
            <a href="/">
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {post.data.title}
                </ItemTitle>
                <ItemDescription>{post.data.description}</ItemDescription>
              </ItemContent>
              {/* <ItemContent className="flex-none text-center">
                <ItemDescription>
                  {post.data.pubDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </ItemDescription>
              </ItemContent> */}
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
