"use client"

import { useState, useEffect } from "react"
import { useMarkdownStore } from "../hooks/useMarkdownStore"
import { convertService } from "../services/convertService"
import { Button, Tab, TabList, TabPanel, Tabs } from "@mui/joy"
import { BiCheck, BiCopy, BiDownload } from "react-icons/bi"

export function OutputPreview() {
    const { markdownContent, outputFormat } = useMarkdownStore()
    const [convertedOutput, setConvertedOutput] = useState("")
    const [previewHtml, setPreviewHtml] = useState("")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const load = async () => {
            if (!markdownContent) {
                setConvertedOutput("")
                setPreviewHtml("")
                return
            }

            const { output, html } = await convertService.convertMarkdown(markdownContent, outputFormat)
            setConvertedOutput(output)
            setPreviewHtml(html)
        }
        load();
    }, [markdownContent, outputFormat])

    const handleCopy = () => {
        if (!convertedOutput) return

        navigator.clipboard.writeText(convertedOutput)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownload = () => {
        if (!convertedOutput) return

        const extension = outputFormat === "html" ? "html" : "jsx"
        const blob = new Blob([convertedOutput], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `converted.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Output</h2>
                <div className="flex space-x-2">
                    <Button variant="outlined" size="sm" onClick={handleCopy} disabled={!convertedOutput}>
                        {copied ? <BiCheck className="h-4 w-4 mr-2" /> : <BiCopy className="h-4 w-4 mr-2" />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outlined" size="sm" onClick={handleDownload} disabled={!convertedOutput}>
                        <BiDownload className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="code" className="w-full">
                <TabList className="grid w-full grid-cols-2">
                    <Tab value="code">Code</Tab>
                    <Tab value="preview">Preview</Tab>
                </TabList>
                <TabPanel value="code" className="space-y-4">
                    {convertedOutput ? (
                        <pre className="bg-secondary p-4 rounded-md overflow-x-auto font-mono text-sm">
                            <code>{convertedOutput}</code>
                        </pre>
                    ) : (
                        <div className="bg-secondary p-4 rounded-md text-center text-muted-foreground">
                            No content to display. Please enter some markdown and click Convert.
                        </div>
                    )}
                </TabPanel>
                <TabPanel value="preview" className="space-y-4">
                    {previewHtml ? (
                        
                        <div
                            className="bg-white border rounded-md p-4 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: previewHtml }}
                        />
                    ) : (
                        <div className="bg-secondary p-4 rounded-md text-center text-muted-foreground">
                            No preview available. Please enter some markdown and click Convert.
                        </div>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    )
}
