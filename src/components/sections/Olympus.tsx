"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TempleView } from "@/components/canvas/TempleView";

export function Olympus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "top 20%",
        scrub: 1,
      },
    });

    tl.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1 })
      .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(descRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-4 md:px-12 lg:px-20 py-32"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12">
        <TempleView className="flex-1 w-full h-[50vh] md:h-[60vh]" scale={0.18} autoRotateSpeed={1.2} />

        <div className="flex-1 text-right">
          <div
            ref={dividerRef}
            className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent ml-auto mb-8 origin-right"
          />
          <h2
            ref={titleRef}
            className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-semibold text-gold tracking-wide opacity-0"
          >
            O Monte Olimpo
          </h2>
          <p
            ref={descRef}
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-marble-dark mt-8 leading-relaxed opacity-0"
          >
            No pico mais alto da Grecia, alem das nuvens e do alcance dos mortais,
            ergue-se a morada dos deuses. Palacios de marmore e ouro reluzem sob
            uma luz eterna, onde os doze Olimpicos governam o destino do mundo.
          </p>
        </div>
      </div>
    </section>
  );
}
