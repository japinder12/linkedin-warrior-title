"use client";
import React from "react";

type Props = { isDark: boolean; items: string[] };

export default function ResultsHeader({ isDark, items }: Props) {
  const [copied, setCopied] = React.useState(false);

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(items.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      alert("Clipboard blocked. Select & copy manually.");
    }
  }

  return (
    <div className="mb-3 flex items-center justify-between">
      <div
        className={`text-sm font-semibold tracking-tight ${
          isDark ? "text-slate-300" : "text-slate-700"
        }`}
      >
        Generated Titles
      </div>
      <button
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)] transition-colors`}
        onClick={copyAll}
        aria-label={copied ? "List copied" : "Copy all titles"}
        title={copied ? "List copied" : "Copy all titles"}
      >
        {copied ? (
          // Checkmark icon (neutral white/slate)
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isDark ? "text-slate-200" : "text-slate-700"}
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          // Clipboard icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
            aria-hidden="true"
          >
            <path d="M16 4h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
            <rect x="9" y="2" width="6" height="4" rx="1.5" />
          </svg>
        )}
        <span className="hidden md:inline text-sm">
          {copied ? "Copied!" : "Copy all"}
        </span>
      </button>
    </div>
  );
}
