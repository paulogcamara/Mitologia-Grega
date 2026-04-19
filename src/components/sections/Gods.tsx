"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { gods } from "@/data/gods";
import { GodCard } from "@/components/gods/GodCard";

export function Gods() {
  const headerRef = useRef<HTMLDivElement>(null);
  const olympians = gods.filter((g) => g.realm === "olympus");

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div>
      <div ref={headerRef} className="text-center py-24 md:py-32 px-4 opacity-0">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
        <p className="font-[family-name:var(--font-cormorant)] text-lg text-gold/60 tracking-[0.3em] uppercase mb-4">
          Os Imortais do Olimpo
        </p>
        <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-semibold text-gold tracking-wide">
          Os Deuses Olímpicos
        </h2>
      </div>

      {olympians.map((god, i) => (
        <GodCard key={god.id} god={god} index={i} />
      ))}
    </div>
  );
}
