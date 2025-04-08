"use client";

import { useState } from "react";
import { ENGINES } from "./constants";
import { FileSelect } from "./components/main/FileType";
import { Header } from "./components/layout/header";
import { Preview } from "./components/main/Query";

export default function Home() {
  const [query, setQuery] = useState("");
  const [customFile, setcustomFile] = useState("");
  const [domain, setDomain] = useState("");
  const [inUrl, setInUrl] = useState("");
  const [inTitle, setInTitle] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("Google");
  const [selectedTypes, setselectedTypes] = useState<string[]>([]);

  const buildQuery = () => {
    let dQuery = query ? `"${query}"` : "";

    if (selectedTypes.length > 0) {
      const fileTypesQuery = selectedTypes
        .map((type) => `filetype:${type}`)
        .join(" OR ");
      dQuery += ` ${fileTypesQuery}`;
    } else if (customFile) {
      dQuery += ` filetype:${customFile}`;
    }

    if (domain) dQuery += ` site:${domain}`;
    if (inUrl) dQuery += ` inurl:${inUrl}`;
    if (inTitle) dQuery += ` intitle:${inTitle}`;

    window.open(
      `${ENGINES[selectedEngine as keyof typeof ENGINES]}${encodeURIComponent(
        dQuery
      )}`,
      "_blank"
    );
  };

  return (
    <div>
      <main className="min-h-screen p-4 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <Header />

          <div className="space-y-8">
            <input
              type="text"
              placeholder="Enter exact words to match..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input-field text-lg"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300">
                  File Types
                </label>
                <div className="bg-gray-900/30 p-4 rounded-xl border-2 border-gray-800/50">
                  <FileSelect onChange={setselectedTypes} />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Domain
                  </label>
                  <input
                    type="text"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    In URL
                  </label>
                  <input
                    type="text"
                    placeholder="admin, login, config..."
                    value={inUrl}
                    onChange={(e) => setInUrl(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    In Title
                  </label>
                  <input
                    type="text"
                    placeholder="index of, admin panel..."
                    value={inTitle}
                    onChange={(e) => setInTitle(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom File Type
                  </label>
                  <input
                    type="text"
                    placeholder="Specify a custom file type..."
                    value={customFile}
                    onChange={(e) => setcustomFile(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search Engine
                  </label>
                  <select
                    value={selectedEngine}
                    onChange={(e) => setSelectedEngine(e.target.value)}
                    className="w-full"
                  >
                    {Object.keys(ENGINES).map((engine) => (
                      <option key={engine} value={engine}>
                        {engine}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={buildQuery}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Search with {selectedEngine}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Preview
            query={query}
            selectedTypes={selectedTypes}
            customFile={customFile}
            domain={domain}
            inUrl={inUrl}
            inTitle={inTitle}
          />
        </div>
      </main>
      <footer className="text-center text-gray-400 text-sm py-4 bg-gray-900/50 border-t border-gray-800">
        <p>
          Made with 💚 by{" "}
          <a
            href="https://3kh0.net"
            className="text-blue-500 hover:underline hover:text-blue-400 transition-colors duration-200"
          >
            3kh0
          </a>
          . Not for malicious use.
        </p>
      </footer>
    </div>
  );
}
