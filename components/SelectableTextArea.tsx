"use client";

import React, { useRef, useState, useEffect } from "react";

interface SelectableTextAreaProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SelectableTextArea: React.FC<SelectableTextAreaProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectionInfo, setSelectionInfo] = useState<{
    top: number;
    left: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      if (selectionStart === selectionEnd) {
        setSelectionInfo(null);
        return;
      }

      const selectedText = value.slice(selectionStart, selectionEnd);

      // Create a hidden div to calculate the selection position
      const div = document.createElement("div");
      const style = window.getComputedStyle(textarea);

      // Copy relevant styles
      const props = [
        "box-sizing",
        "width",
        "height",
        "overflow-x",
        "overflow-y",
        "border-top-width",
        "border-right-width",
        "border-bottom-width",
        "border-left-width",
        "padding-top",
        "padding-right",
        "padding-bottom",
        "padding-left",
        "font-style",
        "font-variant",
        "font-weight",
        "font-stretch",
        "font-size",
        "line-height",
        "font-family",
        "text-align",
        "text-transform",
      ];

      props.forEach((prop) => {
        div.style.setProperty(prop, style.getPropertyValue(prop));
      });

      Object.assign(div.style, {
        position: "absolute",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        visibility: "hidden",
      });

      document.body.appendChild(div);

      const textBeforeSelection = value.substring(0, selectionStart);
      const span = document.createElement("span");
      span.textContent = value.substring(selectionStart, selectionEnd);
      div.textContent = textBeforeSelection;
      div.appendChild(span);

      const rect = span.getBoundingClientRect();
      const textareaRect = textarea.getBoundingClientRect();

      setSelectionInfo({
        top: rect.top + window.scrollY - textareaRect.top + 20,
        left: rect.left + window.scrollX - textareaRect.left + 10,
        text: selectedText,
      });

      document.body.removeChild(div);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [value]);

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder={placeholder || "Paste or type text here..."}
        className="w-full rounded-xl bg-white text-gray-800 placeholder:text-gray-400 p-4 border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      {selectionInfo && (
        <div
          className="absolute bg-white border border-gray-300 rounded-xl shadow-md p-2 flex items-center gap-2 text-sm"
          style={{ top: selectionInfo.top, left: selectionInfo.left }}
        >
          <span className="text-blue-600 font-medium">Tools:</span>
          <button className="hover:underline">Highlight</button>
          <button className="hover:underline">Comment</button>
          <button className="hover:underline">Flag</button>
        </div>
      )}
    </div>
  );
};
