import { create } from "zustand"
import { MarkdownState } from "../types/MarkdownState"

export const useMarkdownStore = create<MarkdownState>((set) => ({
  markdownContent: "",
  outputFormat: "html",
  setMarkdownContent: (content) => set({ markdownContent: content }),
  setOutputFormat: (format) => set({ outputFormat: format }),
}))
