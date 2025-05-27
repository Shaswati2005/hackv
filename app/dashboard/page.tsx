'use client';

import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import FAQItem from '@/components/FAQItem';
import { faqs } from '@/data/faqs';

export default function DashboardPage() {
  const recentDocuments = [
    { name: 'Employment Contract Draft v3', type: 'Contract', date: '2025-05-26' },
    { name: 'Partnership Agreement – Key Terms', type: 'Agreement', date: '2025-05-25' },
    { name: 'Will of John Doe Analysis', type: 'Will', date: '2025-05-24' },
    { name: 'Property Deed Explanation', type: 'Deed', date: '2025-05-23' },
    { name: 'NDA Template Customization', type: 'Template', date: '2025-05-22' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Welcome back, John Doe!</h1>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <FeatureCard
            icon="📄"
            title="Document Analysis"
            description="Upload and analyze legal documents for structure, key terms, and potential issues."
            buttonText="Start Analysis"
            href="#"
          />
          <FeatureCard
            icon="📘"
            title="Clause Explanations"
            description="Highlight specific clauses to compare legal meaning and usage."
            buttonText="Explain Clause"
            href="#"
          />
          <FeatureCard
            icon="🕳️"
            title="Loophole Detection"
            description="Detect potential issues in documents to avoid legal risks."
            buttonText="Detect Loopholes"
            href="#"
          />
          <FeatureCard
            icon="📝"
            title="Drafting Assistance"
            description="Get help writing customized or modified documents."
            buttonText="Start Drafting"
            href="#"
          />
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Recent Activity</h2>
            <p className="text-sm text-gray-600 mb-4">Documents you've recently accessed or modified.</p>
            <table className="w-full text-sm text-gray-800">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-medium">Document Name</th>
                  <th className="text-left py-2 font-medium">Type</th>
                  <th className="text-left py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDocuments.map((doc, idx) => (
                  <tr key={idx} className="border-b border-gray-100 last:border-none">
                    <td className="py-2">{doc.name}</td>
                    <td className="py-2">{doc.type}</td>
                    <td className="py-2">{doc.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <ul className="space-y-3 text-sm">
                <li className="cursor-pointer hover:underline text-gray-800">📤 Upload New Document</li>
                <li className="cursor-pointer hover:underline text-gray-800">💡 Get Quick Clause Explanation</li>
              </ul>
            </div>

            {/* Tips & Announcements */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Tips & Announcements</h2>
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          <p>© 2025 LegalEase. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
