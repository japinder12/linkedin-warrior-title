"use client";
import React from "react";

type Props = { memeMode: boolean; setMemeMode: (v: boolean) => void; isDark: boolean; btnBd: string };

export default function MemeModeToggle({ memeMode, setMemeMode, isDark, btnBd }: Props) {
  return (
    <div className="min-w-[200px]">
      <label className={`mb-1 block text-xs uppercase tracking-widest opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Meme Mode</label>
      <div className="mt-2 flex items-center">
        <button
          type="button"
          onClick={() => setMemeMode(!memeMode)}
          className={`h-9 px-3 rounded-full border ${btnBd} text-sm inline-flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)] ${memeMode ? "bg-[var(--accent-10)] border-[var(--accent)] text-[var(--accent)] ring-2 ring-[var(--accent-40)]" : ""}`}
          aria-pressed={memeMode}
          aria-label="Toggle Meme Mode"
          title="Meme Mode"
        >
          <span role="img" aria-hidden className="inline-flex items-center justify-center w-4 h-4 leading-none">🦄</span>
          {memeMode ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}
