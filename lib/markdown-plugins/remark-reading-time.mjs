import { valueToEstree } from "estree-util-value-to-estree"
import { toString as mdaToString } from "mdast-util-to-string"
import getReadingTime from "reading-time"
import { define } from "unist-util-mdx-define"

export default function remarkReadingTime() {
  return (tree, file) => {
    const textOnPage = mdaToString(tree)
    const readingTime = getReadingTime(textOnPage)
    define(tree, file, { readingTime: valueToEstree(readingTime) })
  }
}
