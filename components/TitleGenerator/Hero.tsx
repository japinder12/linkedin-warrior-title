"use client";
import React from "react";

type Props = { isDark: boolean; onToggleTheme: () => void };

export default function Hero({ isDark, onToggleTheme }: Props) {
  return (
    <header className="relative mb-7">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 right-[-80px] h-64 w-64 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 25%, transparent), transparent 70%)",
            filter: "blur(12px)",
            opacity: isDark ? 0.35 : 0.25,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(transparent 23px, color-mix(in srgb, var(--accent) 10%, transparent) 24px), linear-gradient(90deg, transparent 23px, color-mix(in srgb, var(--accent) 10%, transparent) 24px)",
            backgroundSize: "24px 24px, 24px 24px",
            maskImage: "radial-gradient(70% 60% at 60% 0%, #000 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(70% 60% at 60% 0%, #000 40%, transparent 100%)",
            opacity: isDark ? 0.08 : 0.06,
          }}
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <h1
              style={{
              fontFamily: "var(--font-sans)",
              backgroundImage:
                "linear-gradient(92deg, var(--title-accent-start) 0%, var(--title-accent-mid) 48%, var(--title-accent-end) 100%)",
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-snug tracking-tight bg-clip-text text-transparent antialiased drop-shadow-[0_1px_0_rgba(0,0,0,0.10)] dark:drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]"
            >
              LinkedOut
            </h1>
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 shadow-sm shrink-0 translate-y-[3px]",
                isDark
                  ? "border-slate-700 bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-slate-50"
                  : "border-slate-300 bg-[color-mix(in_srgb,var(--accent)_8%,#fff)] text-slate-900",
              ].join(" ")}
              aria-label="Subtitle"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="currentColor" opacity={isDark ? 0.9 : 0.8} />
              </svg>
              <span className="text-[16px] md:text-[18px] font-medium tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                the <span className="font-semibold text-[var(--accent)]">LinkedIn</span> title generator
              </span>
            </div>
          </div>
        </div>
        <button
          className="group inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-400/35 dark:border-slate-400/20 bg-black/5 dark:bg-white/5 bg-[radial-gradient(circle_at_50%_45%,_rgba(255,255,255,0.08),_transparent_60%)] text-slate-600 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-40)] transition-colors"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="drop-shadow-[0_0_3px_rgba(255,255,255,0.25)] group-hover:brightness-110"
            >
              <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="drop-shadow-[0_0_2px_rgba(0,0,0,0.15)] group-hover:brightness-110"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
            </svg>
          )}
        </button>
      </div>
      <p className={`mt-2 ${isDark ? "text-slate-300" : "text-slate-700"} text-[16px] md:text-[17px]`}>
        Generate absurdly serious LinkedIn titles in one click.
      </p>
    </header>
  );
}
