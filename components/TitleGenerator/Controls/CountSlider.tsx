"use client";
import React from "react";

type Props = { count: number; setCount: (n: number) => void; isDark: boolean };

export default function CountSlider({ count, setCount, isDark }: Props) {
  return (
    <div className="min-w-[240px]">
      <label className={`mb-1 block text-[11px] font-medium uppercase tracking-wide opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>How Many</label>
      <div className="mt-3 mb-1">
        {(() => {
          const pct = ((count - 4) / (16 - 4)) * 100;
          const track = isDark ? "color-mix(in srgb, #fff 8%, transparent)" : "color-mix(in srgb, #000 10%, transparent)";
          const bg = `linear-gradient(to right, var(--accent) ${pct}%, ${track} ${pct}%)`;
          return (
            <input
              className="slider w-full h-3 md:h-3 accent-[var(--accent)]"
              type="range"
              min={4}
              max={16}
              value={count}
              onChange={(e)=>setCount(Number(e.target.value))}
              style={{ background: bg }}
              aria-label="How many titles"
            />
          );
        })()}
        <div className={`mt-1.5 text-xs text-center ${isDark ? "text-slate-300" : "text-slate-700"}`}>{count} titles</div>
      </div>
    </div>
  );
}
