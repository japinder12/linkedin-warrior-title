import TitleGenerator from "@/components/TitleGenerator";

type SearchParams = { [key: string]: string | string[] | undefined };

function strHash(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = (await searchParams) as SearchParams;
  const roleParam = typeof sp.role === "string" ? sp.role : undefined;
  const seedParam = typeof sp.seed === "string" ? Number(sp.seed) : undefined;
  const nParam = typeof sp.n === "string" ? Number(sp.n) : undefined;

  const initialRole = roleParam && roleParam.trim() ? roleParam : "Software Engineer";
  // Use a deterministic default seed to avoid SSR/CSR mismatches
  const initialSeed = Number.isFinite(seedParam)
    ? (seedParam as number)
    : strHash(initialRole) ^ 0x9e3779b1;
  const initialCount = Math.max(1, Math.min(16, Number.isFinite(nParam) ? (nParam as number) : 12));

  return <TitleGenerator initialRole={initialRole} initialSeed={initialSeed} initialCount={initialCount} />;
}
