"use client";
import React from "react";

type Props = { count: number; setCount: (n: number) => void; isDark: boolean };

export default function CountSlider({ count, setCount, isDark }: Props) {
  return (
    <div className="min-w-[220px]">
      <label className={`mb-1 block text-xs uppercase tracking-widest opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>How Many</label>
      <div className="mt-2">
        <input className="w-full h-2.5 md:h-3 accent-[var(--accent)]" type="range" min={4} max={16} value={count} onChange={(e)=>setCount(Number(e.target.value))}/>
        <div className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{count} titles</div>
      </div>
    </div>
  );
}

