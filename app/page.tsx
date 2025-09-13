"use client";
import React, { useEffect, useMemo, useState } from "react";

export default function Page() {
  const params = useMemo(
    () => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""),
    []
  );
  const [role, setRole]   = useState(params.get("role") || "Software Engineer");
  const [seed, setSeed]   = useState<number>(Number(params.get("seed")) || Math.floor(Math.random()*1e9));
  const [count, setCount] = useState<number>(Number(params.get("n")) || 12);

  useEffect(() => {
    const p = new URLSearchParams();
    if (role) p.set("role", role);
    p.set("seed", String(seed));
    p.set("n", String(count));
    const url = `${window.location.pathname}?${p.toString()}`;
    window.history.replaceState({}, "", url);
  }, [role, seed, count]);

  const prefixes = ["Global","Worldwide","Cross-Functional","AI-Native","Platform","Principal","Lead","Chief","Forward-Deployed","Staff","Fractional"];
  const coresX   = ["X Strategist","X Architect","X Orchestrator","X Whisperer","X Evangelist","X Sherpa","X Wrangler","X Generalist","X Solutions Engineer","X Program Owner","X Enablement Lead"];
  const coresY   = ["Visionary of Y","Head of Y Narrative","Director of Y Futures","Custodian of Y Excellence","Ambassador for Y","Steward of Y","Keeper of Y Roadmaps"];
  const boosters = ["0→1","10x","Go-To-Market","Edge","Scale","LLM","GenAI","Growth","Reliability","Security","Platform","Infra","Data"];
  const postfixes= ["· Driving Impact at Scale"," | Storyteller"," — Builder @ Heart"," · Operator/Owner"," · Human API"," — Systems > Goals"," · Shipping Weekly"," · Problem Framer"];

  function mulberry32(a: number){return function(){let t=(a+=0x6d2b79f5);t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
  const rng = useMemo(()=>mulberry32(seed),[seed]);
  const pick = <T,>(arr:T[]) => arr[Math.floor(rng()*arr.length)];

  function titleX(r:string){const pre=pick(prefixes);const core=pick(coresX).replaceAll("X",r);const booster=pick(boosters);return `${pre} ${core} · ${booster}`;}
  function titleY(r:string){const pre=pick(prefixes);const noun=["Strategy","Systems","Outcomes","Programs","Roadmaps","Excellence"][Math.floor(rng()*6)];const core=pick(coresY).replaceAll("Y",`${r} ${noun}`);const booster=pick(boosters);return `${pre} ${core} · ${booster}`;}
  function titleLoose(r:string){const pre=pick(["Global","Chief","Lead","Principal","AI-Native"]);const mid=pick([`${r} & ${pick(boosters)}`,`${pick(boosters)}-First ${r}`,`${r} (${pick(boosters)})`]);const post=pick(postfixes);return `${pre} ${mid}${post}`;}

  const gens = [titleX, titleY, titleLoose];

  const items = useMemo(()=>{
    const out:string[] = [];
    const local = mulberry32(seed ^ role.length);
    const pickLocal = <T,>(arr:T[]) => arr[Math.floor(local()*arr.length)];
    for(let i=0;i<Math.max(4,Math.min(32,count));i++){ out.push(pickLocal(gens)(role)); }
    return out;
  },[role, seed, count]);

  async function copy(text:string){ try{ await navigator.clipboard.writeText(text);}catch{ alert("Clipboard blocked. Select & copy manually."); } }
  const hook = "From Intern to ‘Global Visionary Engineer’ in 1 click.";
  const postAngle = "Finally got the LinkedIn title I deserve.";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6 space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">LinkedIn Title Generator</h1>
          <p className="text-sm text-slate-300">{hook}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-3">
            <label className="text-xs uppercase tracking-widest text-slate-400">Your role</label>
            <input className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 p-3 outline-none focus:ring-2 focus:ring-slate-600"
                   value={role} onChange={(e)=>setRole(e.target.value)} placeholder="e.g., Software Engineer, Data Scientist"/>
            <div className="mt-2 flex gap-2 text-xs text-slate-400">
              {["Software Engineer","Data Scientist","Product Manager","ML Engineer"].map(v=>(
                <button key={v} className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700" onClick={()=>setRole(v)}>{v.split(" ").map(w=>w[0]).join("")}</button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-widest text-slate-400">Seed</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs" onClick={()=>setSeed(Math.floor(Math.random()*1e9))}>Shuffle</button>
                <button className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs" onClick={()=>setSeed(Number(String(Date.now()).slice(-9)))}>Time</button>
              </div>
            </div>
            <input className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2 outline-none focus:ring-2 focus:ring-slate-600"
                   value={seed} onChange={(e)=>setSeed(Number(e.target.value)||0)} />
            <label className="text-xs uppercase tracking-widest text-slate-400">How many</label>
            <input type="range" min={4} max={32} value={count} onChange={(e)=>setCount(Number(e.target.value))}/>
            <div className="text-xs text-slate-400">{count} titles</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {items.map((t,i)=>(
            <button key={i} onClick={()=>copy(t)} className="text-left bg-slate-900/70 border border-slate-800 rounded-2xl p-4 hover:bg-slate-900 active:scale-[.99] transition" title="Click to copy">
              <div className="text-sm text-slate-400">Title #{i+1}</div>
              <div className="font-medium mt-1">{t}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="text-sm text-slate-400 mb-1">Post Angle</div>
          <div className="flex items-center justify-between gap-2">
            <div className="text-base">{postAngle}</div>
            <button onClick={()=>copy(postAngle)} className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm">Copy</button>
          </div>
        </div>
      </div>
    </main>
  );
}