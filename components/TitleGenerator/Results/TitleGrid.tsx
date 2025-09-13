"use client";
import React from "react";
import TitleCard from "@/components/TitleCard";

type Props = { items: string[]; isDark: boolean };

export default function TitleGrid({ items, isDark }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4 [grid-auto-rows:minmax(100px,auto)]">
      {items.map((t,i)=> <TitleCard key={i} text={t} dark={isDark} />)}
    </div>
  );
}

