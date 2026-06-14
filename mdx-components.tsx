import type { MDXComponents } from "mdx/types"

import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import defaultMdxComponents from "fumadocs-ui/mdx"

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components,
  }
}
