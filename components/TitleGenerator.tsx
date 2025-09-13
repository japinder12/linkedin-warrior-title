"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TitleCard from "./TitleCard";
import { makeRng, pick } from "@/lib/rng";
import { DOMAIN_BANKS, type DomainKey } from "@/lib/banks";
import { getDomain } from "@/lib/domain";

type Props = { initialRole: string; initialSeed: number; initialCount: number };

export default function TitleGenerator({ initialRole, initialSeed, initialCount }: Props) {
  // URL + state
  const [role, setRole]   = useState(initialRole);
  const [seed, setSeed]   = useState<number>(initialSeed);
  const [count, setCount] = useState<number>(Math.min(16, initialCount)); // cap 16
  const [darkMode, setDarkMode] = useState(true);
  const [aiNative, setAiNative] = useState(true);

  // theme init + persist
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark" || saved === "light") {
      setDarkMode(saved === "dark");
      if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", saved === "dark");
      return;
    }
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(!!prefersDark);
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", !!prefersDark);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
  const genTitleX = useCallback((r: string) => {
    const bank = DOMAIN_BANKS[domain];
    const prefixes = aiNative ? [...bank.prefixes, "AI-Native", "AI-Native"] : bank.prefixes;
    const boosters = aiNative ? [...bank.boosters, "LLM", "GenAI", "AI", "LLM"] : bank.boosters;
    const pre = pick(next, prefixes);
    const core = pick(next, bank.coresX).replaceAll("X", r);
    const booster = pick(next, boosters);
    return `${pre} ${core} · ${booster}`;
  }, [domain, aiNative, next]);
  const genTitleY = useCallback((r: string) => {
    const bank = DOMAIN_BANKS[domain];
    const prefixes = aiNative ? [...bank.prefixes, "AI-Native", "Generative"] : bank.prefixes;
    const nouns = aiNative ? [...bank.nouns, "AI", "ML"] : bank.nouns;
    const boosters = aiNative ? [...bank.boosters, "LLM", "GenAI", "AI"] : bank.boosters;
    const pre = pick(next, prefixes);
    const noun = pick(next, nouns);
    const core = pick(next, bank.coresY).replaceAll("Y", `${r} ${noun}`);
    const booster = pick(next, boosters);
    return `${pre} ${core} · ${booster}`;
  }, [domain, aiNative, next]);
  const genTitleLoose = useCallback((r: string) => {
    const bank = DOMAIN_BANKS[domain];
    const prefixes = aiNative ? [...bank.prefixes, "AI-Native", "AI"] : bank.prefixes;
    const boosters = aiNative ? [...bank.boosters, "LLM", "GenAI", "AI"] : bank.boosters;
    const pre = pick(next, [prefixes[0] || "Global", "Chief", "Lead", "Principal", prefixes[1] || "Senior"]);
    const mid = pick(next, [
      `${r} & ${pick(next, boosters)}`,
      `${pick(next, boosters)}-First ${r}`,
      `${r} (${pick(next, boosters)})`,
    ]);
    const post = pick(next, bank.postfixes || []);
    return `${pre} ${mid}${post ?? ""}`;
  }, [domain, aiNative, next]);

  const items = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < Math.max(1, Math.min(16, count)); i++) {
      const g = pick(next, [genTitleX, genTitleY, genTitleLoose] as const);
      out.push(g(role));
    }
    return out;
  }, [role, count, next, genTitleX, genTitleY, genTitleLoose]);

  // theming
  const isDark = darkMode;
  const root   = isDark ? "bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100" : "bg-gradient-to-b from-white to-slate-50 text-slate-900";
  const panel  = isDark ? "bg-slate-900/60 border-slate-800 backdrop-blur" : "bg-white/70 border-slate-200 backdrop-blur";
  const input  = isDark ? "bg-slate-950 border-slate-800 focus:ring-slate-600 placeholder:text-slate-500/80" : "bg-white border-slate-300 focus:ring-slate-300 placeholder:text-slate-400";
  const btnBd  = isDark ? "border-slate-700" : "border-slate-300";
  const subtle = isDark ? "text-slate-400" : "text-slate-600";
  const hook = "Upgrade your LinkedIn vibe in 1 click (no recruiter required).";

  return (
    <main className={`min-h-screen ${root} flex flex-col items-center p-6`}>
      <div className="w-full max-w-3xl">
        <header className="mb-6 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-lime-400 dark:from-cyan-300 dark:to-lime-300">LinkedIn Title Generator</h1>
            <button
              className={`px-3 py-2 rounded-xl text-sm border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {isDark ? "🌤️ Light" : "🌙 Dark"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${subtle}`}>{hook}</p>
            <span className={`text-[10px] px-2 py-1 rounded-full border ${btnBd} ${isDark ? "bg-black/20" : "bg-white/50"}`}>100% Serious</span>
          </div>
        </header>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className={`${panel} border rounded-2xl p-3 md:col-span-2`}>
            <label className={`text-xs uppercase tracking-widest ${subtle}`}>Your role</label>
            <input
              className={`mt-1 w-full rounded-xl p-3 outline-none focus:ring-2 ring-1 ${input}`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Software Engineer, Project Manager, Nurse"
            />
            <div className={`mt-2 flex gap-2 text-xs ${subtle}`}>
              {["Software Engineer","Data Scientist","Product Manager","ML Engineer","Entrepreneur"].map(v=>(
                <button key={v} className={`px-2 py-1 rounded-lg border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`} onClick={()=>setRole(v)}>
                  {v.split(" ").map(w=>w[0]).join("")}
                </button>
              ))}
            </div>
          </div>

          <div className={`${panel} border rounded-2xl p-3 flex flex-col gap-2`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs uppercase tracking-widest ${subtle}`}>Seed</span>
              <div className="flex gap-2">
                <button className={`px-2 py-1 rounded-lg text-xs border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`} onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>Shuffle</button>
                <button className={`px-2 py-1 rounded-lg text-xs border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`} onClick={()=>setSeed(Number(String(Date.now()).slice(-9)))}>Time</button>
              </div>
            </div>
            <input
              type="number"
              className={`w-full rounded-xl p-2 outline-none focus:ring-2 ring-1 ${input}`}
              value={seed}
              onChange={(e)=> setSeed(Number(e.target.value) || 0)}
            />
            <label className={`text-xs uppercase tracking-widest ${subtle}`}>How many</label>
            <input type="range" min={4} max={16} value={count} onChange={(e)=>setCount(Number(e.target.value))}/>
            <div className={`text-xs ${subtle}`}>{count} titles</div>
            <div className="flex items-center justify-between gap-2">
              <label className={`flex items-center gap-2 text-xs ${subtle}`}>
                <input type="checkbox" checked={aiNative} onChange={(e)=> setAiNative(e.target.checked)} />
                AI‑Native bias
              </label>
              <div className="flex gap-2">
              <button className={`px-2 py-1 rounded-lg text-xs border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`} onClick={()=>setSeed((s)=> s + 1)}>Regenerate</button>
              <button
                className={`px-2 py-1 rounded-lg text-xs border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`}
                onClick={() => { try { navigator.clipboard.writeText(window.location.href); } catch {} }}
              >
                Copy link
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={`${panel} border rounded-3xl p-4 md:p-5 shadow-inner`}>
          <div className="grid md:grid-cols-2 gap-3">
            {items.map((t,i)=> <TitleCard key={i} text={t} index={i} dark={isDark} />)}
          </div>
        </div>
        <footer className={`mt-6 text-xs ${subtle} flex items-center justify-between`}>
          <span>Powered by chaotic neutral energy.</span>
          <a className="underline hover:opacity-80" href="https://github.com/" target="_blank" rel="noreferrer">Source</a>
        </footer>
      </div>
    </main>
  );
}
