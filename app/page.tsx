import Navbar from "../components/Navbar";
import Link from "next/link";

const features = [
  {
    title: "Document Analysis",
    desc: "Quickly understand documents with AI-powered insights.",
    img: "/docanalysis.svg",
    buttons: [{ text: "Try Now", href: "#" }],
  },
  {
    title: "Clause Explanations",
    desc: "Get simplified explanations of complex legal clauses.",
    img: "/clauseexplanation.svg",
    buttons: [
      { text: "Try Now", href: "#" },
      { text: "Learn More", href: "#" },
    ],
  },
  {
    title: "Drafting of Documents",
    desc: "Generate accurate legal drafts tailored to your needs.",
    img: "/drafting.svg",
    buttons: [{ text: "Generate Draft", href: "#" }],
  },
  {
    title: "Loophole Detection",
    desc: "Identify potential weaknesses or missing clauses in contracts.",
    img: "loophole.svg",
    buttons: [{ text: "Scan Now", href: "#" }],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <video
        src={"/bg.webm"}
        className="w-full h-full fixed top-0 left-0 -z-1 object-cover"
        autoPlay={true}
        loop={true}
        muted={true}
      ></video>
      <header className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white text-center px-4 md:px-8">
        <div className="bg-black/50 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-xl max-w-3xl w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Streamline Legal Workflows
          </h1>
          <p className="mt-4 text-base md:text-xl text-gray-200 leading-relaxed">
            Empowering law firms with seamless automation and collaboration
            tools.
          </p>
          <Link
            href="/signup"
            className="inline-block mt-6 px-6 py-3 bg-[#5c5fff] hover:bg-[#4d4de0] text-white rounded-md text-sm font-medium transition duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="py-16 z-0 px-4 md:px-8 lg:px-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#1a1a1a]">
          Features Section
        </h2>
        <p className="text-center text-[#5e5e5e] max-w-xl mx-auto mb-12">
          Explore how our powerful modules simplify legal workflows with
          advanced technologies.
        </p>

        <div className="space-y-16">
          {features.map((feature, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row overflow-hidden items-center gap-8 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="max-w-3/4 max-h-[300px] md:w-1/2 shadow-md transition-all duration-500 ease-in-out hover:-translate-y-1 hover:rotate-1 hover:shadow-[inset_0px_5px_15px_-3px_rgba(0,_0,_0,_0.2)]lg rounded-md"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-[#1a1a1a]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mt-2 mb-4 leading-relaxed">
                    {feature.desc}
                  </p>

                  <div className="space-x-4">
                    {feature.buttons.map((btn, i) => (
                      <Link
                        key={i}
                        href={btn.href}
                        className="inline-block px-5 py-2 bg-[#5c5fff] text-white rounded-md hover:bg-[#4d4de0] transition duration-300 text-sm font-medium"
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
          Join LegalFlow today and experience the future of legal document
          handling.
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
