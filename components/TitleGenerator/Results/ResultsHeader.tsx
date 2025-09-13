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
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)] transition-colors"
        onClick={copyAll}
        aria-label={copied ? "List copied" : "Copy all titles"}
        title={copied ? "List copied" : "Copy all titles"}
      >
        <span className="inline-flex items-center justify-center">
          {copied ? (
            // Checkmark (neutral) with pop+fade
            <svg
              key="check" /* remount to re-trigger animation */
              className={`icon-pop ${isDark ? "text-slate-200" : "text-slate-700"}`}
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            // Clipboard with pop+fade on first mount as well (subtle)
            <svg
              key="clip"
              className="icon-pop opacity-90"
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 4h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
              <rect x="9" y="2" width="6" height="4" rx="1.5" />
            </svg>
          )}
        </span>
        <span className="hidden md:inline text-sm">
          {copied ? "Copied!" : "Copy all"}
        </span>
      </button>

      {/* microinteraction keyframes */}
      <style jsx>{`
        .icon-pop {
          animation: popfade 180ms ease-out;
        }
        @keyframes popfade {
          0%   { opacity: 0; transform: scale(0.85); }
          60%  { opacity: 1; transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
