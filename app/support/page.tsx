'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const faqs = [
  "How does document analysis work?",
  "Can I upload any type of legal document?",
  "How accurate are the clause explanations?",
  "What kind of loopholes can the tool detect?",
  "Is my data secure and private?",
  "How do I request drafting assistance?",
  "What languages are supported?",
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 ">
        <Navbar/>
        <div className='px-4 sm:px-8 lg:px-16 py-10'>
            <h1 className="text-2xl font-semibold text-center mb-10">LegalEase Support Center</h1>

      {/* Form + Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Contact Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            <input type="email" placeholder="Your Email" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            <input type="text" placeholder="Your Phone Number (optional)" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            <textarea placeholder="Your Message" rows={4} className="w-full border border-gray-300 rounded px-4 py-2 text-sm" />
            <button type="submit" className="w-full bg-[#6C63FF] text-white py-2 text-sm font-medium rounded hover:bg-indigo-600">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="mb-4">
            <Image
              src="/placeholder-image.jpg" // Replace with your actual image
              alt="Support Team"
              width={500}
              height={300}
              className="rounded-md"
            />
          </div>
          <ul className="text-sm space-y-2 text-gray-700">
            <li>📍 123 Legal Way, Suite 456, Judicial City, State 78901</li>
            <li>✉️ support@legalease.com</li>
            <li>📞 +1 (800) 555-LEGAL (5342)</li>
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-6">Frequently Asked Questions</h2>
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {faqs.map((question, index) => (
            <div key={index} className="py-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
              <div className="flex justify-between items-center">
                <span className="font-medium">{question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-sm text-gray-600">
                  {/* Placeholder content; you can replace with real answers */}
                  This is a detailed explanation for the question: "{question}".
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-gray-500">
        <p className="font-semibold mb-2">LegalEase</p>
        <div className="flex justify-center items-center space-x-2 mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          />
          <button className="bg-[#6C63FF] text-white px-4 py-1 rounded text-sm font-medium hover:bg-indigo-700">
            Subscribe
          </button>
        </div>
        <p>© 2025 LegalEase. All rights reserved.</p>
      </footer>

        </div>
      
    </div>
  );
}
