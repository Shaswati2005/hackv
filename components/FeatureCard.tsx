import React from 'react';

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
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex flex-col justify-between h-52">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="bg-[#6C63FF] p-2 rounded-md text-white text-xl">
          {icon}
        </div>
        {/* Text */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-snug">{description}</p>
        </div>
      </div>

      {/* Button */}
      <a
        href={href}
        className="mt-4 text-center text-sm px-4 py-2 rounded bg-[#6C63FF] text-white font-semibold hover:bg-indigo-700 transition"
      >
        {buttonText}
      </a>
    </div>
  );
}
