import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { FileUpload } from "./components/file-upload";
import { FormatSelector } from "./components/format-selector";
import { MarkdownInput } from "./components/markdown-input";
import { OutputPreview } from "./components/output-preview";

function App() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div
        className="mx-auto max-w-3xl rounded-lg bg-white p-8 md:p-10 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4 underline underline-offset-4 decoration-indigo-500">
          Markdown Converter
        </h1>
        <p className="max-w-[700px] mx-auto text-base text-gray-700 leading-relaxed font-medium">
          Upload a Markdown file or paste your content to convert it into clean HTML, React components, and more.
        </p>
      </div>

      <div className="grid gap-6 mt-10">
        <Tabs defaultValue="paste" className="w-full">
          <TabList defaultValue={0} className="grid w-full grid-cols-2">
            <Tab value={"paste"}>Paste Markdown</Tab>
            <Tab value={"upload"}>Upload File</Tab>
          </TabList>
          <TabPanel value={"paste"} className="space-y-4">
            <MarkdownInput />
          </TabPanel>
          <TabPanel value={"upload"} className="space-y-4">
            <FileUpload />
          </TabPanel>
        </Tabs>

        <FormatSelector />
        <OutputPreview />
      </div>
    </main>
  );
}


export default App;
