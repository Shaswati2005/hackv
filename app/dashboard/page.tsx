"use client";

import Navbar from "../../components/Navbar";
import FeatureCard from "../../components/FeatureCard";
import FAQItem from "../..//components/FAQItem";
import { faqs } from "../../data/faqs";
import { useEffect, useState } from "react";
import { getCurrentUsername } from "../../lib/supabaseHelpers";
import { supabase } from "../../lib/supabaseClient"; // ensure this exists
import { useRouter } from "next/navigation"; // for programmatic navigation
import { getAuthCookie } from "../../utils/auth";

export default function DashboardPage() {
  type Analysis = {
    id: string;
    text: string;
    createdAt: string;
  };

  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  const [username, setUsername] = useState("User");

  const createdTemplates = [
    {
      id: "nda",
      title: "NDA Agreement",
      description: "Protect sensitive information.",
    },
    {
      id: "employment",
      title: "Employment Contract",
      description: "Standard hiring agreement.",
    },
    {
      id: "lease",
      title: "Lease Agreement",
      description: "Rental property agreement.",
    },
  ];

  useEffect(() => {
    async function fetchUsername() {
      const name = await getCurrentUsername();
      setUsername(name || "User");
    }

    fetchUsername();
  }, []);

  useEffect(() => {
    async function fetchUserAnalyses() {
      const userId = getAuthCookie();

      const { data, error } = await supabase
        .from("LegalAnalysis")
        .select("id,text,createdAt")
        .eq("userId", userId)
        .order("createdAt", { ascending: false });

      if (error) console.error("Error fetching analyses:", error.message);

      if (!error && data) {
        setAnalyses(data); // Or setAnalyses(prev => [...prev, ...data]) if appending
      }
    }

    fetchUserAnalyses(); // ✅ only call this here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f3f4f6] text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">
          Welcome back, {username}!
        </h1>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            icon="📄"
            title="Document Analysis"
            description="Analyze legal documents for structure, terms, and risks."
            buttonText="Start Analysis"
            href="/explanation"
          />
          <FeatureCard
            icon="📘"
            title="Clause Explanations"
            description="Understand and compare legal clauses instantly."
            buttonText="Explain Clause"
            href="/explanation"
          />
          <FeatureCard
            icon="🕳️"
            title="Loophole Detection"
            description="Find weak points to avoid legal risks."
            buttonText="Detect Loopholes"
            href="/explanation"
          />
          <FeatureCard
            icon="📝"
            title="Drafting Assistance"
            description="Create or modify documents with AI."
            buttonText="Start Drafting"
            href="/drtemp"
          />
        </section>

        {/* Recent Activity & Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Documents */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-1">Recent Activity</h2>
              <p className="text-sm text-gray-600 mb-4">
                Your most recently viewed or modified documents.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-800 table-fixed">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left">
                      <th className="py-3 px-4 font-medium w-1/3">ID</th>
                      <th className="py-3 px-4 font-medium w-1/3">Overview</th>
                      <th className="py-3 px-4 font-medium w-1/3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyses.map((doc, idx) => (
                      <tr
                        key={idx}
                        onClick={() => {
                          window.location.href = `/explanation/${doc.id}`;
                        }}
                        className="border-b last:border-none hover:bg-gray-50 hover:cursor-pointer transition h-16"
                      >
                        <td className="py-3 px-4 truncate max-w-[200px]">
                          {doc.id}
                        </td>
                        <td className="py-3 px-4 text-indigo-600 font-medium truncate max-w-[200px]">
                          {doc.text}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[200px]">
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Created Drafts Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-1">
                Your Created Drafts
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Access and edit your legal draft templates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {createdTemplates.map((template) => (
                  <a
                    key={template.id}
                    href={`/drtemp/${template.id}`}
                    className="group bg-gray-50 hover:bg-white transition-all rounded-xl p-4 border border-gray-200 hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-indigo-700 group-hover:text-indigo-900 transition">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <ul className="space-y-3 text-sm">
                <li className="cursor-pointer text-gray-800 hover:text-indigo-600 transition">
                  📤{" "}
                  <span
                    onClick={() => {
                      window.location.href = "/explanation";
                    }}
                    className="underline underline-offset-2"
                  >
                    Upload New Document
                  </span>
                </li>
                <li className="cursor-pointer text-gray-800 hover:text-indigo-600 transition">
                  💡{" "}
                  <span
                    onClick={() => {
                      window.location.href = "/explanation";
                    }}
                    className="underline underline-offset-2"
                  >
                    Get Quick Clause Explanation
                  </span>
                </li>
              </ul>
            </div>

            {/* FAQs / Tips */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-lg font-semibold mb-4">
                Tips & Announcements
              </h2>
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
          <p>
            © 2025{" "}
            <span className="font-semibold text-indigo-600">LegalEase</span>.
            All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
