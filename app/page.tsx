import Navbar from "./components/Navbar";
import Link from "next/link";

const features = [
  {
    title: "Document Analysis",
    desc: "Quickly understand documents with AI-powered insights.",
    img: "https://via.placeholder.com/400x250",
    buttons: [{ text: "Try Now", href: "#" }],
  },
  {
    title: "Clause Explanations",
    desc: "Get simplified explanations of complex legal clauses.",
    img: "https://via.placeholder.com/400x250",
    buttons: [{ text: "Try Now", href: "#" }, { text: "Learn More", href: "#" }],
  },
  {
    title: "Drafting of Documents",
    desc: "Generate accurate legal drafts tailored to your needs.",
    img: "https://via.placeholder.com/400x250",
    buttons: [{ text: "Generate Draft", href: "#" }],
  },
  {
    title: "Loophole Detection",
    desc: "Identify potential weaknesses or missing clauses in contracts.",
    img: "https://via.placeholder.com/400x250",
    buttons: [{ text: "Scan Now", href: "#" }],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <header
        className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('https://via.placeholder.com/1600x800')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-md">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-white">
            Streamline Legal Workflows
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#e0e0e0]">
            Empowering law firms with seamless automation and collaboration tools
          </p>
          <Link
            href="#"
            className="inline-block mt-6 px-6 py-3 bg-[#5c5fff] text-white rounded-md hover:bg-[#4d4de0] text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#1a1a1a]">
          Features Section
        </h2>
        <p className="text-center text-[#5e5e5e] max-w-xl mx-auto mb-12">
          Explore how our powerful modules simplify legal workflows with advanced technologies.
        </p>

        <div className="space-y-16">
  {features.map((feature, idx) => {
    const isReversed = idx % 2 !== 0;
    return (
      <div
        key={idx}
        className={`flex flex-col md:flex-row items-center gap-8 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
      >
        <img
          src={feature.img}
          alt={feature.title}
          className="w-full md:w-1/2 rounded-md shadow-md"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-semibold text-[#1a1a1a]">
            {feature.title}
          </h3>
          <p className="text-[#5e5e5e] mt-2 mb-4">{feature.desc}</p>
          <div className="space-x-4">
            {feature.buttons.map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                className="inline-block px-4 py-2 bg-[#5c5fff] text-white rounded-md hover:bg-[#4d4de0] text-sm font-medium"
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  })}
</div>

      </section>

      <section className="py-16 bg-gray-50 text-center px-4 md:px-8 lg:px-16">
        <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">
          Ready to Transform Your Legal Workflow?
        </h3>
        <p className="text-[#5e5e5e] mb-6">
          Join LegalFlow today and experience the future of legal document handling.
        </p>
        <div className="space-x-4">
          <Link
            href="#"
            className="inline-block px-6 py-3 bg-[#5c5fff] text-white rounded-md hover:bg-[#4d4de0] text-sm font-medium"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="inline-block px-6 py-3 border border-gray-300 rounded-md hover:border-[#5c5fff] text-sm font-medium"
          >
            I prefer a demo session
          </Link>
        </div>
      </section>
    </>
  );
}
