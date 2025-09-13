import { DOMAIN_BANKS } from "./banks";
import type { DomainKey } from "./banks";

import { pick, makeRng } from "./rng";

export function makeTitleGenerators(domain: DomainKey, next: () => number, opts?: { role?: string }) {
  const DIVIDERS = [" · ", " — ", " | "] as const;
  const bank = DOMAIN_BANKS[domain];
  const role = (opts?.role || "").toLowerCase();
  const allowAI = /(\bai\b|\bml\b|machine learning|\bllm\b|genai|gpt)/.test(role);

  const genTitleX = (r: string) => {
    const prefixes = [...bank.prefixes];
    const boosters = allowAI ? [...bank.boosters, "AI"] : [...bank.boosters];
    const pre = pick(next, prefixes);
    const core = pick(next, bank.coresX).replaceAll("X", r);
    const booster = pick(next, boosters);
    const divider = pick(next, DIVIDERS);
    return `${pre} ${core}${divider}${booster}`;
  };

  const genTitleY = (r: string) => {
    const prefixes = [...bank.prefixes];
    const nouns = allowAI ? [...bank.nouns, "AI", "ML"] : [...bank.nouns];
    const boosters = allowAI ? [...bank.boosters, "AI"] : [...bank.boosters];
    const pre = pick(next, prefixes);
    const noun = pick(next, nouns);
    const core = pick(next, bank.coresY).replaceAll("Y", `${r} ${noun}`);
    const booster = pick(next, boosters);
    const divider = pick(next, [" · ", " — ", " | "] as const);
    return `${pre} ${core}${divider}${booster}`;
  };

  const genTitleLoose = (r: string) => {
    const prefixes = [...bank.prefixes];
    const boosters = allowAI ? [...bank.boosters, "AI"] : [...bank.boosters];
    const pre = pick(next, [prefixes[0] || "Global", "Chief", "Lead", "Principal", prefixes[1] || "Senior"]);
    const mid = pick(next, [
      `${r} & ${pick(next, boosters)}`,
      `${pick(next, boosters)}-First ${r}`,
      `${r} (${pick(next, boosters)})`,
    ]);
    const booster = pick(next, boosters);
    const divider = pick(next, [" · ", " — ", " | "] as const);
    return `${pre} ${mid}${divider}${booster}`;
  };

  return [genTitleX, genTitleY, genTitleLoose] as const;
}

export function memeifyFactory(seedMix: number) {
  const next = makeRng(seedMix ^ 0x5f3759df);
  const EMOJIS = ["🚀","🔥","✨","🏆","📈","🧠","🤝","🦄","⚡","🛠️","🧩","🌐","🛡️","🥇","💼","🎯"] as const;
  const BRAGS = [
    "driving impact at scale",
    "thought leadership on tap",
    "operating at 10x velocity",
    "0→1 energy, 1→N discipline",
    "stakeholder-aligned, KPI-obsessed",
    "shipping weekly, learning daily",
    "enterprise-ready vibes",
    "OKRs in my DNA",
    "storytelling + systems",
  ] as const;
  const ENDORSE = [
    "99+ CEO endorsements",
    "Top 1% LinkedOut rank",
    "VP-approved",
    "Forbes 30 under 300",
    "VCs agree: 10x",
    "Board-ready presence",
    "500+ intros on speed dial",
  ] as const;
  return (base: string) => {
    const e1 = EMOJIS[Math.floor(next() * EMOJIS.length)];
    const e2 = EMOJIS[Math.floor(next() * EMOJIS.length)];
    const brag = BRAGS[Math.floor(next() * BRAGS.length)];
    const cred = ENDORSE[Math.floor(next() * ENDORSE.length)];
    const sep = [" · ", " — ", " | "][Math.floor(next() * 3)];
    const suffix = `${sep}${brag} ${e1}${e2}`;
    const badge = ` | ${cred}`;
    return `${base}${suffix}${badge}`;
  };
}
