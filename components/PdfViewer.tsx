// components/PDFViewer.tsx
"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
  showPDF: boolean;
  setNumPages: (numPages: number) => void;
}

export default function PDFViewer({
  file,
  showPDF,
  setNumPages,
}: PDFViewerProps) {
  const [numPagesInternal, setNumPagesInternal] = useState(0);

  return showPDF && file ? (
    <Document
      file={file}
      onLoadSuccess={({ numPages }) => {
        setNumPagesInternal(numPages);
        setNumPages(numPages);
      }}
      className="flex flex-col items-center gap-4"
    >
      {Array.from(new Array(numPagesInternal), (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderTextLayer={true}
          renderAnnotationLayer={false}
          width={700}
        />
      ))}
    </Document>
  ) : null;
}
