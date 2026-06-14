"use client";

import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { GodModel } from "@/components/canvas/GodModel";
import { Clouds } from "@/components/canvas/Clouds";
import { PostFX } from "@/components/canvas/PostFX";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getGod } from "@/data/gods";
import { underworld } from "@/data/narrative";

export function Underworld() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const hades = getGod("hades");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const canvas = sectionRef.current?.querySelector(".uw-canvas");
      const reveals = sectionRef.current?.querySelectorAll(".uw-reveal");
      if (canvas) gsap.set(canvas, { opacity: 0, scale: 0.96 });
      if (reveals) gsap.set(reveals, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 68%",
        onEnter: () => {
          if (canvas) gsap.to(canvas, { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" });
          if (reveals) gsap.to(reveals, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out", delay: 0.2 });
        },
        onLeaveBack: () => {
          if (canvas) gsap.to(canvas, { opacity: 0, scale: 0.96, duration: 0.4 });
          if (reveals) gsap.to(reveals, { opacity: 0, y: 28, duration: 0.4 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!hades) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-24 md:py-0"
      style={{ background: "#e8e4dc" }}
    >
      {/* Faixa escura no topo: a sombra do mundo de cima ainda alcança aqui */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #0c0c14 0%, transparent 100%)" }}
      />

      <div className="w-full relative z-10" style={{ marginLeft: "8vw", marginRight: "8vw" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* A presença de Hades — fundo claro para contraste máximo */}
          <div className="uw-canvas relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, #2a0a0a 0%, #1a0505 40%, transparent 70%)" }}
            />
            <LazyCanvas className="w-full h-[55vh] md:h-[80vh]" cameraPosition={[0, 0, 6]} cameraFov={45}>
              <ambientLight intensity={1.1} />
              <directionalLight position={[5, 8, 5]} intensity={1.4} />
              <directionalLight position={[-3, 5, -3]} intensity={0.8} />
              <pointLight position={[0, 2, 4]} intensity={0.7} color={hades.colors[0]} />
              <Suspense fallback={null}>
                <GodModel modelPath={hades.modelPath} autoRotate margin={0.9} />
                <Clouds variant="embers" count={isMobile ? 12 : 22} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
              <PostFX preset="underworld" enabled={!isMobile} />
            </LazyCanvas>
          </div>

          {/* A história — texto escuro sobre fundo claro, alinhado à esquerda */}
          <div className="text-center md:text-left">
            <p className="uw-reveal font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] uppercase mb-3 text-red-900/60">
              {underworld.kicker}
            </p>
            <p className="uw-reveal font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] uppercase mb-3 text-red-900/50">
              {hades.epithet}
            </p>
            <h2 className="uw-reveal font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-7xl font-semibold tracking-wide mb-2 text-red-900">
              {hades.name}
            </h2>
            <p className="uw-reveal font-[family-name:var(--font-cinzel)] text-sm text-neutral-500 tracking-[0.2em] uppercase mb-8">
              {hades.greekName} · {hades.title}
            </p>

            <p className="uw-reveal font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-neutral-700 leading-relaxed">
              {hades.description}
            </p>

            <p
              className="uw-reveal font-[family-name:var(--font-cormorant)] text-base md:text-lg text-neutral-600 leading-relaxed mt-5 pl-5 border-l"
              style={{ borderColor: "rgba(127,29,29,0.35)" }}
            >
              {hades.myth}
            </p>

            <p className="uw-reveal font-[family-name:var(--font-cinzel)] text-lg md:text-xl italic leading-snug mt-6 text-red-900">
              “{hades.pullQuote}”
            </p>

            <div className="uw-reveal flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
              {hades.symbols.map((symbol) => (
                <span
                  key={symbol}
                  className="font-[family-name:var(--font-cormorant)] text-sm tracking-wide px-4 py-1.5 text-red-900/70 bg-red-900/5"
                  style={{ borderLeft: "2px solid rgba(127, 29, 29, 0.3)" }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
