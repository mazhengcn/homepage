/**
 * Publication admin CLI — manage lib/db/publications.json
 *
 * Usage:
 *   bun manage-pubs list              List all publications
 *   bun manage-pubs add               Add a new publication (opens $EDITOR)
 *   bun manage-pubs edit <index>      Edit a publication by index
 *   bun manage-pubs remove <index>    Remove a publication by index
 *   bun manage-pubs validate          Validate all entries against schema
 */

import { createInterface } from "node:readline"
import {
  readPublications,
  writePublications,
  backupPublications,
  openInEditor,
  reorderKeys,
} from "./helpers"
import { PublicationSchema, PublicationsArraySchema } from "../lib/db/publications.schema"
import type { Publication } from "../lib/db/publications.schema"

// ── Help ─────────────────────────────────────────────────────────────────────

function printHelp(): void {
  console.log(`
Publication Admin CLI

Usage: bun manage-pubs <command> [args]

Commands:
  list, ls              List all publications (numbered, 1-based)
  add, new              Add a new publication — opens $EDITOR with a template
  edit <index>          Edit publication at <index> — opens $EDITOR
  remove, rm <index>    Remove publication at <index> (asks for confirmation)
  validate, check       Validate all entries against the schema

Indexes are 1-based (as shown by 'list'). Use 'list' first to see indexes.
Editor: uses $EDITOR, falls back to $VISUAL, then vim/nano/vi.
`)
}

// ── Prompt ───────────────────────────────────────────────────────────────────

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

// ── List ─────────────────────────────────────────────────────────────────────

function handleList(): void {
  const pubs = readPublications()

  if (pubs.length === 0) {
    console.log("No publications found.")
    return
  }

  const width = String(pubs.length).length

  for (let i = 0; i < pubs.length; i++) {
    const p = pubs[i]
    const year = p.issued?.["date-parts"]?.[0]?.[0] ?? "????"
    const idx = String(i + 1).padStart(width)
    const type = p.type.padEnd(18)
    console.log(`${idx}. [${year}] ${type} ${p.title}`)
  }
}

// ── Add ──────────────────────────────────────────────────────────────────────

function handleAdd(): void {
  const template = reorderKeys({
    type: "article-journal",
    title: "",
    author: [{ family: "", given: "" }],
    "container-title": "",
    DOI: "",
    abstract: "",
    issued: { "date-parts": [[new Date().getFullYear()]] },
    tags: [],
    id: crypto.randomUUID(),
  })

  let raw: Record<string, unknown>
  try {
    raw = openInEditor(template)
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : err}`)
    process.exit(1)
  }

  const result = PublicationSchema.safeParse(raw)
  if (!result.success) {
    console.error("\nValidation failed. Issues:")
    for (const issue of result.error.issues) {
      const path = issue.path.length ? issue.path.join(".") : "(root)"
      console.error(`  [${path}] ${issue.message}`)
    }
    console.error("\nPublication not added. Fix the issues and try again.")
    process.exit(1)
  }

  backupPublications()
  const pubs = readPublications()
  const entry = reorderKeys(
    result.data as unknown as Record<string, unknown>
  ) as unknown as Publication
  pubs.push(entry)
  writePublications(pubs)

  console.log(`Added: "${entry.title}" (id: ${entry.id})`)
  console.log(`Total publications: ${pubs.length}`)
}

// ── Edit ─────────────────────────────────────────────────────────────────────

function handleEdit(indexStr: string | undefined): void {
  if (!indexStr) {
    console.error("Usage: bun manage-pubs edit <index>")
    process.exit(1)
  }

  const index = parseInt(indexStr, 10)
  if (isNaN(index) || index < 1) {
    console.error(`Invalid index: "${indexStr}". Must be a positive number.`)
    process.exit(1)
  }

  const pubs = readPublications()
  const pub = pubs[index - 1]

  if (!pub) {
    console.error(
      `Index ${index} out of range. There are ${pubs.length} publications.`
    )
    console.error("Run 'bun manage-pubs list' to see available indexes.")
    process.exit(1)
  }

  console.log(`Editing #${index}: ${pub.title}`)

  let raw: Record<string, unknown>
  try {
    raw = openInEditor(pub as unknown as Record<string, unknown>)
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : err}`)
    process.exit(1)
  }

  const result = PublicationSchema.safeParse(raw)
  if (!result.success) {
    console.error("\nValidation failed. Issues:")
    for (const issue of result.error.issues) {
      const path = issue.path.length ? issue.path.join(".") : "(root)"
      console.error(`  [${path}] ${issue.message}`)
    }
    console.error("\nEdit discarded. Fix the issues and try again.")
    process.exit(1)
  }

  backupPublications()
  const entry = reorderKeys(
    result.data as unknown as Record<string, unknown>
  ) as unknown as Publication
  pubs[index - 1] = entry
  writePublications(pubs)

  console.log(`Updated #${index}: "${entry.title}"`)
}

// ── Remove ───────────────────────────────────────────────────────────────────

async function handleRemove(indexStr: string | undefined): Promise<void> {
  if (!indexStr) {
    console.error("Usage: bun manage-pubs remove <index>")
    process.exit(1)
  }

  const index = parseInt(indexStr, 10)
  if (isNaN(index) || index < 1) {
    console.error(`Invalid index: "${indexStr}". Must be a positive number.`)
    process.exit(1)
  }

  const pubs = readPublications()
  const pub = pubs[index - 1]

  if (!pub) {
    console.error(
      `Index ${index} out of range. There are ${pubs.length} publications.`
    )
    process.exit(1)
  }

  const year = pub.issued?.["date-parts"]?.[0]?.[0] ?? "????"
  console.log(`\n  #${index}: [${year}] ${pub.title}\n`)

  const answer = (await prompt("Remove this publication? (y/N): "))
    .trim()
    .toLowerCase()

  if (answer !== "y" && answer !== "yes") {
    console.log("Cancelled.")
    return
  }

  backupPublications()
  pubs.splice(index - 1, 1)
  writePublications(pubs)

  console.log(`Removed #${index}. Total publications: ${pubs.length}`)
}

// ── Validate ─────────────────────────────────────────────────────────────────

function handleValidate(): void {
  const pubs = readPublications()

  if (pubs.length === 0) {
    console.log("No publications to validate.")
    return
  }

  const result = PublicationsArraySchema.safeParse(pubs)

  if (result.success) {
    console.log(`✓ All ${pubs.length} publications are valid.`)
    return
  }

  const issues = result.error.issues
  console.error(
    `✗ ${issues.length} validation issue(s) found across ${pubs.length} entries:\n`
  )

  for (const issue of issues) {
    const path = issue.path.length ? issue.path.join(" → ") : "(root)"
    console.error(`  [${path}] ${issue.message}`)
  }

  process.exit(1)
}

// ── Main ─────────────────────────────────────────────────────────────────────

const subcommand = process.argv[2]

switch (subcommand) {
  case "list":
  case "ls":
    handleList()
    break

  case "add":
  case "new":
    handleAdd()
    break

  case "edit":
    handleEdit(process.argv[3])
    break

  case "remove":
  case "rm":
    await handleRemove(process.argv[3])
    break

  case "validate":
  case "check":
    handleValidate()
    break

  case "help":
  case "--help":
  case "-h":
  default:
    if (subcommand && subcommand !== "help" && !subcommand.startsWith("-")) {
      console.error(`Unknown command: "${subcommand}"\n`)
    }
    printHelp()
    if (subcommand && !["help", "--help", "-h"].includes(subcommand)) {
      process.exit(1)
    }
}
