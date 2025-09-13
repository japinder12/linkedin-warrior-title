"use client";
import React, { useEffect, useMemo, useState } from "react";
import TitleCard from "./TitleCard";
import { makeRng, pick } from "@/lib/rng";
import { DOMAIN_BANKS, type DomainKey } from "@/lib/banks";
import { getDomain } from "@/lib/domain";

export default function TitleGenerator() {
  // URL + state
  const params = useMemo(
    () => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""),
    []
  );
  const [role, setRole]   = useState(params.get("role") || "Software Engineer");
  const [seed, setSeed]   = useState<number>(Number(params.get("seed")) || Math.floor(Math.random()*1e9));
  const [count, setCount] = useState<number>(Math.min(16, Number(params.get("n")) || 12)); // cap 16
  const [darkMode, setDarkMode] = useState(true);

  // keep URL shareable
  useEffect(() => {
    const p = new URLSearchParams();
    if (role) p.set("role", role);
    p.set("seed", String(seed));
    p.set("n", String(count));
    window.history.replaceState({}, "", `${window.location.pathname}?${p.toString()}`);
  }, [role, seed, count]);

  // domain selection
  const domain: DomainKey = getDomain(role);
  // deterministic RNG stream
  const next = useMemo(() => makeRng(seed ^ (role.length << 1) ^ domain.length), [seed, role, domain]);

  // generators
  function genTitleX(r: string) {
    const bank = DOMAIN_BANKS[domain];
    const pre = pick(next, bank.prefixes);
    const core = pick(next, bank.coresX).replaceAll("X", r);
    const booster = pick(next, bank.boosters);
    return `${pre} ${core} · ${booster}`;
  }
  function genTitleY(r: string) {
    const bank = DOMAIN_BANKS[domain];
    const pre = pick(next, bank.prefixes);
    const noun = pick(next, bank.nouns);
    const core = pick(next, bank.coresY).replaceAll("Y", `${r} ${noun}`);
    const booster = pick(next, bank.boosters);
    return `${pre} ${core} · ${booster}`;
  }
  function genTitleLoose(r: string) {
    const bank = DOMAIN_BANKS[domain];
    const pre = pick(next, [bank.prefixes[0] || "Global", "Chief", "Lead", "Principal", bank.prefixes[1] || "Senior"]);
    const mid = pick(next, [
      `${r} & ${pick(next, bank.boosters)}`,
      `${pick(next, bank.boosters)}-First ${r}`,
      `${r} (${pick(next, bank.boosters)})`,
    ]);
    const post = pick(next, bank.postfixes || []);
    return `${pre} ${mid}${post ?? ""}`;
  }
  const GENERATORS = [genTitleX, genTitleY, genTitleLoose];

  const items = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < Math.max(1, Math.min(16, count)); i++) {
      const g = pick(next, GENERATORS);
      out.push(g(role));
    }
    return out;
  }, [role, count, next, domain]);

  // theming
  const isDark = darkMode;
  const root   = isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900";
  const panel  = isDark ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200";
  const input  = isDark ? "bg-slate-900 border-slate-800 focus:ring-slate-600" : "bg-white border-slate-300 focus:ring-slate-300";
  const btnBd  = isDark ? "border-slate-700" : "border-slate-300";
  const subtle = isDark ? "text-slate-400" : "text-slate-600";
  const hook = "From Intern to ‘Global Visionary Engineer’ in 1 click.";

  return (
    <main className={`min-h-screen ${root} flex flex-col items-center p-6`}>
      <div className="w-full max-w-3xl">
        <header className="mb-6 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">LinkedIn Title Generator</h1>
            <button
              className={`px-3 py-2 rounded-xl text-sm border ${btnBd}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
          <p className={`text-sm ${subtle}`}>{hook}</p>
        </header>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className={`${panel} border rounded-2xl p-3 md:col-span-2`}>
            <label className={`text-xs uppercase tracking-widest ${subtle}`}>Your role</label>
            <input
              className={`mt-1 w-full rounded-xl p-3 outline-none focus:ring-2 ${input}`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer, Project Manager, Nurse"
            />
            <div className={`mt-2 flex gap-2 text-xs ${subtle}`}>
              {["Software Engineer","Data Scientist","Product Manager","ML Engineer","Entrepreneur"].map(v=>(
                <button key={v} className={`px-2 py-1 rounded-lg border ${btnBd}`} onClick={()=>setRole(v)}>
                  {v.split(" ").map(w=>w[0]).join("")}
                </button>
              ))}
            </div>
          </div>

          <div className={`${panel} border rounded-2xl p-3 flex flex-col gap-2`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs uppercase tracking-widest ${subtle}`}>Seed</span>
              <div className="flex gap-2">
                <button className={`px-2 py-1 rounded-lg text-xs border ${btnBd}`} onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>Shuffle</button>
                <button className={`px-2 py-1 rounded-lg text-xs border ${btnBd}`} onClick={()=>setSeed(Number(String(Date.now()).slice(-9)))}>Time</button>
              </div>
            </div>
            <input
              className={`w-full rounded-xl p-2 outline-none focus:ring-2 ${input}`}
              value={seed}
              onChange={(e)=> setSeed(Number(e.target.value) || 0)}
            />
            <label className={`text-xs uppercase tracking-widest ${subtle}`}>How many</label>
            <input type="range" min={4} max={16} value={count} onChange={(e)=>setCount(Number(e.target.value))}/>
            <div className={`text-xs ${subtle}`}>{count} titles</div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-3">
          {items.map((t,i)=> <TitleCard key={i} text={t} index={i} dark={isDark} />)}
        </div>
      </div>
    </main>
  );
}
