"use client";

import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { GodModel, preloadGodModel } from "@/components/canvas/GodModel";
import { PostFX } from "@/components/canvas/PostFX";
import { useIsMobile } from "@/hooks/useIsMobile";
import { pantheon, type God } from "@/data/gods";

interface GodCardProps {
  god: God;
  /** Índice corrido no panteão — define a alternância de tema e o preload. */
  index: number;
}

// Alternância escuro/claro: cada audiência muda a luz da sala, para que
// nenhuma se confunda com a anterior.
function themeFor(index: number) {
  const isDark = index % 2 === 0;
  return { bg: isDark ? "#0c0c14" : "#e8e4dc", isDark };
}

export function GodCard({ god, index }: GodCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isModelLeft = index % 2 === 0; // alterna só o LADO do modelo (ritmo)
  const { bg, isDark } = themeFor(index);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Coreografia de entrada: o 3D revela primeiro, depois o texto sobe
      // linha a linha — ritmo de audiência, não tudo de uma vez.
      const canvas = sectionRef.current?.querySelector(".gc-canvas");
      const reveals = sectionRef.current?.querySelectorAll(".gc-reveal");

      if (canvas) gsap.set(canvas, { opacity: 0, scale: 0.96 });
      if (reveals) gsap.set(reveals, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 68%",
        onEnter: () => {
          if (canvas) gsap.to(canvas, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" });
          if (reveals)
            gsap.to(reveals, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power2.out", delay: 0.15 });
          const next = pantheon[index + 1];
          if (next) preloadGodModel(next.modelPath);
        },
        onLeaveBack: () => {
          if (canvas) gsap.to(canvas, { opacity: 0, scale: 0.96, duration: 0.4 });
          if (reveals) gsap.to(reveals, { opacity: 0, y: 28, duration: 0.4 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 md:py-0"
      style={{ background: bg }}
    >
      <div className="w-full" style={{ marginLeft: "8vw", marginRight: "8vw" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Audiência: a presença do deus (alterna de lado no desktop) */}
          <div className={`gc-canvas ${isModelLeft ? "md:order-1" : "md:order-2"}`}>
            <LazyCanvas
              className="w-full h-[50vh] md:h-[72vh]"
              cameraPosition={[0, 0, 6]}
              cameraFov={45}
            >
              <ambientLight intensity={isDark ? 0.7 : 0.9} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} />
              {/* Rim light na cor do deus — caracteriza a presença */}
              <pointLight position={[-3, 3, 3]} intensity={0.8} color={god.colors[0]} />
              <Suspense fallback={null}>
                <GodModel modelPath={god.modelPath} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
              <PostFX preset={isDark ? "godDark" : "godLight"} enabled={!isMobile} />
            </LazyCanvas>
          </div>

          {/* A história — sempre alinhada à esquerda, para leitura limpa */}
          <div className={`text-left ${isModelLeft ? "md:order-2" : "md:order-1"}`}>
            <p
              className="gc-reveal font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: `${god.colors[0]}aa` }}
            >
              {god.epithet}
            </p>

            <h3
              className="gc-reveal font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mb-1"
              style={{ color: god.colors[0] }}
            >
              {god.name}
            </h3>
            <p
              className={`gc-reveal font-[family-name:var(--font-cinzel)] text-[0.7rem] tracking-[0.3em] uppercase mb-6 ${
                isDark ? "text-marble-dark/55" : "text-neutral-500"
              }`}
            >
              {god.greekName} · {god.title}
            </p>

            <p
              className={`gc-reveal font-[family-name:var(--font-cormorant)] text-lg md:text-xl leading-relaxed ${
                isDark ? "text-marble/80" : "text-neutral-700"
              }`}
            >
              {god.description}
            </p>

            <p
              className={`gc-reveal font-[family-name:var(--font-cormorant)] text-base md:text-lg leading-relaxed mt-5 pl-5 border-l ${
                isDark ? "text-marble/65" : "text-neutral-600"
              }`}
              style={{ borderColor: `${god.colors[0]}55` }}
            >
              {god.myth}
            </p>

            <p
              className="gc-reveal font-[family-name:var(--font-cinzel)] text-lg md:text-xl italic leading-snug mt-6"
              style={{ color: god.colors[0] }}
            >
              “{god.pullQuote}”
            </p>

            <div className="gc-reveal flex flex-wrap gap-3 mt-6 justify-start">
              {god.symbols.map((symbol) => (
                <span
                  key={symbol}
                  className={`font-[family-name:var(--font-cormorant)] text-sm tracking-wide px-4 py-1.5 ${
                    isDark ? "" : "bg-neutral-200/50"
                  }`}
                  style={{
                    color: `${god.colors[0]}cc`,
                    background: isDark ? `${god.colors[0]}0a` : undefined,
                    borderLeft: `2px solid ${god.colors[0]}40`,
                  }}
                >
                  {symbol}
                </span>
              ))}
            </div>

            {god.relations && (
              <p
                className={`gc-reveal font-[family-name:var(--font-cormorant)] text-sm italic mt-6 ${
                  isDark ? "text-marble-dark/40" : "text-neutral-400"
                }`}
              >
                {god.relations}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
