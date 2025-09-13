import type { ReactNode } from "react";
import "@/app/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${display.variable} h-full antialiased font-sans`}>{children}</body>
    </html>
  );
}
