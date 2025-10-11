import { execSync } from "node:child_process"
import { valueToEstree } from "estree-util-value-to-estree"
import { define } from "unist-util-mdx-define"

export default function remarkLastModified() {
  return (tree, file) => {
    const filepath = file.history[0]
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
    define(tree, file, { lastModified: valueToEstree(result.toString()) })
  }
}
