"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TempleView } from "@/components/canvas/TempleView";

export function Ascension() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const narrativeBlocks = [
    {
      text: "No principio, havia apenas o Caos — um vazio infinito e primordial, sem forma, sem luz, sem tempo.",
      align: "left" as const,
    },
    {
      text: "Da escuridao nasceram Gaia, a Terra, e Urano, o Ceu. Juntos, geraram os Titas — seres colossais que governaram por eras.",
      align: "right" as const,
    },
    {
      text: "Mas Zeus, o mais jovem dos filhos de Cronos, desafiou a tirania de seu pai. Uma guerra cosmica sacudiu o universo — a Titanomaquia.",
      align: "left" as const,
    },
    {
      text: "Os Olimpicos triunfaram. O trovao selou a vitoria, e o Monte Olimpo se tornou o trono eterno dos deuses.",
      align: "right" as const,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    textRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20">
        {narrativeBlocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-32 md:mb-48 opacity-0 ${
              block.align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              <p
                className={`font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-marble leading-relaxed ${
                  block.align === "left" ? "text-left" : "text-right"
                }`}
              >
                {block.text}
              </p>
            </div>

            <TempleView
              className="flex-1 w-full h-[40vh] md:h-[50vh]"
              scale={0.1 + i * 0.03}
              rotation={[0, (i * Math.PI) / 3, 0]}
              autoRotateSpeed={0.8 + i * 0.3}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
