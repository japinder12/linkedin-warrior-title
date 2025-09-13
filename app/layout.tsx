import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: "LinkedIn Title Generator",
  description: "Generate absurdly serious LinkedIn titles in one click.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "LinkedIn Title Generator",
    description: "Generate absurdly serious LinkedIn titles in one click.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "LinkedIn Title Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Title Generator",
    description: "Generate absurdly serious LinkedIn titles in one click.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${display.variable} h-full antialiased font-sans`}>{children}</body>
    </html>
  );
}
