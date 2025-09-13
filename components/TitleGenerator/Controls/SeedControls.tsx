"use client";
import React from "react";

type Props = {
  isDark: boolean;
  onShuffle: () => void;
};

export default function SeedControls({ isDark, onShuffle }: Props) {
  const bd = isDark ? "border-slate-700/40" : "border-slate-300";
  return (
    <div className="min-w-0">
      <label
        className={`mb-2 block text-[11px] uppercase tracking-wide font-medium ${
          isDark ? "text-slate-300/80" : "text-slate-700/80"
        }`}
      >
        Seed
      </label>

      <button
        type="button"
        onClick={onShuffle}
        aria-describedby="seed"
        className={`h-9 px-3 rounded-full border ${bd} text-sm inline-flex items-center gap-2
                    hover:bg-white/5 dark:hover:bg-white/5
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)]
                    transition-colors`}
      >
        <span role="img" aria-hidden className="text-[16px] leading-none" title="Shuffle">🎲</span>
        Shuffle
      </button>
    </div>
  );
}
