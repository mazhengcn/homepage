import { column, defineDb, defineTable } from 'astro:db'

const Publications = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    author: column.text(),
    journal: column.text(),
    year: column.number(),
    pages: column.number({ optional: true }),
    volume: column.number({ optional: true }),
    status: column.text({ enum: ['published', 'in-review', 'preprint'] }),
    tags: column.json(),
    type: column.text({
      enum: ['article', 'conference_paper', 'book_section'],
      optional: true,
    }),
  },
})

// https://astro.build/db/config
export default defineDb({
  tables: { Publications },
})
