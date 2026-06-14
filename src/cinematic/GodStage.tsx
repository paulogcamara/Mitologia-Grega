"use client";

import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { GodModel } from "@/components/canvas/GodModel";
import type { God } from "@/data/gods";

/**
 * Encontro com um deus — como uma estátua iluminada num museu escuro.
 * Centralizado num eixo só (consistência). Uma POÇA de escuro + um brilho
 * quente atrás separam o mármore de qualquer matte ao fundo; a luz na cor do
 * deus dá caráter. Abaixo, a cartela com nome e mito. Sensação: estar diante
 * de uma presença, sob um foco de luz.
 */
export interface GodStageProps {
  god: God;
  /** Ignorado: o layout agora é centralizado num eixo só (mantido p/ compat). */
  side?: "left" | "right";
  kicker?: string;
  lines?: string[];
  quote?: string;
  preset?: "olympus" | "godDark" | "godLight" | "underworld";
}

const TEXT_SCRIM =
  "radial-gradient(ellipse 80% 70% at center, rgba(6,6,10,0.85) 0%, rgba(6,6,10,0.55) 50%, rgba(6,6,10,0) 82%)";

export function GodStage({ god, kicker, lines, quote }: GodStageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const body = lines ?? [god.description, god.myth];
  const pull = quote ?? god.pullQuote;
  const tag = kicker ?? god.epithet;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // A estátua NÃO faz fade: fica sempre visível (já renderizada quando
      // você chega). Só o halo e o texto entram com ritmo.
      const halo = ref.current?.querySelector(".gs-halo");
      const items = ref.current?.querySelectorAll(".gs-rev");
      if (halo) gsap.set(halo, { opacity: 0 });
      if (items) gsap.set(items, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 78%",
        onEnter: () => {
          if (halo) gsap.to(halo, { opacity: 1, duration: 1.6, ease: "power2.out" });
          if (items) gsap.to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.16, ease: "power3.out", delay: 0.2 });
        },
        onLeaveBack: () => {
          if (halo) gsap.to(halo, { opacity: 0, duration: 0.4 });
          if (items) gsap.to(items, { opacity: 0, y: 30, duration: 0.4 });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-2">
      {/* a presença */}
      <div className="relative w-full max-w-2xl">
        {/* poça de escuro + brilho quente na cor do deus, atrás da estátua */}
        <div
          className="gs-halo absolute inset-0 -m-[12%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 46% 58% at 50% 52%, rgba(4,4,8,0.92) 0%, rgba(4,4,8,0.55) 45%, rgba(4,4,8,0) 72%), radial-gradient(circle at 50% 48%, ${god.colors[0]}33 0%, transparent 55%)`,
          }}
        />
        <div className="gs-canvas relative">
          <LazyCanvas className="w-full h-[56vh] md:h-[66vh]" cameraPosition={[0, 0, 6]} cameraFov={42}>
            <ambientLight intensity={0.5} />
            {/* key forte */}
            <directionalLight position={[4, 7, 6]} intensity={1.8} />
            {/* rim quente na cor do deus, por trás */}
            <pointLight position={[-2, 4, -5]} intensity={2.2} color={god.colors[0]} />
            {/* fill suave de baixo */}
            <pointLight position={[0, -3, 4]} intensity={0.5} color="#f0ead6" />
            <Suspense fallback={null}>
              <GodModel modelPath={god.modelPath} margin={1.05} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </LazyCanvas>
        </div>
      </div>

      {/* a cartela */}
      <div className="relative flex flex-col items-center text-center max-w-2xl px-8 md:px-12 py-8" style={{ background: TEXT_SCRIM }}>
        <p className="gs-rev flex items-center gap-4 font-[family-name:var(--font-cinzel)] text-xs tracking-[0.45em] uppercase mb-3" style={{ color: `${god.colors[0]}dd` }}>
          <span className="h-px w-8" style={{ background: `${god.colors[0]}88` }} />
          {tag}
          <span className="h-px w-8" style={{ background: `${god.colors[0]}88` }} />
        </p>
        <h3 className="gs-rev font-[family-name:var(--font-cinzel)] font-semibold tracking-wide leading-[0.92]" style={{ color: god.colors[0], fontSize: "clamp(3rem, 8vw, 6.5rem)", textShadow: "0 2px 40px rgba(0,0,0,0.7)" }}>
          {god.name}
        </h3>
        <p className="gs-rev font-[family-name:var(--font-cinzel)] text-[0.7rem] md:text-xs tracking-[0.3em] uppercase mt-3 mb-6 text-marble-dark/75">
          {god.greekName} · {god.title}
        </p>
        {body.map((l, i) => (
          <p key={i} className="gs-rev font-[family-name:var(--font-cormorant)] text-marble/90 leading-relaxed mb-4" style={{ fontSize: "clamp(1.2rem, 2.3vw, 1.7rem)" }}>
            {l}
          </p>
        ))}
        {pull && (
          <p className="gs-rev font-[family-name:var(--font-cinzel)] italic leading-snug mt-2" style={{ color: god.colors[0], fontSize: "clamp(1.3rem, 2.6vw, 2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}>
            “{pull}”
          </p>
        )}
      </div>
    </section>
  );
}
