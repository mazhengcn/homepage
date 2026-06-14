import { z } from "zod"

// ── Author ───────────────────────────────────────────────────────────────────

export const AuthorSchema = z.object({
  family: z.string().min(1, "Author family name is required"),
  given: z.string().min(1, "Author given name is required"),
})

export type Author = z.infer<typeof AuthorSchema>

// ── Issued date ──────────────────────────────────────────────────────────────

export const IssuedSchema = z.object({
  "date-parts": z
    .array(
      z
        .tuple([z.coerce.number().int()])
        .rest(z.coerce.number().int().optional())
    )
    .min(1, "At least one date-part entry is required"),
  status: z.string().optional(),
})

// ── Publication ──────────────────────────────────────────────────────────────

export const PublicationSchema = z.object({
  // ── Required fields ─────────────────────────────────────────────────
  id: z.string().uuid(),
  type: z.enum(["article-journal", "paper-conference", "chapter"]),
  title: z.string().min(1, "Title is required"),
  author: z.array(AuthorSchema).min(1, "At least one author is required"),
  "container-title": z.string().optional(),
  issued: IssuedSchema,

  // ── Identifiers ─────────────────────────────────────────────────────
  DOI: z.string().optional(),
  arXiv: z.string().optional(),
  ISSN: z.string().optional(),
  ISBN: z.string().optional(),
  PMID: z.string().optional(),
  PMCID: z.string().optional(),

  // ── Bibliographic details ───────────────────────────────────────────
  abstract: z.string().optional(),
  page: z.string().optional(),
  volume: z.union([z.string(), z.number()]).optional(),
  issue: z.union([z.string(), z.number()]).optional(),
  "container-title-short": z.string().optional(),
  journalAbbreviation: z.string().optional(),

  // ── Conference / Chapter specifics ──────────────────────────────────
  publisher: z.string().optional(),
  event: z.string().optional(),
  "collection-title": z.string().optional(),

  // ── Links & metadata ────────────────────────────────────────────────
  "pdf-link": z.string().optional(),
  citekey: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type Publication = z.infer<typeof PublicationSchema>

// ── Array schema (for validating the full file) ──────────────────────────────

export const PublicationsArraySchema = z.array(PublicationSchema)
