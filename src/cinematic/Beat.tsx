"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Um beat narrativo, como uma CARTELA DE FILME: hairline dourada, kicker em
 * caixa-alta, título e linhas — tudo centrado num só eixo (consistência) e
 * pousado sobre um scrim difuso (legibilidade sobre os mattes), nunca uma
 * caixa. Por quê: ritmo de narração + leitura limpa sobre qualquer fundo.
 */
type Tone = "light" | "gold" | "red";

const TONE: Record<Tone, { accent: string; title: string; rule: string }> = {
  light: { accent: "text-marble/75", title: "text-marble", rule: "rgba(201,168,76,0.7)" },
  gold: { accent: "text-gold/80", title: "text-gold", rule: "rgba(201,168,76,0.9)" },
  red: { accent: "text-red-400/80", title: "text-red-300", rule: "rgba(220,80,80,0.8)" },
};

export interface BeatProps {
  kicker?: string;
  title?: string;
  lines?: string[];
  quote?: string;
  tone?: Tone;
  full?: boolean;
  children?: ReactNode;
}

// scrim difuso (radial, feathered) para destacar o texto sem virar caixa
const SCRIM =
  "radial-gradient(ellipse 75% 68% at center, rgba(6,6,10,0.82) 0%, rgba(6,6,10,0.55) 48%, rgba(6,6,10,0) 80%)";

export function Beat({ kicker, title, lines = [], quote, tone = "light", full = true, children }: BeatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const t = TONE[tone];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(".beat-rev");
      if (!items) return;
      gsap.set(items, { opacity: 0, y: 34 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 72%",
        onEnter: () => gsap.to(items, { opacity: 1, y: 0, duration: 1.1, stagger: 0.2, ease: "power3.out" }),
        onLeaveBack: () => gsap.to(items, { opacity: 0, y: 34, duration: 0.4 }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={`relative ${full ? "min-h-screen" : ""} flex items-center justify-center px-6 py-28`}>
      <div
        className="flex flex-col items-center text-center gap-6 max-w-3xl px-8 md:px-16 py-16"
        style={{ background: SCRIM }}
      >
        <span className="beat-rev block h-px w-20" style={{ background: `linear-gradient(90deg, transparent, ${t.rule}, transparent)` }} />
        {kicker && (
          <p className={`beat-rev font-[family-name:var(--font-cinzel)] text-xs md:text-sm tracking-[0.5em] uppercase ${t.accent}`}>
            {kicker}
          </p>
        )}
        {title && (
          <h2 className={`beat-rev font-[family-name:var(--font-cinzel)] font-semibold tracking-wide leading-[0.95] ${t.title}`} style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}>
            {title}
          </h2>
        )}
        {lines.map((l, i) => (
          <p key={i} className="beat-rev font-[family-name:var(--font-cormorant)] text-marble/90 leading-relaxed" style={{ fontSize: "clamp(1.35rem, 2.7vw, 2.15rem)" }}>
            {l}
          </p>
        ))}
        {quote && (
          <p className={`beat-rev font-[family-name:var(--font-cinzel)] italic leading-snug ${t.title}`} style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)" }}>
            “{quote}”
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
