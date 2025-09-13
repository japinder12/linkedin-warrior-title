"use client";
import React from "react";

type Props = {
  role: string;
  setRole: (v: string) => void;
  isDark: boolean;
  inputClass: string;
};

export default function RoleInput({ role, setRole, isDark, inputClass }: Props) {
  return (
    <div className="min-w-[260px]">
      <label className={`mb-1 block text-[11px] font-medium uppercase tracking-wide opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Your Role</label>
      <div className="mt-2 min-w-0">
        <input
          className={`h-9 w-full max-w-[320px] rounded-full px-3 text-sm outline-none ring-1 ${inputClass}`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Software Engineer, Product Manager"
        />
      </div>
    </div>
  );
}
