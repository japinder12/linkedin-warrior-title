"use client";
import { useMemo } from "react";
import { makeRng, pick } from "@/lib/rng";
import { getDomain } from "@/lib/domain";
import type { DomainKey } from "@/lib/banks";
import { makeTitleGenerators, memeifyFactory } from "@/lib/generators";

export function useTitles(role: string, seed: number, count: number, memeMode: boolean) {
  const domain: DomainKey = getDomain(role);
  const seedMix = seed ^ (role.length << 1) ^ domain.length;
  const next = useMemo(() => makeRng(seedMix), [seedMix]);

  const items = useMemo(() => {
    const N = Math.max(1, Math.min(16, count));
    const out = new Set<string>();
    const gens = makeTitleGenerators(domain, next);
    const memeify = memeMode ? memeifyFactory(seedMix) : null;
    let tries = 0;
    const MAX = N * 50;
    while (out.size < N && tries < MAX) {
      const g = pick(next, gens);
      let t = g(role).trim();
      if (memeify) t = memeify(t);
      if (memeify ? true : t.length <= 100) out.add(t);
      tries++;
    }
    if (out.size < N) {
      const base = Array.from(out);
      let i = 0;
      while (out.size < N && i < base.length) {
        const mark = ` · ${out.size + 1}`;
        const candidate = base[i].length + mark.length <= 100 ? base[i] + mark : base[i];
        out.add(candidate);
        i++;
      }
    }
    return Array.from(out).slice(0, N);
  }, [role, count, next, domain, memeMode, seedMix]);

  return { items, domain } as const;
}

