"use client";

import { useState } from "react";
import { FILE_TYPES } from "../../constants/files";
import type { FileState } from "../../types/fileTypes";

interface FileSelectProps {
  onChange: (types: string[]) => void;
}

export const FileSelect = ({ onChange }: FileSelectProps) => {
  const [expandCat, setExpand] = useState<string | null>(null);
  const [FileState, setFileState] = useState<FileState>(() => {
    const initial: FileState = {};
    Object.entries(FILE_TYPES).forEach(([category, extensions]) => {
      initial[category] = {
        selected: false,
        extensions: extensions.reduce(
          (acc, ext) => ({ ...acc, [ext]: false }),
          {}
        ),
      };
    });
    return initial;
  });

  const changeType = (category: string, checked: boolean) => {
    setFileState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        selected: checked,
        extensions: Object.keys(prev[category].extensions).reduce(
          (acc, ext) => ({ ...acc, [ext]: checked }),
          {}
        ),
      },
    }));

    const updated = Object.entries(FileState).flatMap(([cat, state]) => {
      if (cat === category) {
        return checked ? FILE_TYPES[cat as keyof typeof FILE_TYPES] : [];
      }
      return state.selected ? FILE_TYPES[cat as keyof typeof FILE_TYPES] : [];
    });
    onChange(updated);
  };

  const changeExt = (category: string, extension: string, checked: boolean) => {
    setFileState((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        extensions: {
          ...prev[category].extensions,
          [extension]: checked,
        },
      },
    }));

    const updated = Object.entries(FileState).flatMap(([cat, state]) => {
      if (cat === category) {
        return Object.entries(state.extensions)
          .filter(([ext, selected]) => (ext === extension ? checked : selected))
          .map(([ext]) => ext);
      }
      return Object.entries(state.extensions)
        .filter(([, selected]) => selected) // Removed unused parameter
        .map(([ext]) => ext);
    });
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {Object.entries(FILE_TYPES).map(([category, extensions]) => (
        <div key={category} className="relative group">
          <div className="category-button group">
            <label className="flex items-center space-x-3 w-full cursor-pointer">
              <input
                type="checkbox"
                checked={FileState[category]?.selected || false}
                onChange={(e) => changeType(category, e.target.checked)}
              />
              <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                {category.replace(/_/g, " ")}
              </span>
            </label>
            <button
              onClick={() =>
                setExpand(expandCat === category ? null : category)
              }
              className="p-1.5 rounded-md hover:bg-gray-700/50 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandCat === category ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {expandCat === category && (
            <div className="extension-grid">
              {extensions.map((ext) => (
                <label
                  key={ext}
                  className="flex items-center space-x-2 cursor-pointer group/ext"
                >
                  <input
                    type="checkbox"
                    checked={FileState[category]?.extensions[ext] || false}
                    onChange={(e) => changeExt(category, ext, e.target.checked)}
                  />
                  <span className="text-sm text-gray-400 group-hover/ext:text-gray-200 transition-colors">
                    .{ext}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
