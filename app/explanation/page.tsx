'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AnalyzePage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAnalyze = async () => {
    if (file) {
      console.log('Do OCR and Language Detection...');
    } else if (text) {
      console.log('Use input text for analysis');
    } else {
      alert('Please upload a file or enter text.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Legal Document Analyzer</h1>

      <div className="space-y-4 max-w-2xl text-gray-800">
        <label className="block font-medium text-gray-900">Upload File (PDF, Image):</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="block border p-2 rounded" />

        <label className="block font-medium text-gray-900 mt-4">Or Paste Text:</label>
        <textarea
          placeholder="Enter document text here..."
          value={text}
          onChange={handleTextChange}
          className="w-full h-40 p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
        />

        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
        >
          Analyze Document
        </button>
      </div>
    </div>
  );
}
