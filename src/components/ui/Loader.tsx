"use client";

import { useEffect, useState } from "react";
import { threshold } from "@/data/narrative";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <p className="font-[family-name:var(--font-cormorant)] italic text-base md:text-lg text-marble-dark/50 mb-6">
        {threshold.loaderLine}
      </p>
      <h2 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl text-gold tracking-[0.3em] mb-8">
        OLIMPO
      </h2>
      <div className="w-48 h-px bg-marble-dark/20 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark to-gold transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="font-[family-name:var(--font-cormorant)] text-sm text-marble-dark/40 mt-4 tracking-widest">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
