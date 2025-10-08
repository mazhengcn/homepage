import { column, defineDb, defineTable } from 'astro:db'

const Publications = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    citekey: column.text({ optional: true }),
    type: column.text(),
    doi: column.text({ optional: true }),
    arxiv: column.text({ optional: true }),
    year: column.number(),
    title: column.text(),
    author: column.text(),
    journal: column.text({ optional: true }),
    journal_abbreviation: column.text({ optional: true }),
    pages: column.text({ optional: true }),
    issue: column.number({ optional: true }),
    volume: column.number({ optional: true }),
    tags: column.text(),
    status: column.text(),
    series: column.text({ optional: true }),
    source_url: column.text({ optional: true }),
    date: column.text({ optional: true }),
    proceedings_title: column.text({ optional: true }),
    conference_name: column.text({ optional: true }),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Publications },
})
