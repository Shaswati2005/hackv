"use client";

import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import FAQItem from "@/components/FAQItem";
import { faqs } from "@/data/faqs";

export default function DashboardPage() {
  const recentDocuments = [
    {
      name: "Employment Contract Draft v3",
      type: "Contract",
      date: "2025-05-26",
    },
    {
      name: "Partnership Agreement – Key Terms",
      type: "Agreement",
      date: "2025-05-25",
    },
    { name: "Will of John Doe Analysis", type: "Will", date: "2025-05-24" },
    { name: "Property Deed Explanation", type: "Deed", date: "2025-05-23" },
    {
      name: "NDA Template Customization",
      type: "Template",
      date: "2025-05-22",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f3f4f6] text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">
          Welcome back, John Doe!
        </h1>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            icon="📄"
            title="Document Analysis"
            description="Analyze legal documents for structure, terms, and risks."
            buttonText="Start Analysis"
            href="#"
          />
          <FeatureCard
            icon="📘"
            title="Clause Explanations"
            description="Understand and compare legal clauses instantly."
            buttonText="Explain Clause"
            href="#"
          />
          <FeatureCard
            icon="🕳️"
            title="Loophole Detection"
            description="Find weak points to avoid legal risks."
            buttonText="Detect Loopholes"
            href="#"
          />
          <FeatureCard
            icon="📝"
            title="Drafting Assistance"
            description="Create or modify documents with AI."
            buttonText="Start Drafting"
            href="#"
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
                <table className="w-full text-sm text-gray-800">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left">
                      <th className="py-3 px-4 font-medium">Name</th>
                      <th className="py-3 px-4 font-medium">Type</th>
                      <th className="py-3 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDocuments.map((doc, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{doc.name}</td>
                        <td className="py-3 px-4 text-indigo-600 font-medium">
                          {doc.type}
                        </td>
                        <td className="py-3 px-4">{doc.date}</td>
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
                  <span className="underline underline-offset-2">
                    Upload New Document
                  </span>
                </li>
                <li className="cursor-pointer text-gray-800 hover:text-indigo-600 transition">
                  💡{" "}
                  <span className="underline underline-offset-2">
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
