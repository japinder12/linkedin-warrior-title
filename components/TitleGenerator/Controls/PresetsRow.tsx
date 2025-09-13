"use client";
import React from "react";

type Props = { role: string; setRole: (v: string) => void; isDark: boolean; btnBd: string };

export default function PresetsRow({ role, setRole, isDark, btnBd }: Props) {
  const presets = ["Software Engineer","Data Scientist","Product Manager","ML Engineer","Entrepreneur"] as const;
  return (
    <div className="min-w-[260px]">
      <label className={`mb-1 block text-xs uppercase tracking-widest opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Presets</label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {presets.map((v)=>{
          const active = v === role;
          const baseBtn = `h-8 px-3 rounded-full border ${btnBd} text-xs hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)]`;
          const activeBtn = active ? `bg-[var(--accent-10)] border-[var(--accent)] text-[var(--accent)]` : ``;
          return (
            <button key={v} className={`${baseBtn} ${activeBtn}`} onClick={()=>setRole(v)}>
              {v.split(" ").map(w=>w[0]).join("")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

