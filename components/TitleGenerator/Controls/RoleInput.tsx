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
    <div className="min-w-[300px]">
      <label htmlFor="role-input" className={`mb-2 block text-[11px] font-medium uppercase tracking-wide opacity-70 ${isDark ? "text-slate-300" : "text-slate-600"}`}>Your Role</label>
      <div className="min-w-0">
        <input
          id="role-input"
          className={`h-10 w-full max-w-[640px] rounded-xl px-3 text-[15px] outline-none ring-1 ${inputClass}`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Software Engineer, Product Manager"
        />
      </div>
    </div>
  );
}
