"use client";

import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Lightbulb,
  BarChart2,
  Info,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

type LegalAnalysis = {
  id: string;
  text: string;
  totalClauses: number;
  dangerousClause: number;
  generatedSuggestionsNumber: number;
  proofreadingScore: number;
  riskSummary: string;
  documentSummary: string[];
  dangerousClauses: string[];
  suggestions: string[];
  proofreadingFixes: string[];
  createdAt: string;
};

export default function LegalFlowDashboard() {
  // Modal state for showing detailed insight
  const [modalData, setModalData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const { document } = useParams(); // Get ID from URL
  const [data, setData] = useState<LegalAnalysis | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModalData(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Modal close handler
  function closeModal() {
    setModalData(null);
  }
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/legal-analysis/${document}`);
      if (res.ok) {
        const json = await res.json();
        console.log("Fetched analysis:", json);
        setData(json);
      } else {
        console.error("Failed to fetch analysis");
      }
    }

    fetchData();
  }, [document]);
  if (!data) {
    return (
      <div className="p-10 text-center text-blue-600">Loading analysis...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white text-gray-800 relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Gradient SVG Backgrounds */}
      <svg
        className="absolute -top-20 -left-20 w-96 h-96 opacity-20 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="200" fill="url(#blueGradient1)" />
        <defs>
          <radialGradient
            id="blueGradient1"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(200 200) scale(200)"
          >
            <stop stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <svg
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="200" fill="url(#blueGradient2)" />
        <defs>
          <radialGradient
            id="blueGradient2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(200 200) scale(200)"
          >
            <stop stopColor="#60A5FA" stopOpacity="0.25" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <main className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        {/* Header */}
        <div className="mb-10 max-w-xl">
          <h2 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            Contract Analysis Overview
          </h2>
          <p className="mt-2 text-blue-700">
            Comprehensive insights into your legal document.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Clauses Analyzed"
            value={data.totalClauses.toString()}
            icon={<BarChart2 className="w-6 h-6 text-blue-600" />}
          />
          <StatCard
            title="Dangerous Clauses"
            value={data.dangerousClause.toString()}
            percentage="+8% compared to last doc"
            positive
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          />
          <StatCard
            title="Suggestions Generated"
            value={data.generatedSuggestionsNumber.toString()}
            percentage="+5%"
            positive
            icon={<Lightbulb className="w-6 h-6 text-yellow-500" />}
          />
          <StatCard
            title="Proofreading Score"
            value={`${data.proofreadingScore}%`}
            percentage="+4%"
            positive
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          />
        </div>

        {/* Risks Section */}
        <section className="mt-16 relative bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 border border-blue-200 shadow-md overflow-hidden">
          <SectionHeader
            title="Identified Risks & Loophole Detection"
            icon={<Info className="w-5 h-5 text-blue-600" />}
          />
          <p className="mt-3 text-blue-700 text-sm leading-relaxed whitespace-pre-line">
            {data.riskSummary}
          </p>
        </section>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Document Summary",
              icon: <FileText className="text-blue-600 w-6 h-6" />,
              content: data.documentSummary.join("\n\n"),
            },
            {
              title: "Dangerous Clauses",
              icon: <AlertTriangle className="text-red-600 w-6 h-6" />,
              content: data.dangerousClauses.join("\n\n"),
            },
            {
              title: "Suggestions",
              icon: <Lightbulb className="text-yellow-500 w-6 h-6" />,
              content: data.suggestions.join("\n\n"),
            },
            {
              title: "Proofreading Fixes",
              icon: <CheckCircle className="text-green-700 w-6 h-6" />,
              content: data.proofreadingFixes.join("\n\n"),
            },
          ].map(({ title, icon, content }) => (
            <InsightCard
              key={title}
              title={title}
              icon={icon}
              content={content}
              onClick={() => setModalData({ title, content })}
            />
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalData && (
        <Modal onClose={closeModal} title={modalData.title}>
          <p className="text-blue-800 whitespace-pre-line">
            {modalData.content}
          </p>
        </Modal>
      )}
    </div>
  );
}

// Stat card component
function StatCard({
  title,
  value,
  percentage,
  positive,
  icon,
}: {
  title: string;
  value: string;
  percentage?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition border border-blue-100 flex items-center gap-4">
      <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
      <div className="flex flex-col">
        <p className="text-blue-700 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-semibold text-blue-900">{value}</h3>
        {percentage && (
          <p
            className={`mt-1 text-sm font-medium ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
}

// Insight card component - clickable
function InsightCard({
  title,
  icon,
  content,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  content: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label={`Open ${title} details`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      </div>
      <p className="text-blue-800 text-sm leading-relaxed truncate">
        {content}
      </p>
    </button>
  );
}

// Section header
function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-2 font-semibold text-lg text-blue-900">
      {icon}
      <h2>{title}</h2>
    </div>
  );
}

// Modal component - slide up from bottom
function Modal({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        aria-hidden="true"
      />

      {/* Modal container */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 max-w-3xl mx-auto shadow-xl animate-slide-up"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-blue-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-blue-800">{children}</div>
      </section>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease forwards;
        }
      `}</style>
    </>
  );
}
