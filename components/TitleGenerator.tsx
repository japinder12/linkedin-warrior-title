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
  const [count, setCount] = useState<number>(Math.min(16, initialCount));
  const [darkMode, setDarkMode] = useState(true);

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
    const prefixes = [...bank.prefixes, "AI-Native", "AI-Native"];
    const boosters = [...bank.boosters, "LLM", "GenAI", "AI", "LLM"];
    const pre = pick(next, prefixes);
    const core = pick(next, bank.coresX).replaceAll("X", r);
    const booster = pick(next, boosters);
    return `${pre} ${core} · ${booster}`;
  }, [domain, next]);
  const genTitleY = useCallback((r: string) => {
    const bank = DOMAIN_BANKS[domain];
    const prefixes = [...bank.prefixes, "AI-Native", "Generative"];
    const nouns = [...bank.nouns, "AI", "ML"];
    const boosters = [...bank.boosters, "LLM", "GenAI", "AI"];
    const pre = pick(next, prefixes);
    const noun = pick(next, nouns);
    const core = pick(next, bank.coresY).replaceAll("Y", `${r} ${noun}`);
    const booster = pick(next, boosters);
    return `${pre} ${core} · ${booster}`;
  }, [domain, next]);
  const genTitleLoose = useCallback((r: string) => {
    const bank = DOMAIN_BANKS[domain];
    const prefixes = [...bank.prefixes, "AI-Native", "AI"];
    const boosters = [...bank.boosters, "LLM", "GenAI", "AI"];
    const pre = pick(next, [prefixes[0] || "Global", "Chief", "Lead", "Principal", prefixes[1] || "Senior"]);
    const mid = pick(next, [
      `${r} & ${pick(next, boosters)}`,
      `${pick(next, boosters)}-First ${r}`,
      `${r} (${pick(next, boosters)})`,
    ]);
    const post = pick(next, bank.postfixes || []);
    return `${pre} ${mid}${post ?? ""}`;
  }, [domain, next]);

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
  const hook = "Generate absurdly serious LinkedIn titles in one click.";

  return (
    <main className={`min-h-screen ${root} flex flex-col items-center p-6`}>
      <div className="w-full max-w-3xl">
        <header className="mb-6 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-[#0A66C2] dark:text-[#5DB0FF]"
            >
              LinkedIn Title Generator
            </h1>
            <button
              className={`px-3 py-2 rounded-xl text-sm border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {isDark ? "🌤️ Light" : "🌙 Dark"}
            </button>
          </div>
          <p className={`text-sm ${subtle}`}>{hook}</p>
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
            <div className="flex justify-end gap-2">
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

        {/* Results */}
        <div className={`${panel} border rounded-3xl p-4 md:p-5 shadow-inner`}>
          <div className="grid md:grid-cols-2 gap-3">
            {items.map((t,i)=> <TitleCard key={i} text={t} index={i} dark={isDark} />)}
          </div>
        </div>
        <footer className={`mt-6 text-xs ${subtle} flex items-center justify-between`}>
          <span>Powered by chaotic neutral energy.</span>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/japinder12/linkedin-warrior-title"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={isDark ? "text-slate-200" : "text-slate-700"}>
                <path d="M12 2a10 10 0 0 0-3.162 19.495c.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.776.603-3.362-1.338-3.362-1.338-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.218-.252-4.553-1.109-4.553-4.938 0-1.09.39-1.981 1.029-2.678-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.506.337 1.909-1.293 2.748-1.024 2.748-1.024.546 1.376.203 2.393.1 2.646.64.697 1.028 1.588 1.028 2.678 0 3.839-2.338 4.683-4.566 4.931.36.311.68.922.68 1.859 0 1.341-.012 2.422-.012 2.752 0 .267.18.579.688.48A10.001 10.001 0 0 0 12 2Z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/japinder-narula"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={isDark ? "text-slate-200" : "text-slate-700"} aria-hidden="true">
                <path d="M22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.74V1.74C24 .78 23.21 0 22.23 0ZM7.06 20.45H3.89V9h3.17v11.45ZM5.48 7.43a1.84 1.84 0 1 1 0-3.68 1.84 1.84 0 0 1 0 3.68ZM20.45 20.45h-3.17v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27v6.3H9.67V9h3.04v1.57h.04c.42-.79 1.44-1.62 2.96-1.62 3.17 0 3.75 2.09 3.75 4.8v6.7Z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
