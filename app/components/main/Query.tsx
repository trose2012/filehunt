"use client";

import { useState } from "react";

interface PreviewProps {
  query: string;
  selectedTypes: string[];
  customFile?: string;
  domain?: string;
  inUrl?: string;
  inTitle?: string;
}

export const Preview = ({
  query,
  selectedTypes,
  customFile,
  domain,
  inUrl,
  inTitle,
}: PreviewProps) => {
  const [isOpen, setisOpen] = useState(false);

  if (!query) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setisOpen(false)}
        />
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%-40px)]"
        }`}
      >
        <div
          onClick={() => setisOpen(!isOpen)}
          className="mx-auto w-fit cursor-pointer group"
        >
          <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-t-lg flex items-center space-x-2">
            <span className="text-sm font-medium">Query Preview</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gray-900/95 backdrop-blur-md border-t-2 border-gray-800">
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-sm font-medium text-gray-400 mb-3">
              Generated Query:
            </h2>
            <p className="font-mono text-gray-200 break-all text-sm">
              {`"${query}"`}
              {selectedTypes.length > 0 &&
                ` ${selectedTypes
                  .map((type) => `filetype:${type}`)
                  .join(" OR ")}`}
              {customFile && ` filetype:${customFile}`}
              {domain && ` site:${domain}`}
              {inUrl && ` inurl:${inUrl}`}
              {inTitle && ` intitle:${inTitle}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
