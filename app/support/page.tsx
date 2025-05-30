"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";

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
    <>
      <div className="min-h-screen gradient-bg manrope-sans bg-white text-black">
        <Navbar />
        <div className="px-4 sm:px-8 lg:px-16 py-10">
          <h1 className="text-2xl font-semibold text-center mb-10 text-black">
            LegalEase Support Center
          </h1>

          {/* Form + Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Send Us a Message
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-400 rounded px-4 py-2 text-sm text-black"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-400 rounded px-4 py-2 text-sm text-black"
                />
                <input
                  type="text"
                  placeholder="Your Phone Number (optional)"
                  className="w-full border border-gray-400 rounded px-4 py-2 text-sm text-black"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full border border-gray-400 rounded px-4 py-2 text-sm text-black"
                />
                <button
                  type="submit"
                  className="w-full bg-[#6C63FF] text-white py-2 text-sm font-medium rounded hover:bg-indigo-700"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-center text-black">
                Contact Information
              </h2>
              <div className="mb-4 w-full flex justify-center">
                <Image
                  src="/support.svg"
                  alt="Support Team"
                  width={500}
                  height={300}
                  className="rounded-md"
                />
              </div>
              <ul className="text-sm space-y-2 text-gray-900 flex flex-col items-center ">
                <li>📍 123 Legal Way, Suite 456, Judicial City, State 78901</li>
                <li>✉️ support@legalease.com</li>
                <li>📞 +1 (800) 555-LEGAL (5342)</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6 text-black">
              Frequently Asked Questions
            </h2>
            <div className="border-t border-gray-300 divide-y divide-gray-300">
              {faqs.map((question, index) => (
                <div
                  key={index}
                  className="py-4 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-black">{question}</span>
                    <span className="text-black">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                  {openIndex === index && (
                    <p className="mt-2 text-sm text-gray-800">
                      This is a detailed explanation for the question: "
                      {question}".
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-16 text-sm text-gray-800">
            <p className="font-semibold mb-2 text-black">LegalEase</p>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-1 border border-gray-400 rounded text-sm text-black"
              />
              <button className="bg-[#6C63FF] text-white px-4 py-1 rounded text-sm font-medium hover:bg-indigo-700">
                Subscribe
              </button>
            </div>
            <p>© 2025 LegalEase. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* Gradient Background Styling */}
      <style jsx global>{`
        .gradient-bg::before {
          content: "";
          position: fixed;
          inset: 0;
          background: linear-gradient(
            -45deg,
            #6c63ff,
            #9f7aea,
            #c084fc,
            #6b21a8
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          z-index: -1;
          opacity: 0.08; /* reduced from 0.15 for better contrast */
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
