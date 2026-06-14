declare module "@citation-js/core" {
  export class Cite {
    constructor(data: unknown)
    static async(data: unknown): Promise<Cite>
    data: Record<string, unknown>[]
    format(format: string, options?: Record<string, unknown>): string | unknown[]
  }
}

declare module "@citation-js/plugin-bibtex" {}

declare module "@citation-js/plugin-csl" {}
