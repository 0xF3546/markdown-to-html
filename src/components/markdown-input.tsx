import type React from "react"
import { useState } from "react"
import { useMarkdownStore } from "../hooks/useMarkdownStore"
import { Button, Textarea } from "@mui/joy"

export function MarkdownInput() {
  const [input, setInput] = useState("")
  const { setMarkdownContent } = useMarkdownStore()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleConvert = () => {
    setMarkdownContent(input)
  }

  const handleClear = () => {
    setInput("")
    setMarkdownContent("")
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="# Paste your markdown here..."
        className="min-h-[300px] font-mono"
        value={input}
        onChange={handleInputChange}
      />
      <div className="flex space-x-2 justify-end">
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
        <Button onClick={handleConvert}>Convert</Button>
      </div>
    </div>
  )
}
