"use client";

import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { GodModel } from "@/components/canvas/GodModel";
import { gods } from "@/data/gods";

export function Underworld() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const hades = gods.find((g) => g.id === "hades");

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.set(contentRef.current, { y: 40, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => gsap.to(contentRef.current, { y: 0, opacity: 1, duration: 1 }),
      onLeaveBack: () => gsap.to(contentRef.current, { y: 40, opacity: 0, duration: 0.5 }),
    });

    return () => st.kill();
  }, []);

  if (!hades) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "#e8e4dc",
      }}
    >
      {/* Faixa vermelha escura no topo como transicao */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(180deg, #0c0c14 0%, transparent 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="w-full relative z-10"
        style={{ marginLeft: "8vw", marginRight: "8vw" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Modelo 3D — fundo claro para contraste maximo */}
          <div className="relative">
            {/* Circulo vermelho escuro atras da estatua */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, #2a0a0a 0%, #1a0505 40%, transparent 70%)",
              }}
            />
            <LazyCanvas
              className="w-full h-[70vh] md:h-[80vh]"
              cameraPosition={[0, 0, 6]}
              cameraFov={45}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} />
              <directionalLight position={[-3, 5, -3]} intensity={0.8} />
              <pointLight position={[0, 3, 4]} intensity={0.6} />
              <Suspense fallback={null}>
                <GodModel modelPath={hades.modelPath} autoRotate margin={0.9} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
            </LazyCanvas>
          </div>

          {/* Texto — sobre fundo claro, texto escuro */}
          <div className="text-center md:text-right">
            <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] uppercase mb-3 text-red-900/50">
              {hades.greekName}
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-7xl font-semibold tracking-wide mb-3 text-red-900">
              {hades.name}
            </h2>
            <p className="font-[family-name:var(--font-cinzel)] text-sm text-neutral-500 tracking-[0.15em] uppercase mb-8">
              {hades.title}
            </p>
            <p className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-neutral-700 leading-relaxed">
              {hades.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-end">
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
