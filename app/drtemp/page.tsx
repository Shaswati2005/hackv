import Navbar from "@/components/Navbar";
import Link from "next/link";

const templates = [
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

export default function TemplatesPage() {
  return (
    <main className="min-h-screen   bg-gradient-to-b from-white to-[#eef2ff] font-sans">
      <Navbar />
      <h1 className="text-5xl mt-5 px-5 font-extrabold mb-12 text-[#1f2937] tracking-tight select-none">
        Legal Draft Templates
      </h1>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {templates.map(({ id, title, description }) => (
          <div
            key={id}
            tabIndex={0}
            className="group relative bg-white rounded-2xl shadow-lg border border-transparent
                       p-8 cursor-pointer flex flex-col justify-between
                       transition-transform duration-300 ease-in-out
                       hover:scale-[1.03] hover:shadow-2xl hover:border-[#6366f1]
                       focus-within:scale-[1.03] focus-within:shadow-2xl focus-within:border-[#6366f1]"
            aria-label={`Use the ${title} template`}
          >
            {/* Template Info */}
            <div>
              <h2 className="text-3xl font-semibold text-[#4f46e5] group-hover:text-[#4338ca] transition-colors duration-300">
                {title}
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-[90%]">
                {description}
              </p>
            </div>

            {/* Action Button */}
            <Link
              href={`/drtemp/${id}`}
              className="mt-8 self-start px-8 py-3 rounded-full font-semibold bg-[#4f46e5] text-white
                         shadow-lg hover:bg-[#4338ca] focus-visible:outline-none focus-visible:ring-4
                         focus-visible:ring-[#4338ca] focus-visible:ring-opacity-60 transition-colors duration-300"
            >
              Use Template
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
