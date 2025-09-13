"use client";
import { useState } from "react";

type Props = { text: string; dark: boolean };

export default function TitleCard({ text, dark }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      alert("Clipboard blocked. Select & copy manually.");
    }
  }

  const surface = dark
    ? "bg-slate-900/70 border-slate-800 hover:bg-slate-900"
    : "bg-slate-50 border-slate-200 hover:bg-slate-100";

  const ring = dark ? "focus-visible:ring-[#7CC4FF]/40" : "focus-visible:ring-[#0A66C2]/30";
  const copyIdle = dark
    ? "border-slate-700 text-slate-300 hover:text-[#7CC4FF] hover:border-[#7CC4FF]/40"
    : "border-slate-300 text-slate-700 hover:text-[#0A66C2] hover:border-[#0A66C2]/40";

  return (
    <div
      className={[
        surface,
        "relative border rounded-2xl p-3 shadow-sm h-full min-h-[90px]",
        "transition-colors motion-safe:duration-200 hover:shadow-md",
      ].join(" ")}
    >
      {/* tighter, smaller button */}
      <button
        onClick={copyToClipboard}
        className={[
          "absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] border",
          copyIdle,
          "focus-visible:outline-none",
          ring,
          "motion-safe:transition-colors",
        ].join(" ")}
        aria-label="Copy title"
        aria-pressed={copied}
        title={copied ? "Copied!" : "Copy title"}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-200">
              <path
                d="M20 6L9 17l-5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Copied
          </>
        ) : (
          <>
            {/* Clipboard icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              <path d="M16 4h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
              <rect x="9" y="2" width="6" height="4" rx="1.5" />
            </svg>
            Copy
          </>
        )}
      </button>

      {/* Title — intentional wrapping */}
      <div className="pr-16">
        <div
          className={[
            "text-[16px] md:text-[17px] font-medium leading-snug tracking-tight antialiased text-balance",
            "whitespace-normal break-words text-pretty",
          ].join(" ")}
        >
          {text}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
