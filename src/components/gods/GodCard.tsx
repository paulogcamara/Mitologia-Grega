"use client";

import { useEffect, useRef, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { GodModel, preloadGodModel } from "@/components/canvas/GodModel";
import { gods, type God } from "@/data/gods";

interface GodCardProps {
  god: God;
  index: number;
}

const sectionBackgrounds = [
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
  { bg: "#e8e4dc", text: "dark" },
  { bg: "#0c0c14", text: "light" },
];

export function GodCard({ god, index }: GodCardProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const theme = sectionBackgrounds[index % sectionBackgrounds.length];
  const isDark = theme.text === "light";

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.set(contentRef.current, { y: 40, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(contentRef.current, { y: 0, opacity: 1, duration: 1 });
        const olympians = gods.filter((g) => g.realm === "olympus");
        const next = olympians[index + 1];
        if (next) preloadGodModel(next.modelPath);
      },
      onLeaveBack: () => gsap.to(contentRef.current, { y: 40, opacity: 0, duration: 0.5 }),
    });

    return () => st.kill();
  }, [index]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ background: theme.bg }}
    >
      <div
        ref={contentRef}
        className="w-full"
        style={{ marginLeft: "8vw", marginRight: "8vw" }}
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
            isEven ? "" : "[direction:rtl]"
          }`}
        >
          {/* Modelo 3D */}
          <div className={isEven ? "" : "[direction:ltr]"}>
            <LazyCanvas
              className="w-full h-[60vh] md:h-[70vh]"
              cameraPosition={[0, 0, 6]}
              cameraFov={45}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 8, 5]} intensity={1.2} />
              <pointLight position={[-3, 3, 3]} intensity={0.5} />
              <Suspense fallback={null}>
                <GodModel modelPath={god.modelPath} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
            </LazyCanvas>
          </div>

          {/* Texto */}
          <div className={`${isEven ? "[direction:ltr] text-left" : "[direction:ltr] text-right"}`}>
            <p
              className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: `${god.colors[0]}99` }}
            >
              {god.greekName}
            </p>
            <h3
              className="font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mb-2"
              style={{ color: god.colors[0] }}
            >
              {god.name}
            </h3>
            <p
              className={`font-[family-name:var(--font-cinzel)] text-sm tracking-[0.15em] uppercase mb-6 ${
                isDark ? "text-marble-dark/60" : "text-neutral-500"
              }`}
            >
              {god.title}
            </p>
            <p
              className={`font-[family-name:var(--font-cormorant)] text-lg md:text-xl leading-relaxed ${
                isDark ? "text-marble/80" : "text-neutral-700"
              }`}
            >
              {god.description}
            </p>

            <div
              className={`flex flex-wrap gap-3 mt-6 ${
                isEven ? "justify-start" : "justify-end"
              }`}
            >
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
          </div>
        </div>
      </div>
    </section>
  );
}
