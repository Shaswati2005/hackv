"use client";

import React from "react";
import { CheckCircle, AlertTriangle, FileText, Lightbulb } from "lucide-react";

export default function AnalysisResultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8 text-gray-800">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">
          📑 Analysis Results
        </h1>
        <p className="text-gray-600">Here’s what we found in your document.</p>
      </header>

      {/* Summary */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold">
          <FileText className="w-5 h-5" />
          Document Summary
        </div>
        <p className="text-gray-700 leading-relaxed">
          This agreement outlines the terms of service between a freelance
          contractor and the client. It includes sections on deliverables,
          payment, and confidentiality. The document spans 3 pages and appears
          to be well-structured overall.
        </p>
      </section>

      {/* Dangerous Clauses */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6 border border-red-200">
        <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold">
          <AlertTriangle className="w-5 h-5" />
          Potentially Dangerous Clauses
        </div>
        <ul className="list-disc ml-6 text-red-700 space-y-2">
          <li>
            <strong>Indemnity Clause:</strong> The contractor assumes full
            liability for any breach, even if caused by client’s instructions.
          </li>
          <li>
            <strong>Termination Terms:</strong> Client may terminate anytime
            without cause, but the contractor is bound for 60 days.
          </li>
        </ul>
      </section>

      {/* Suggestions */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6 border border-yellow-100">
        <div className="flex items-center gap-2 mb-2 text-yellow-600 font-semibold">
          <Lightbulb className="w-5 h-5" />
          Suggestions for Improvement
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Add a clause specifying dispute resolution mechanisms.</li>
          <li>Clarify payment deadlines to avoid ambiguity.</li>
          <li>
            Include a confidentiality breach penalty to protect both parties.
          </li>
        </ul>
      </section>

      {/* Proofreading Corrections */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-6 border border-green-200">
        <div className="flex items-center gap-2 mb-2 text-green-600 font-semibold">
          <CheckCircle className="w-5 h-5" />
          Proofreading Corrections
        </div>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>“The party whom receives...” → “The party who receives...”</li>
          <li>
            “...unless otherwise agreed by both the parties.” → Remove “the”.
          </li>
          <li>
            “Payment must be received within 30 days of invoice date” → Add a
            period at end.
          </li>
        </ul>
      </section>

      {/* Call to action */}
      <div className="mt-10 flex justify-between items-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Download Report
        </button>
        <button className="text-blue-700 underline hover:text-blue-900">
          Go Back to Upload
        </button>
      </div>
    </div>
  );
}
