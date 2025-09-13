"use client";
import React from "react";

type Props = { setSeed: (n: number) => void; isDark: boolean; btnBd: string };

export default function SeedControls({ setSeed, isDark, btnBd }: Props) {
  return (
    <div className="min-w-[200px]">
      <div className="flex items-center justify-between">
        <label className={`block text-[11px] font-medium uppercase tracking-wide opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Seed</label>
        <button
          className={`h-9 px-3 rounded-full border ${btnBd} text-sm inline-flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)]`}
          onClick={()=> setSeed(Math.floor(Math.random()*1e9))}
          aria-label="Shuffle seed"
          title="Shuffle seed"
        >
          <span role="img" aria-hidden>🎲</span>
          <span className="hidden sm:inline">Shuffle</span>
        </button>
      </div>
    </div>
  );
}
