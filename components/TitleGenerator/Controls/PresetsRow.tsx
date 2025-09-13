"use client";
import React from "react";

type Props = { role: string; setRole: (v: string) => void; isDark: boolean; btnBd: string };

export default function PresetsRow({ role, setRole, isDark, btnBd }: Props) {
  const presets = ["Software Engineer","Data Scientist","Product Manager","ML Engineer","Entrepreneur"] as const;
  return (
    <div className="min-w-[260px]">
      <label className={`mb-2 block text-[11px] font-medium uppercase tracking-wide opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Presets</label>
      <div className="flex flex-wrap items-center gap-2">
        {presets.map((v)=>{
          const active = v === role;
          const baseBtn = `h-9 px-3 rounded-full border ${btnBd} text-sm hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)]`;
          const activeBtn = active ? `bg-[var(--accent-10)] border-[var(--accent)] text-[var(--accent)]` : ``;
          return (
            <button type="button" aria-pressed={active} key={v} className={`${baseBtn} ${activeBtn}`} onClick={()=>setRole(v)}>
              {v.split(" ").map(w=>w[0]).join("")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
