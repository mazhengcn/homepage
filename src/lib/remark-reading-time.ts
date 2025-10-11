import { valueToEstree } from "estree-util-value-to-estree"
import type { Root } from "mdast"
import { toString as mdaToString } from "mdast-util-to-string"
import getReadingTime from "reading-time"
import { define } from "unist-util-mdx-define"
import type { VFile } from "vfile"

export default function remarkReadingTime() {
  return function transformer(tree: Root, file: VFile) {
    const textOnPage = mdaToString(tree)
    const readingTime = getReadingTime(textOnPage)
    define(tree, file, { readingTime: valueToEstree(readingTime) })
  }
}
