/**
 * BibTeX ↔ CSL-JSON converter for publications
 *
 * Usage:
 *   bun convert-bibtex to-bibtex                 JSON → BibTeX (writes publications.bib)
 *   bun convert-bibtex from-bibtex <file>        BibTeX → JSON (prints to stdout)
 *   bun convert-bibtex from-bibtex <file> --merge  BibTeX → JSON (appends to publications.json)
 */

import { readFileSync, writeFileSync } from "node:fs"
import { Cite } from "@citation-js/core"
// Side-effect imports: register BibTeX and CSL plugins
import "@citation-js/plugin-bibtex"
import "@citation-js/plugin-csl"

import {
  readPublications,
  writePublications,
  backupPublications,
  resolveDbPath,
  resolveBibPath,
  reorderKeys,
} from "./helpers"
import { PublicationSchema, PublicationsArraySchema } from "../lib/db/publications.schema"
import type { Publication } from "../lib/db/publications.schema"

// ── Help ─────────────────────────────────────────────────────────────────────

function printHelp(): void {
  console.log(`
BibTeX ↔ CSL-JSON Converter

Usage: bun convert-bibtex <command> [args]

Commands:
  to-bibtex                      Convert publications.json → publications.bib
  from-bibtex <file>             Parse a .bib file → print CSL-JSON to stdout
  from-bibtex <file> --merge     Parse a .bib file → append new entries to publications.json
`)
}

// ── JSON → BibTeX ────────────────────────────────────────────────────────────

function handleToBibtex(): void {
  const pubs = readPublications()

  if (pubs.length === 0) {
    console.error("No publications found in publications.json.")
    process.exit(1)
  }

  // citation-js expects CSL-JSON; our data is already CSL-JSON
  // Remove the `id` field — citation-js uses its own internal IDs
  // but preserves `citekey` if present as the BibTeX key
  const citeInput = pubs.map((p) => {
    const { id, ...rest } = p
    return rest
  })

  let bibtex: string
  try {
    const cite = new Cite(citeInput)
    bibtex = cite.format("bibtex", {
      format: "text",
      template: "bibtex",
    }) as string
  } catch (err) {
    console.error(
      `Conversion failed: ${err instanceof Error ? err.message : err}`
    )
    process.exit(1)
  }

  const dest = resolveBibPath()
  writeFileSync(dest, bibtex, "utf-8")
  console.log(`✓ Converted ${pubs.length} publications → ${dest}`)
}

// ── BibTeX → JSON ────────────────────────────────────────────────────────────

function handleFromBibtex(filePath: string | undefined, merge: boolean): void {
  if (!filePath) {
    console.error("Usage: bun convert-bibtex from-bibtex <file> [--merge]")
    process.exit(1)
  }

  let bibContent: string
  try {
    bibContent = readFileSync(filePath, "utf-8")
  } catch {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  // Parse BibTeX → CSL-JSON
  let entries: Record<string, unknown>[]
  try {
    const cite = new Cite(bibContent)
    entries = cite.data as Record<string, unknown>[]
  } catch (err) {
    console.error(
      `Failed to parse BibTeX: ${err instanceof Error ? err.message : err}`
    )
    process.exit(1)
  }

  if (entries.length === 0) {
    console.error("No entries found in the BibTeX file.")
    process.exit(1)
  }

  // Add missing fields that our schema requires
  let warnCount = 0
  for (const entry of entries) {
    // Always replace citation-js internal id with a fresh UUID
    entry.id = crypto.randomUUID()
    if (!entry.abstract) entry.abstract = ""
    if (!entry.tags) entry.tags = []
    if (!entry.type) entry.type = "article-journal"
    if (!entry["container-title"] && entry["journal-name"]) {
      entry["container-title"] = entry["journal-name"]
    }

    // Validate basic shape
    const result = PublicationSchema.safeParse(entry)
    if (!result.success) {
      warnCount++
      console.error(
        `⚠ Entry "${entry.title ?? "(no title)"}" has validation issues:`
      )
      for (const issue of result.error.issues) {
        console.error(`    [${issue.path.join(".")}] ${issue.message}`)
      }
    }
  }

  if (!merge) {
    // Print to stdout
    console.log(JSON.stringify(entries, null, 2))
    if (warnCount > 0) {
      console.error(
        `\n${warnCount} entry(s) have validation warnings (details above).`
      )
    }
    return
  }

  // ── Merge mode ──────────────────────────────────────────────────────────

  const existing = readPublications()
  const existingDOIs = new Set(
    existing.map((p) => p.DOI).filter(Boolean)
  )
  const existingTitles = new Set(
    existing.map((p) => p.title.toLowerCase().trim())
  )

  let added = 0
  let skipped = 0

  for (const entry of entries) {
    // Validate
    const result = PublicationSchema.safeParse(entry)
    if (!result.success) {
      skipped++
      continue
    }

    const pub = result.data

    // Deduplicate by DOI (most reliable) and title (fuzzy fallback)
    if (pub.DOI && existingDOIs.has(pub.DOI)) {
      console.log(`  Skipping (DOI already exists): ${pub.title}`)
      skipped++
      continue
    }
    if (existingTitles.has(pub.title.toLowerCase().trim())) {
      console.log(`  Skipping (title already exists): ${pub.title}`)
      skipped++
      continue
    }

    // Ensure UUID
    if (!pub.id) pub.id = crypto.randomUUID()

    const ordered = reorderKeys(
      pub as unknown as Record<string, unknown>
    ) as unknown as Publication
    existing.push(ordered)
    added++
    console.log(`  Added: ${pub.title}`)
  }

  if (added > 0) {
    backupPublications()
    writePublications(existing)
    console.log(
      `\n✓ Merged ${added} new publication(s) into publications.json (${skipped} skipped).`
    )
  } else {
    console.log(`\nNo new publications to add (${skipped} skipped).`)
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

const subcommand = process.argv[2]

switch (subcommand) {
  case "to-bibtex":
  case "to-bib":
    handleToBibtex()
    break

  case "from-bibtex":
  case "from-bib": {
    const filePath = process.argv[3]
    const merge =
      process.argv.includes("--merge") || process.argv.includes("-m")
    handleFromBibtex(filePath, merge)
    break
  }

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
