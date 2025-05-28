import Navbar from "../components/Navbar";
import Link from "next/link";

const features = [
  {
    title: "Document Analysis",
    desc: "Quickly understand documents with AI-powered insights.",
    img: "/docanalysis.svg",
    buttons: [{ text: "Try Now", href: "/explanation" }],
  },
  {
    title: "Clause Explanations",
    desc: "Get simplified explanations of complex legal clauses.",
    img: "/clauseexplanation.svg",
    buttons: [{ text: "Try Now", href: "/explanation" }],
  },
  {
    title: "Drafting of Documents",
    desc: "Generate accurate legal drafts tailored to your needs.",
    img: "/drafting.svg",
    buttons: [{ text: "Generate Draft", href: "/drtemp" }],
  },
  {
    title: "Loophole Detection",
    desc: "Identify potential weaknesses or missing clauses in contracts.",
    img: "loophole.svg",
    buttons: [{ text: "Scan Now", href: "/explanation" }],
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
          Features
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

      <section className="py-16 bg-gray-50 text-center px-6 md:px-12 lg:px-24">
        <h3 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
          Ready to Transform Your Legal Workflow?
        </h3>
        <p className="max-w-2xl mx-auto text-[#5e5e5e] mb-8 text-base leading-relaxed">
          Join LegalFlow today and experience the future of legal document
          handling with AI-powered analysis, automated risk detection, and
          seamless collaboration.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Link
            href="#"
            className="inline-block px-8 py-3 bg-[#5c5fff] text-white rounded-md hover:bg-[#4d4de0] text-sm font-semibold transition-colors duration-300"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="inline-block px-8 py-3 border border-gray-300 rounded-md hover:border-[#5c5fff] text-sm font-semibold transition-colors duration-300"
          >
            Request a Demo Session
          </Link>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-2">Contact Us</h4>
            <p className="text-[#5e5e5e] text-sm">
              Email:{" "}
              <a
                href="mailto:support@legalflow.com"
                className="underline hover:text-[#5c5fff]"
              >
                support@legalflow.com
              </a>
            </p>
            <p className="text-[#5e5e5e] text-sm">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="underline hover:text-[#5c5fff]"
              >
                +1 (234) 567-890
              </a>
            </p>
            <p className="text-[#5e5e5e] text-sm">
              Address: 123 LegalFlow Ave, Suite 100, San Francisco, CA
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-2">Quick Links</h4>
            <ul className="space-y-1 text-[#5e5e5e] text-sm">
              <li>
                <Link href="#" className="hover:text-[#5c5fff] underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#5c5fff] underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#5c5fff] underline">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#5c5fff] underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#1a1a1a] mb-2">Follow Us</h4>
            <div className="flex gap-4 mt-1">
              <Link
                href="#"
                aria-label="Twitter"
                className="text-[#5c5fff] hover:text-[#4d4de0] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.52 8.52 0 0 1-2.7 1.03 4.25 4.25 0 0 0-7.25 3.87 12.06 12.06 0 0 1-8.76-4.44 4.26 4.26 0 0 0 1.32 5.68 4.22 4.22 0 0 1-1.93-.53v.05a4.25 4.25 0 0 0 3.41 4.17 4.28 4.28 0 0 1-1.92.07 4.26 4.26 0 0 0 3.97 2.96A8.53 8.53 0 0 1 2 18.57 12.03 12.03 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0 0 22.46 6z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-[#5c5fff] hover:text-[#4d4de0] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8a2.5 2.5 0 0 1-.02-4.5zM3 9h4v12H3zM9 9h3.6v1.8h.05a3.95 3.95 0 0 1 3.55-1.95c3.8 0 4.5 2.5 4.5 5.7V21h-4v-5.7c0-1.3-.03-3-1.8-3-1.8 0-2.1 1.4-2.1 2.9V21h-4z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="text-[#5c5fff] hover:text-[#4d4de0] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54v-2.2c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.89h-2.3v6.99C18.34 21.13 22 16.99 22 12z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          &copy; 2025 LegalFlow. All rights reserved.
        </p>
      </section>
    </>
  );
}
