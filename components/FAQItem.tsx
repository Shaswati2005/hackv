// components/FAQItem.tsx
'use client';
import { useState } from 'react';

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-2 cursor-pointer" onClick={() => setOpen(!open)}>
      <p className="font-medium text-black">{question}</p>
      {open && <p className="text-sm text-gray-600 mt-1">{answer}</p>}
    </div>
  );
}
