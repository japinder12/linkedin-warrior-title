"use client";
import React from "react";
import Hero from "./Hero";
import RoleInput from "./Controls/RoleInput";
import PresetsRow from "./Controls/PresetsRow";
import SeedControls from "./Controls/SeedControls";
import CountSlider from "./Controls/CountSlider";
import MemeModeToggle from "./Controls/MemeModeToggle";
import ResultsHeader from "./Results/ResultsHeader";
import TitleGrid from "./Results/TitleGrid";
import Footer from "./Footer";

import { useTheme } from "@/hooks/useTheme";
import { useShareUrl } from "@/hooks/useShareUrl";
import { useTitles } from "@/hooks/useTitles";

type Props = { initialRole: string; initialSeed: number; initialCount: number };

export default function TitleGenerator({ initialRole, initialSeed, initialCount }: Props) {
  const [role, setRole]   = React.useState(initialRole);
  const [seed, setSeed]   = React.useState<number>(initialSeed);
  const [count, setCount] = React.useState<number>(Math.min(16, initialCount));
  const [memeMode, setMemeMode] = React.useState(false);

  const { darkMode, setDarkMode, isDark } = useTheme();
  useShareUrl(role, seed, count);

  const { items } = useTitles(role, seed, count, memeMode);

  const root   = isDark ? "bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100" : "bg-gradient-to-b from-white to-slate-50 text-slate-900";
  const panel  = isDark ? "bg-slate-900/60 border-slate-800 backdrop-blur" : "bg-white/70 border-slate-200 backdrop-blur";
  const input  = isDark
    ? "bg-slate-950 border-slate-800 focus:ring-2 focus:ring-[var(--accent-40)] focus:border-[var(--accent)] placeholder:text-slate-500/80"
    : "bg-white border-slate-300 focus:ring-2 focus:ring-[var(--accent-40)] focus:border-[var(--accent)] placeholder:text-slate-400";
  const btnBd  = isDark ? "border-slate-700" : "border-slate-300";

  return (
    <main className={`min-h-screen ${root} flex flex-col items-center p-6`}>
      <div className="w-full max-w-3xl">
        <Hero isDark={isDark} onToggleTheme={()=>setDarkMode(!darkMode)} />

        {/* Controls: two rows on md+ for balance; single horizontal scroll on small screens */}
        <div className={`${panel} border rounded-2xl p-4 mb-6`}>
          <div className="hidden md:grid md:grid-cols-3 gap-6 items-start content-start">
            <RoleInput role={role} setRole={setRole} isDark={isDark} inputClass={input} />
            <PresetsRow role={role} setRole={setRole} isDark={isDark} btnBd={btnBd} />
            <SeedControls setSeed={setSeed} isDark={isDark} btnBd={btnBd} />
          </div>
          <div className="hidden md:grid md:grid-cols-2 gap-6 mt-3 items-start content-start">
            <CountSlider count={count} setCount={setCount} isDark={isDark} />
            <MemeModeToggle memeMode={memeMode} setMemeMode={setMemeMode} isDark={isDark} btnBd={btnBd} />
          </div>
          {/* Mobile: single horizontal row; all 5 controls scrollable */}
          <div className="md:hidden flex gap-4 overflow-x-auto py-1">
            <RoleInput role={role} setRole={setRole} isDark={isDark} inputClass={input} />
            <PresetsRow role={role} setRole={setRole} isDark={isDark} btnBd={btnBd} />
            <SeedControls setSeed={setSeed} isDark={isDark} btnBd={btnBd} />
            <CountSlider count={count} setCount={setCount} isDark={isDark} />
            <MemeModeToggle memeMode={memeMode} setMemeMode={setMemeMode} isDark={isDark} btnBd={btnBd} />
          </div>
        </div>

        {/* Results */}
        <div className={`${panel} border rounded-3xl p-4 md:p-5 shadow-inner`}>
          <ResultsHeader isDark={isDark} items={items} />
          <TitleGrid isDark={isDark} items={items} />
        </div>

        <Footer isDark={isDark} btnBd={btnBd} />
      </div>
    </main>
  );
}
