/**
 * Metadata schema for teachings/courses
 */
export interface TeachingMetadata {
  /** Unique identifier based on folder name (e.g., "numerical-analysis") */
  id: string

  /** Title of the course/teaching */
  title: string

  /** Date in ISO 8601 format (YYYY-MM-DD) */
  date: string

  /** Language of the course (e.g., "en", "zh-CN") */
  language?: string

  /** Final URL where the slides are hosted */
  slidesUrl?: string

  /** URL to the PDF version of the slides */
  pdfUrl?: string

  /** URL to the source code/repository */
  sourceUrl?: string

  /** Whether the teaching is published/public */
  published?: boolean
}

/**
 * Collection of all teachings metadata
 */
export interface TeachingsCollection {
  /** Timestamp of when the collection was generated */
  generatedAt: string

  /** Total number of teachings */
  count: number

  /** Array of all teaching metadata */
  teachings: TeachingMetadata[]
}
