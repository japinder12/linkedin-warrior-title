"use client";
import React from "react";

type Props = { isDark: boolean; items: string[] };

export default function ResultsHeader({ isDark, items }: Props) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className={`text-sm font-semibold tracking-tight ${isDark ? "text-slate-300" : "text-slate-700"}`}>Generated Titles</div>
      <button
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)] transition-colors`}
        onClick={() => { try { navigator.clipboard.writeText(items.join("\n")); setCopied(true); setTimeout(()=>setCopied(false), 1200); } catch {} }}
        aria-label={copied ? "List copied" : "Copy titles"}
        title={copied ? "List copied" : "Copy titles"}
      >
        {copied ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 4h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
            <rect x="9" y="2" width="6" height="4" rx="1.5" />
          </svg>
        )}
        <span className="hidden md:inline text-sm">Copy</span>
      </button>
    </div>
  );
}
