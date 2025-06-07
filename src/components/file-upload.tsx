import type React from "react";
import { useState, useRef } from "react";
import { useMarkdownStore } from "../hooks/useMarkdownStore";
import { BiFile, BiUpload } from "react-icons/bi";

export function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const { setMarkdownContent } = useMarkdownStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    try {
      const text = await file.text();
      setMarkdownContent(text);
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Fehler beim Lesen der Datei. Bitte versuche es erneut.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-6 w-full max-w-xl mx-auto">
      <input
        type="file"
        accept=".md,.markdown"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />

      {fileName && (
        <div className="flex items-center gap-3 text-gray-700 text-sm font-medium">
          <BiFile className="h-5 w-5 text-primary-600" />
          <span className="truncate">{fileName}</span>
        </div>
      )}

      <div
        onClick={openFileDialog}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openFileDialog()}
        aria-label="Markdown Datei hochladen"
        className={`
          relative flex flex-col items-center justify-center
          cursor-pointer select-none
          rounded-lg border-2 border-dashed
          p-12 text-center
          transition-all duration-200
          bg-white
          ${
            dragActive
              ? "border-primary-600 bg-primary-100"
              : "border-gray-300"
          }
          hover:border-primary-500
          focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-300
          shadow-sm
          min-h-[180px]
        `}
      >
        <BiUpload className="mb-4 h-12 w-12 text-gray-400" />
        <p className="text-lg font-semibold text-gray-700 mb-1">
          Drag your Markdown file here
        </p>
        <p className="text-sm text-gray-500">
          Or click to select (.md, .markdown)
        </p>
      </div>
    </div>
  );
}
