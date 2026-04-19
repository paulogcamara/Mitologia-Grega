"use client";

import { useEffect, useRef, Suspense } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LazyCanvas } from "@/components/canvas/LazyCanvas";
import { TempleModel } from "@/components/canvas/TempleModel";
import { Lighting } from "@/components/canvas/Lighting";
import { OrbitControls, ContactShadows } from "@react-three/drei";

const narrativeTexts = [
  "No principio, havia apenas o Caos — um vazio infinito e primordial, sem forma, sem luz, sem tempo.",
  "Da escuridao nasceram Gaia, a Terra, e Urano, o Ceu. Juntos, geraram os Titas — seres colossais que governaram por eras.",
  "Mas Zeus, o mais jovem dos filhos de Cronos, desafiou a tirania de seu pai. Uma guerra cosmica sacudiu o universo — a Titanomaquia.",
  "Os Olimpicos triunfaram. O trovao selou a vitoria, e o Monte Olimpo se tornou o trono eterno dos deuses.",
  "No pico mais alto da Grecia, alem das nuvens e do alcance dos mortais, ergue-se a morada dos deuses. Palacios de marmore e ouro reluzem sob uma luz eterna.",
];

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Titulo e subtitulo — animacao de entrada
    gsap.set(titleRef.current, { y: 60, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 40, opacity: 0 });

    gsap.to(titleRef.current, {
      y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "power3.out",
    });
    gsap.to(subtitleRef.current, {
      y: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: "power3.out",
    });

    // Paragrafos — iniciam invisiveis, aparecem ao scroll
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Coluna do texto */}
        <div>
          {/* Titulo */}
          <div className="h-screen flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="font-[family-name:var(--font-cinzel)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gold"
              style={{ textShadow: "0 0 40px rgba(201, 168, 76, 0.3)" }}
            >
              MITOLOGIA
              <br />
              GREGA
            </h1>
            <p
              ref={subtitleRef}
              className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-marble-dark mt-6 tracking-widest uppercase"
            >
              Uma jornada pelos reinos dos deuses
            </p>
          </div>

          {/* Cada paragrafo = tela inteira */}
          {narrativeTexts.map((text, i) => (
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

        {/* Modelo 3D sticky */}
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <LazyCanvas
              className="w-full h-[75vh]"
              cameraPosition={[0, 1, 5]}
              cameraFov={50}
            >
              <Lighting />
              <Suspense fallback={null}>
                <TempleModel position={[0, -1, 0]} scale={0.2} />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.2} blur={2} far={4} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
            </LazyCanvas>
          </div>
        </div>
      </div>
    </section>
  );
}
