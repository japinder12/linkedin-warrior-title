"use client";
import React from "react";

type Props = { setSeed: (n: number) => void; isDark: boolean; btnBd: string };

export default function SeedControls({ setSeed, isDark, btnBd }: Props) {
  return (
    <div className="min-w-[180px]">
      <label className={`mb-1 block text-xs uppercase tracking-widest opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Seed</label>
      <div className="mt-2 flex items-center justify-start md:justify-center">
        <button
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${btnBd} text-sm hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)]`}
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

