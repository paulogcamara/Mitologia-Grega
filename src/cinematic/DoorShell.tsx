"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { RealmBackdrop, type BackdropFrame } from "./RealmBackdrop";
import { Grain } from "./Grain";

/**
 * Invólucro de uma "porta" (experiência). Reúne o que toda jornada precisa:
 * scroll suave (Lenis), o ambiente gerado ao fundo, o grão de filme por cima,
 * o som ambiente e o caminho de volta às portas. O conteúdo é a história.
 */
export function DoorShell({ frames, children }: { frames: BackdropFrame[]; children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <RealmBackdrop frames={frames} />
      <Grain />
      <SoundToggle />
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 font-[family-name:var(--font-cinzel)] text-[0.65rem] tracking-[0.3em] uppercase text-marble/50 hover:text-gold transition-colors"
      >
        ← As Três Portas
      </Link>
      <main className="relative">{children}</main>
    </SmoothScrollProvider>
  );
}
