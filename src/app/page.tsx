"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/paths";
import { gsap } from "@/lib/gsap";

/**
 * As Três Portas — a vitrine de escolha. Não são cards: são três arcos de
 * pedra com luz de tocha viva. Ao passar o mouse, a porta escolhida se acende
 * e as outras recuam para a sombra. Sensação: um limiar escuro, três caminhos,
 * e sentir um deles te chamar.
 *
 * Layout: título numa zona escura no topo (com folga garantida via padding
 * inline) e os rótulos centrados na faixa central — longe das duas bordas e
 * sobre um scrim próprio, para não competir com as esculturas dos arcos.
 */
const doors = [
  { href: "/descida", n: "I", title: "A Descida", teaser: "Do alto dourado do Olimpo ao escuro de Hades. O scroll é a própria queda." },
  { href: "/passagem", n: "II", title: "A Passagem da Alma", teaser: "Você morreu. Hermes te guia pelo Estige, e os deuses pesam o que você foi." },
  { href: "/persefone", n: "III", title: "O Mito de Perséfone", teaser: "O rapto, o luto de uma mãe, o inverno e o retorno. A origem das estações." },
];

const LABEL_SCRIM =
  "radial-gradient(ellipse 95% 86% at center, rgba(6,6,10,0.82) 0%, rgba(6,6,10,0.45) 52%, rgba(6,6,10,0) 80%)";

export default function Portas() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pt-head", { opacity: 0, y: 24, duration: 1.2, stagger: 0.14, ease: "power3.out", delay: 0.2 });
      gsap.from(".pt-door", { opacity: 0, y: 40, duration: 1.3, stagger: 0.18, ease: "power3.out", delay: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={ref} className="relative flex flex-col" style={{ minHeight: "100vh" }}>
      {/* o limiar: os três arcos de pedra, com zonas escuras no topo e na base */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <img src={assetPath("/scenes/doors.webp")} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(6,6,10,0.94) 0%, rgba(6,6,10,0.3) 24%, rgba(6,6,10,0.26) 52%, rgba(6,6,10,0.7) 84%, rgba(6,6,10,0.96) 100%)" }}
        />
      </div>

      {/* cabeçalho — folga do topo garantida por padding inline */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-8"
        style={{ paddingTop: "clamp(5rem, 13vh, 9rem)" }}
      >
        <span className="pt-head block h-px w-24 mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.9), transparent)" }} />
        <p className="pt-head font-[family-name:var(--font-cinzel)] text-xs md:text-sm tracking-[0.5em] uppercase text-gold/65 mb-4">
          Mitologia Grega
        </p>
        <h1 className="pt-head font-[family-name:var(--font-cinzel)] font-bold tracking-wider text-gold leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", textShadow: "0 0 50px rgba(201,168,76,0.35)" }}>
          As Três Portas
        </h1>
        <p className="pt-head font-[family-name:var(--font-cormorant)] text-marble/75 mt-4 max-w-xl" style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.45rem)" }}>
          Três caminhos pela mesma mitologia. Sinta qual deles te chama.
        </p>
      </div>

      {/* arcos clicáveis — rótulos centrados na faixa central, fora das bordas */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 px-6 py-12">
        {doors.map((d, i) => {
          const active = hovered === i;
          const dimmed = hovered !== null && hovered !== i;
          return (
            <Link
              key={d.href}
              href={d.href}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="pt-door group relative md:flex-1 flex flex-col items-center justify-center text-center transition-all duration-700"
              style={{ opacity: dimmed ? 0.4 : 1, filter: dimmed ? "saturate(0.6)" : "none" }}
            >
              {/* luz de tocha dentro do arco, acima do rótulo */}
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[42%] w-[68%] aspect-square rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(232,196,110,0.85) 0%, rgba(201,138,46,0.4) 35%, transparent 68%)",
                  opacity: active ? 0.9 : undefined,
                  animation: active ? "none" : "torch 5s ease-in-out infinite",
                  transition: "opacity 0.7s ease",
                  filter: "blur(8px)",
                }}
              />

              {/* rótulo sobre seu próprio scrim */}
              <div className="relative flex flex-col items-center px-8 py-7 max-w-xs" style={{ background: LABEL_SCRIM }}>
                <span className="font-[family-name:var(--font-cinzel)] text-sm tracking-[0.5em] transition-colors duration-500" style={{ color: active ? "#e8d48b" : "rgba(201,168,76,0.5)" }}>
                  {d.n}
                </span>
                <h2 className="font-[family-name:var(--font-cinzel)] font-semibold tracking-wide mt-4 mb-3 transition-colors duration-500" style={{ color: active ? "#e8d48b" : "#f0ead6", fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)", textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}>
                  {d.title}
                </h2>
                <p className="font-[family-name:var(--font-cormorant)] text-marble/80 leading-relaxed transition-all duration-500" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", opacity: active ? 1 : 0.8, textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>
                  {d.teaser}
                </p>
                <span className="font-[family-name:var(--font-cinzel)] text-[0.65rem] tracking-[0.4em] uppercase mt-6 transition-all duration-500" style={{ color: "#c9a84c", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(6px)" }}>
                  Atravessar →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
