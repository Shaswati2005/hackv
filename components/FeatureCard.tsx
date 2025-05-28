import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  buttonText,
  href,
}: FeatureCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-56">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="bg-gradient-to-tr from-[#6C63FF] to-[#A78BFA] p-3 rounded-lg text-white text-xl shadow-sm">
          {icon}
        </div>

        {/* Text */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Button */}
      <a
        href={href}
        className="mt-6 text-center text-sm px-4 py-2 rounded-lg bg-[#6C63FF] text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
      >
        {buttonText}
      </a>
    </div>
  );
}
