"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { descent } from "@/data/narrative";

export function Descent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const cueRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // As linhas caem uma a uma — a luz imortal ficando para trás.
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: i * 0.1, ease: "power2.out" }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, y: 30, duration: 0.5 }),
      });
    });

    if (cueRef.current) {
      gsap.set(cueRef.current, { opacity: 0 });
      ScrollTrigger.create({
        trigger: cueRef.current,
        start: "top 85%",
        onEnter: () => gsap.to(cueRef.current, { opacity: 1, duration: 1.4, ease: "power2.out" }),
        onLeaveBack: () => gsap.to(cueRef.current, { opacity: 0, duration: 0.5 }),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex flex-col items-center justify-center px-8 text-center"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a0a 55%, #0a0a0f 100%)",
      }}
    >
      <div className="w-px h-40 bg-gradient-to-b from-gold/30 to-red-900/60 mx-auto mb-16" />

      <div className="max-w-2xl space-y-8">
        <p
          ref={(el) => { lineRefs.current[0] = el; }}
          className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-marble/60 leading-relaxed"
        >
          {descent.lines[0]}
        </p>
        <p
          ref={(el) => { lineRefs.current[1] = el; }}
          className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl leading-relaxed text-red-800/90"
        >
          {descent.lines[1]}
        </p>
      </div>

      <p
        ref={cueRef}
        className="font-[family-name:var(--font-cinzel)] text-sm md:text-base text-red-900/70 tracking-[0.5em] uppercase mt-20"
      >
        {descent.cue}
      </p>
    </section>
  );
}
