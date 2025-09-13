"use client";
import { useState } from "react";

type Props = { text: string; index: number; dark: boolean };

export default function TitleCard({ text, index, dark }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Clipboard blocked. Select & copy manually.");
    }
  }

  const base = dark
    ? "bg-slate-900/70 border-slate-800 hover:bg-slate-900"
    : "bg-slate-50 border-slate-200 hover:bg-slate-100";

  return (
    <button
      onClick={copyToClipboard}
      className={`${base} group text-left border rounded-2xl p-4 active:scale-[.99] transition shadow-sm hover:shadow-md hover:-rotate-[0.2deg] flex items-start justify-between gap-3`}
      title="Click to copy"
      aria-label={`Copy title ${index + 1}`}
    >
      <div>
        <div className="text-xs opacity-60">Title #{index + 1}</div>
        <div className="font-medium mt-1 leading-snug tracking-tight">{text}</div>
      </div>
      <div className={`mt-1 inline-flex items-center gap-1 text-xs ${dark ? "text-slate-400" : "text-slate-600"}`}>
        {copied ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-70 group-hover:opacity-100">
              <path d="M8 7h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 7V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Copy
          </>
        )}
      </div>
    </button>
  );
}
