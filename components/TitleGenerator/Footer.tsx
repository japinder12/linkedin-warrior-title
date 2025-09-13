"use client";
import React from "react";

export default function Footer({ isDark, btnBd }: { isDark: boolean; btnBd: string }) {
  const subtle = isDark ? "text-slate-400" : "text-slate-600";
  return (
    <footer className={`mt-6 text-xs ${subtle} flex items-center justify-between`}>
      <span>Powered by chaotic neutral energy.</span>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/japinder12/linkedin-warrior-title"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          aria-label="GitHub"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5 hover:border-[#0A66C2]/40 dark:hover:border-[#7CC4FF]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/40 dark:focus-visible:ring-[#7CC4FF]/40 transition-colors`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={isDark ? "text-slate-200" : "text-slate-700"} aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.162 19.495c.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.776.603-3.362-1.338-3.362-1.338-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.031 1.532 1.031.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.218-.252-4.553-1.109-4.553-4.938 0-1.09.39-1.981 1.029-2.678-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.506.337 1.909-1.293 2.748-1.024 2.748-1.024.546 1.376.203 2.393.1 2.646.64.697 1.028 1.588 1.028 2.678 0 3.839-2.338 4.683-4.566 4.931.36.311.68.922.68 1.859 0 1.341-.012 2.422-.012 2.752 0 .267.18.579.688.48A10.001 10.001 0 0 0 12 2Z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/japinder-narula"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${btnBd} hover:bg-black/5 dark:hover:bg-white/5 hover:border-[#0A66C2]/40 dark:hover:border-[#7CC4FF]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]/40 dark:focus-visible:ring-[#7CC4FF]/40 transition-colors`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={isDark ? "text-slate-200" : "text-slate-700"} aria-hidden="true">
            <path d="M22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.74V1.74C24 .78 23.21 0 22.23 0ZM7.06 20.45H3.89V9h3.17v11.45ZM5.48 7.43a1.84 1.84 0 1 1 0-3.68 1.84 1.84 0 0 1 0 3.68ZM20.45 20.45h-3.17v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27v6.3H9.67V9h3.04v1.57h.04c.42-.79 1.44-1.62 2.96-1.62 3.17 0 3.75 2.09 3.75 4.8Z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}

