import { toString as mdaToString } from "mdast-util-to-string"
import getReadingTime from "reading-time"

export default function remarkReadingTime() {
  return (tree, file) => {
    const textOnPage = mdaToString(tree)
    const readingTime = getReadingTime(textOnPage)
    file.data.readingTime = readingTime
  }
}
