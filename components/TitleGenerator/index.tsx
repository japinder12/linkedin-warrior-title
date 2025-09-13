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

        {/* Control Panel */}
        <div className={`${panel} border rounded-2xl p-5 md:p-6 mb-6 border-slate-300/50 dark:border-slate-700/35`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7 items-start">
            {/* Row 1 */}
            <div className="md:col-span-6">
              <RoleInput role={role} setRole={setRole} isDark={isDark} inputClass={input} />
            </div>
            <div className="md:col-span-6">
              <PresetsRow role={role} setRole={setRole} isDark={isDark} btnBd={btnBd} />
            </div>
            {/* Row 2 */}
            <div className="md:col-span-7">
              <CountSlider count={count} setCount={setCount} isDark={isDark} />
            </div>
            <div className="md:col-span-2">
              <SeedControls isDark={isDark} onShuffle={() => setSeed(Math.floor(Math.random() * 1e9))} />
            </div>
            <div className="md:col-span-3">
              <MemeModeToggle memeMode={memeMode} setMemeMode={setMemeMode} isDark={isDark} btnBd={btnBd} />
            </div>
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
