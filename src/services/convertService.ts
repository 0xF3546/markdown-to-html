import { marked } from "marked";
import { OutputFormat } from "../types/OutputFormat";

export const convertService = {
    async convertMarkdown(markdown: string, format: OutputFormat) {
        const html = await marked(markdown);

        let output = "";

        switch (format) {
            case "html":
                output = html;
                break;

            case "react":
                output = `import React from 'react';

export default function MarkdownComponent() {
  return (
    <div className="markdown-content">
${this.indentHtml(html, 6)}
    </div>
  );
}
`;
                break;

            case "nextjs":
                output = `export default function MarkdownComponent() {
  return (
    <div className="markdown-content">
${this.indentHtml(html, 6)}
    </div>
  );
}
`;
                break;

            case "angular":
                output = `<div class="markdown-content">
${this.indentHtml(html, 2)}
</div>`;
                break;

            case "vue":
                output = `<template>
  <div class="markdown-content">
${this.indentHtml(html, 4)}
  </div>
</template>

<script>
export default {
  name: "MarkdownComponent",
};
</script>
`;
                break;
        }

        return { output, html };
    },

    indentHtml(html: string, spaces: number) {
        const indent = " ".repeat(spaces);
        return html
            .split("\n")
            .map((line) => `${indent}${line}`)
            .join("\n");
    },
};
