"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { pdf } from "@react-pdf/renderer";

// Dynamically load TemplatePdf (PDF document component)
const TemplatePdf = dynamic(() => import("../../../components/TemplatePdf"), {
  ssr: false,
});

const defaultTemplates: Record<string, string> = {
  nda: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is made effective as of [Date], by and between [Party A], located at [Address], and [Party B], located at [Address].

1. Definition of Confidential Information
All information disclosed by either party...

2. Obligations of Receiving Party
The receiving party shall keep...

3. Term
This Agreement shall commence...

4. Governing Law
This Agreement shall be governed by the laws of [State].

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first written above.

___________________________
[Party A Signature]

___________________________
[Party B Signature]
`,

  employment: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on [Date] by and between [Employer Name], located at [Address] ("Employer"), and [Employee Name], residing at [Address] ("Employee").

1. Position and Duties
Employee agrees to perform...

2. Compensation
Employer shall pay Employee...

3. Term and Termination
This Agreement shall begin...

4. Confidentiality
Employee agrees to keep...

5. Governing Law
This Agreement shall be governed by...

_____________________________
[Employer Signature]

_____________________________
[Employee Signature]
`,

  lease: `LEASE AGREEMENT

This Lease Agreement ("Lease") is made and entered into on [Date], by and between [Landlord Name] ("Landlord") and [Tenant Name] ("Tenant").

1. Premises
Landlord hereby leases to Tenant...

2. Term
The term of this Lease shall be...

3. Rent
Tenant agrees to pay...

4. Security Deposit
Tenant shall deposit...

5. Maintenance and Repairs
Tenant shall maintain...

6. Governing Law
This Lease shall be governed by...

_____________________________
[Landlord Signature]

_____________________________
[Tenant Signature]
`,
};

export default function TemplateEditor() {
  const params = useParams();
  const templateId = params?.id as string;
  const [content, setContent] = useState("");

  useEffect(() => {
    if (templateId && defaultTemplates[templateId]) {
      setContent(defaultTemplates[templateId]);
    }
  }, [templateId]);

  const handleSave = () => {
    alert("Draft saved locally (for now)");
  };

  const handleDownload = async () => {
    const { default: TemplatePdfModule } = await import(
      "@/components/TemplatePdf"
    );
    const blob = await pdf(<TemplatePdfModule content={content} />).toBlob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateId}_template.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = () => {};

    return () => {
      console.error = originalConsoleError; // restore on unmount
    };
  }, []);

  return (
    <main className="min-h-screen p-10 bg-gradient-to-b from-white to-[#e0e8ff] font-serif">
      <h1 className="text-4xl font-bold mb-10 text-[#2c3a99] capitalize tracking-wide text-center">
        {templateId} Editor
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Editor */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col h-[600px] overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#5c5fff] rounded-t-2xl">
            <span className="text-white text-lg font-semibold tracking-wide capitalize">
              {templateId} Template.txt
            </span>
            <button
              onClick={handleSave}
              className="bg-white text-[#5c5fff] font-semibold px-4 py-1 rounded-lg hover:bg-gray-100 transition shadow-sm"
            >
              Save Draft
            </button>
          </header>

          <textarea
            className="flex-grow p-6 font-mono text-gray-800 text-base leading-relaxed resize-none border-none outline-none focus:ring-4 focus:ring-[#5c5fff]/30 scrollbar-thin scrollbar-thumb-[#5c5fff]/70 scrollbar-track-gray-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        </section>

        {/* PDF Preview */}
        <section className="flex flex-col h-[600px]">
          <header className="mb-4">
            <h2 className="text-2xl font-semibold text-[#2c3a99] text-center">
              Live PDF Preview
            </h2>
          </header>

          <div className="flex-grow rounded-2xl border border-gray-300 bg-white shadow-xl overflow-y-auto p-4">
            <TemplatePdf content={content} />
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDownload}
              className="bg-[#5c5fff] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#4338ca] transition shadow"
            >
              Download PDF
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
