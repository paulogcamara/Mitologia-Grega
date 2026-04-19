"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Descent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.set(textRef.current, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 75%",
      end: "top 25%",
      onEnter: () => gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }),
      onLeaveBack: () => gsap.to(textRef.current, { opacity: 0, y: 30, duration: 0.5 }),
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a0a 50%, #0a0a0f 100%)",
      }}
    >
      <div className="w-px h-32 bg-gradient-to-b from-gold/30 to-red-900/50 mx-auto mb-12" />
      <p
        ref={textRef}
        className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-center text-marble/60 max-w-2xl leading-relaxed"
      >
        Mas nem todos os reinos pertencem a luz.
        <br />
        <span className="text-red-800">
          Abaixo da terra, alem do rio Estige...
        </span>
      </p>
    </section>
  );
}
