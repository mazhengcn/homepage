import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve as resolvePath } from "node:path"

import type { Publication } from "../lib/db/publications.schema"

// ── Path resolution ──────────────────────────────────────────────────────────

/** Resolve the absolute path to lib/db/publications.json */
export function resolveDbPath(): string {
  return resolvePath(import.meta.dirname, "..", "lib", "db", "publications.json")
}

/** Resolve the absolute path to lib/db/publications.bib */
export function resolveBibPath(): string {
  return resolvePath(import.meta.dirname, "..", "lib", "db", "publications.bib")
}

// ── JSON I/O ─────────────────────────────────────────────────────────────────

/** Read and parse publications.json */
export function readPublications(): Publication[] {
  const raw = readFileSync(resolveDbPath(), "utf-8")
  return JSON.parse(raw) as Publication[]
}

/**
 * Write publications to disk.
 * Uses 2-space indent and preserves the key ordering of each object as-is
 * (JavaScript object insertion order = order keys appear in parsed JSON).
 * A trailing newline is added to match editor conventions.
 */
export function writePublications(pubs: Publication[]): void {
  const json = JSON.stringify(pubs, null, 2) + "\n"
  writeFileSync(resolveDbPath(), json, "utf-8")
}

/** Create a backup of publications.json */
export function backupPublications(): void {
  const src = resolveDbPath()
  const dest = src.replace(/\.json$/, ".bak.json")
  copyFileSync(src, dest)
  console.log(`Backed up to ${dest}`)
}

// ── Editor ───────────────────────────────────────────────────────────────────

/**
 * Open a JSON template in the user's $EDITOR, wait for them to save+close,
 * then parse and return the result.
 *
 * Falls back through: $EDITOR → $VISUAL → vim → nano → vi
 *
 * Throws if the editor exits non-zero or the result is unparseable.
 */
export function openInEditor(template: unknown): Record<string, unknown> {
  // Write template to a temp file
  const tmpDir = tmpdir()
  const tmpFile = join(tmpDir, `publication-edit-${Date.now()}.json`)
  const content = JSON.stringify(template, null, 2) + "\n"
  writeFileSync(tmpFile, content, "utf-8")

  // Pick editor
  const editor = process.env.EDITOR || process.env.VISUAL || findAvailableEditor()

  console.log(`Opening ${tmpFile} in ${editor}...`)

  // Spawn editor (takes over terminal, blocks until closed)
  const result = spawnSync(editor, [tmpFile], { stdio: "inherit" })

  if (result.status !== 0) {
    unlinkSync(tmpFile)
    const code = result.status ?? result.signal ?? "unknown"
    throw new Error(`Editor exited with code ${code}`)
  }

  // Read back and parse
  let parsed: Record<string, unknown>
  try {
    const raw = readFileSync(tmpFile, "utf-8")
    parsed = JSON.parse(raw)
  } catch (err) {
    unlinkSync(tmpFile)
    throw new Error(`Failed to parse edited JSON: ${err instanceof Error ? err.message : err}`)
  }

  // Clean up
  unlinkSync(tmpFile)
  return parsed
}

/** Check which editors are available on PATH */
function findAvailableEditor(): string {
  const candidates = ["vim", "nano", "vi"]
  for (const cmd of candidates) {
    const result = spawnSync("which", [cmd], { stdio: "pipe" })
    if (result.status === 0) return cmd
  }
  throw new Error(
    "No editor found. Set $EDITOR or install vim/nano. " +
      "Falling back to editing the JSON file directly.",
  )
}

// ── Key ordering ─────────────────────────────────────────────────────────────

/**
 * Pick a canonical key order for new entries so they match the style of
 * existing entries. This keeps git diffs clean when adding publications.
 */
export function canonicalKeyOrder(): string[] {
  return [
    "type",
    "title",
    "author",
    "container-title",
    "DOI",
    "arXiv",
    "ISSN",
    "ISBN",
    "PMID",
    "PMCID",
    "abstract",
    "issued",
    "journalAbbreviation",
    "page",
    "volume",
    "issue",
    "publisher",
    "event",
    "collection-title",
    "container-title-short",
    "pdf-link",
    "citekey",
    "id",
    "tags",
  ]
}

/**
 * Reorder an object's keys to match the canonical order.
 * Unknown keys are appended at the end.
 */
export function reorderKeys<T extends Record<string, unknown>>(obj: T): T {
  const order = canonicalKeyOrder()
  const ordered = {} as Record<string, unknown>

  for (const key of order) {
    if (key in obj) {
      ordered[key] = obj[key]
    }
  }
  for (const key of Object.keys(obj)) {
    if (!(key in ordered)) {
      ordered[key] = obj[key]
    }
  }

  return ordered as T
}
