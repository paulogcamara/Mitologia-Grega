"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { TempleModel } from "@/components/canvas/TempleModel";
import { Lighting } from "@/components/canvas/Lighting";
import { Clouds } from "@/components/canvas/Clouds";
import { PostFX } from "@/components/canvas/PostFX";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cosmogony, threshold } from "@/data/narrative";

function TempleScene({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <Lighting />
      <Suspense fallback={null}>
        <TempleModel position={[0, -1, 0]} scale={0.2} />
        <Clouds variant="mist" count={mobile ? 14 : 28} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.2} blur={2} far={4} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      <PostFX preset="olympus" enabled={!mobile} />
    </>
  );
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inviteRef = useRef<HTMLParagraphElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Limiar: o nome emerge do escuro, e o convite chama o scroll.
    gsap.set(titleRef.current, { y: 60, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
    gsap.set(inviteRef.current, { opacity: 0 });

    gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 1.6, delay: 0.4, ease: "power3.out" });
    gsap.to(subtitleRef.current, { y: 0, opacity: 1, duration: 1.2, delay: 1.0, ease: "power3.out" });
    gsap.to(inviteRef.current, { opacity: 1, duration: 1.2, delay: 1.8, ease: "power2.out" });

    // Cada beat da cosmogonia aparece ao entrar na tela e some ao sair —
    // a leitura sobe com você, como degraus de luz na subida ao Olimpo.
    paragraphRefs.current.forEach((p) => {
      if (!p) return;
      gsap.set(p, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: p,
        start: "top 75%",
        end: "top 25%",
        onEnter: () => gsap.to(p, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }),
        onLeave: () => gsap.to(p, { opacity: 0, duration: 0.5 }),
        onEnterBack: () => gsap.to(p, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }),
        onLeaveBack: () => gsap.to(p, { opacity: 0, y: 30, duration: 0.5 }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="relative" style={{ marginLeft: "8vw", marginRight: "8vw" }}>
      {/* Mobile: o templo vive ATRÁS do texto, como o Olimpo ao longe na névoa */}
      <div className="md:hidden absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="sticky top-0 h-screen flex items-center justify-center opacity-45">
          <LazyCanvas className="w-full h-[70vh]" cameraPosition={[0, 1, 5]} cameraFov={50}>
            <TempleScene mobile />
          </LazyCanvas>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Coluna do texto */}
        <div>
          {/* Título + convite */}
          <div className="h-screen flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="font-[family-name:var(--font-cinzel)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gold"
              style={{ textShadow: "0 0 40px rgba(201, 168, 76, 0.3)" }}
            >
              {threshold.title[0]}
              <br />
              {threshold.title[1]}
            </h1>
            <p
              ref={subtitleRef}
              className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-marble-dark mt-6 tracking-widest uppercase"
            >
              {threshold.subtitle}
            </p>
            <p
              ref={inviteRef}
              className="font-[family-name:var(--font-cinzel)] text-[0.7rem] md:text-xs text-gold/50 mt-12 tracking-[0.35em] uppercase"
            >
              {threshold.invite}
            </p>
          </div>

          {/* Cada beat da cosmogonia = uma tela inteira */}
          {cosmogony.map((text, i) => (
            <div key={i} className="h-screen flex items-center">
              <p
                ref={(el) => { paragraphRefs.current[i] = el; }}
                className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-marble/90 leading-relaxed"
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: o templo sticky ao lado, emergindo da névoa */}
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <LazyCanvas className="w-full h-[75vh]" cameraPosition={[0, 1, 5]} cameraFov={50}>
              <TempleScene mobile={isMobile} />
            </LazyCanvas>
          </div>
        </div>
      </div>
    </section>
  );
}
