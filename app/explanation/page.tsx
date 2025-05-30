"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "react-hot-toast";
import { Sparkles, FileText, Search } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { SelectableTextArea } from "../../components/SelectableTextArea";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Tesseract from "tesseract.js";
import axios from "axios";
import { getAuthCookie } from "../../utils/auth";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFTextAnalyzer() {
  const [text, setText] = useState("");
  const [uploadedPDF, setUploadedPDF] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [showPDF, setShowPDF] = useState<boolean>(true);

  const extractTextFromPDF = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");

      if (pageText.trim().length > 30) {
        extractedText += pageText + "\n\n";
      } else {
        // Fallback to OCR
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context!, viewport }).promise;

        const ocrResult = await Tesseract.recognize(canvas, "eng");
        extractedText += ocrResult.data.text + "\n\n";
      }
    }

    return extractedText.trim();
  };
  const handleAnalyzeDocument = async () => {
    const userId = getAuthCookie();
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    if (!text.trim()) {
      toast.error("No text extracted from the PDF.");
      return;
    }
    toast.success("Analyzing document...");

    const response = await axios.post("/api/getResults", {
      userId: userId,
      textInput: text,
      fileName: uploadedPDF?.name,
    });

    window.location.href = `/explanation/${response.data.id}`;
  };
  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      toast.error("No file dropped.");
      return;
    }
    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    setUploadedPDF(file);
    toast.success(`Uploaded: ${file.name}`);

    try {
      toast.loading("Extracting text...");
      const extractedText = await extractTextFromPDF(file);
      setText(extractedText);
      toast.dismiss();
      toast.success("Text extracted successfully!");
      setShowPDF(true); // Show PDF view by default on upload
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to extract text.");
      console.error("PDF text extraction error:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      <Toaster />
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-500" /> LegalFlow Analyzer
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          Upload a legal document or paste your text to identify risky clauses
          and structure.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`max-w-4xl mx-auto border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition duration-300 bg-white hover:shadow-lg
        ${isDragActive ? "border-indigo-400 bg-indigo-50" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg text-indigo-500">Drop the PDF here ...</p>
        ) : (
          <p className="text-lg text-gray-700 flex items-center justify-center gap-2">
            <FileText className="text-indigo-400" /> Drag & drop a PDF here or
            click to upload
          </p>
        )}
      </div>

      {uploadedPDF ? (
        <div className="max-w-6xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Document View
            </h2>
            <button
              onClick={() => setShowPDF(!showPDF)}
              className="text-sm text-indigo-600 underline hover:text-indigo-800"
            >
              Toggle {showPDF ? "Extracted Text" : "PDF View"}
            </button>
          </div>
          <div className="w-full">
            {showPDF ? (
              <div className="overflow-auto border rounded-xl p-4 bg-gray-50">
                <Document
                  file={uploadedPDF}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  className="flex flex-col items-center gap-4"
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                      width={700}
                    />
                  ))}
                </Document>
              </div>
            ) : (
              <div className="overflow-auto border rounded-xl p-4 bg-gray-50 text-sm text-gray-800 whitespace-pre-wrap max-h-[600px]">
                {text}
              </div>
            )}
            {text.trim().length > 0 && (
              <button
                onClick={handleAnalyzeDocument}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2 transition-all"
              >
                Analyze Legal Document
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-6">
          <label className="block text-sm mb-2 text-indigo-700 font-medium">
            Paste contract or legal text:
          </label>
          <SelectableTextArea value={text} onChange={setText} />
          <button
            onClick={handleAnalyzeDocument}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all"
          >
            <Search /> Analyze Text
          </button>
        </div>
      )}

      <footer className="text-sm text-gray-500 text-center mt-12 pt-6 border-t border-gray-200">
        © 2025 <span className="font-semibold text-indigo-600">LegalFlow</span>{" "}
        — Legal proofchecking reimagined.
      </footer>
    </div>
  );
}
