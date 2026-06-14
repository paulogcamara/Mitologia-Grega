"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ret } from "@/data/narrative";

/**
 * Ato V — O Retorno. O mortal emerge do submundo de volta à superfície.
 * A seção sobe do escuro de Hades a um clarão quente, e o mito se revela
 * como o que de fato é: linguagem que sobreviveu. Fecha fazendo ponte com
 * o presente (a autoria), antes dos créditos.
 */
export function Return() {
  const reveals = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    reveals.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: i * 0.08, ease: "power2.out" }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, y: 30, duration: 0.5 }),
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Índices fixos para o array de reveals (kicker=0, título=1, parágrafos=2..n)
  const pCount = ret.paragraphs.length;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-32"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #14110c 60%, #1c160d 100%)" }}
    >
      {/* Clarão quente da superfície reencontrada */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.16) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-2xl">
        <p
          ref={(el) => { reveals.current[0] = el; }}
          className="font-[family-name:var(--font-cinzel)] text-xs md:text-sm text-gold/60 tracking-[0.4em] uppercase mb-8"
        >
          {ret.kicker}
        </p>
        <h2
          ref={(el) => { reveals.current[1] = el; }}
          className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-semibold text-gold tracking-wide mb-12"
          style={{ textShadow: "0 0 40px rgba(201, 168, 76, 0.25)" }}
        >
          {ret.title}
        </h2>

        {ret.paragraphs.map((p, idx) => (
          <p
            key={idx}
            ref={(el) => { reveals.current[2 + idx] = el; }}
            className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-marble/80 leading-relaxed mb-8"
          >
            {p}
          </p>
        ))}

        <div
          ref={(el) => { reveals.current[2 + pCount] = el; }}
          className="w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-12 mb-8"
        />
        <p
          ref={(el) => { reveals.current[3 + pCount] = el; }}
          className="font-[family-name:var(--font-cinzel)] text-sm text-gold/50 tracking-[0.3em] uppercase"
        >
          {ret.signature}
        </p>
      </div>
    </section>
  );
}
