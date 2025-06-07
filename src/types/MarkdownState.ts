import { OutputFormat } from "./OutputFormat"

export type MarkdownState = {
  markdownContent: string
  outputFormat: OutputFormat
  setMarkdownContent: (content: string) => void
  setOutputFormat: (format: OutputFormat) => void
}