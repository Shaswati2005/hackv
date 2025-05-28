"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "react-hot-toast";
import { Sparkles, FileText, Search } from "lucide-react";
import { SelectableTextArea } from "@/components/SelectableTextArea";

export default function PDFTextAnalyzer() {
  const [text, setText] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      toast.error("No file dropped.");
      return;
    }
    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    toast.success(`Uploaded: ${file.name}`);
    // You can store or process file here later
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleAnalyze = () => {
    if (!text.trim()) {
      toast.error("Please paste some text to analyze.");
      return;
    }
    toast.success("Analyzing text...");
    // Placeholder for actual analysis
    setTimeout(() => {
      toast.success("Analysis complete!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-8 text-gray-800 flex flex-col items-center gap-10 font-sans">
      <Toaster />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 flex items-center gap-3">
          <Sparkles className="text-blue-500" /> LegalFlow Analyzer
        </h1>
        <p className="mt-2 text-gray-600">
          Upload contracts or paste text to detect risky legal clauses
          instantly.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`w-full max-w-2xl border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-xl
        ${isDragActive ? "border-blue-400 bg-blue-100" : "border-blue-300"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-blue-500">Drop the PDF here ...</p>
        ) : (
          <p className="text-lg text-blue-800 flex items-center justify-center gap-2">
            <FileText className="text-blue-400" /> Drag & drop a PDF file here,
            or click to select
          </p>
        )}
      </div>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        <label className="block text-sm mb-2 text-blue-700 font-medium">
          Paste contract or legal text:
        </label>
        {/* <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-blue-50 text-blue-900 placeholder:text-blue-300 p-4 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          placeholder="Paste your contract or clause here..."
        /> */}
        <SelectableTextArea value={text} onChange={setText} />
        <button
          onClick={handleAnalyze}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 flex items-center justify-center gap-2 transition-all"
        >
          <Search /> Analyze Text
        </button>
      </div>

      <footer className="text-sm text-blue-500 mt-10">
        © 2025 LegalFlow — Legal proofchecking reimagined.
      </footer>
    </div>
  );
}
