"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { pantheon } from "@/data/gods";
import { pantheon as pantheonCopy, pantheonGroups, type PantheonGroup } from "@/data/narrative";
import { GodCard } from "@/components/gods/GodCard";

// Divisor entre grupos: dá respiro e nomeia o porquê de cada par estar junto.
function GroupDivider({ group }: { group: PantheonGroup }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", end: "top 45%", scrub: 1 },
      }
    );
    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={ref} className="text-center py-28 md:py-40 px-6 opacity-0">
      <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
      <h3 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl lg:text-4xl font-semibold text-gold tracking-wide">
        {group.title}
      </h3>
      <p className="font-[family-name:var(--font-cormorant)] text-base md:text-lg text-marble-dark/60 italic mt-4 max-w-xl mx-auto leading-relaxed">
        {group.line}
      </p>
    </div>
  );
}

export function Gods() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const tl = gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: { trigger: headerRef.current, start: "top 80%", end: "top 50%", scrub: 1 },
      }
    );
    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  // Índice corrido por todo o panteão (na ordem da jornada) controla a
  // alternância de tema, mesmo que os deuses venham agrupados.
  let runningIndex = -1;

  return (
    <div>
      {/* Abertura do Ato II */}
      <div ref={headerRef} className="text-center py-24 md:py-36 px-6 opacity-0">
        <p className="font-[family-name:var(--font-cinzel)] text-xs md:text-sm text-gold/60 tracking-[0.4em] uppercase mb-5">
          {pantheonCopy.kicker}
        </p>
        <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-semibold text-gold tracking-wide">
          {pantheonCopy.title}
        </h2>
        <p className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-marble/70 mt-6 max-w-2xl mx-auto leading-relaxed">
          {pantheonCopy.intro}
        </p>
      </div>

      {/* Cada grupo: um divisor + as audiências dos deuses daquele grupo */}
      {pantheonGroups.map((group) => {
        const groupGods = pantheon.filter((g) => g.group === group.id);
        return (
          <div key={group.id}>
            <GroupDivider group={group} />
            {groupGods.map((god) => {
              runningIndex += 1;
              return <GodCard key={god.id} god={god} index={runningIndex} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
