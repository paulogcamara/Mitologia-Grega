"use client";

import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/paths";

/**
 * Plano de fundo do mundo. Por quê: sem lugar, a jornada flutua no preto;
 * o ambiente gerado diz ONDE você está (Olimpo, nuvens, Estige, Hades) e
 * muda CONFORME você avança. Sensação: presença física, deslocamento real.
 * Como: imagens empilhadas em camadas fixas; a opacidade de cada uma sobe
 * conforme o scroll cruza seu ponto (`at`), revelando o próximo reino sobre
 * o anterior — um morph contínuo, dirigido por scroll, sem re-render React.
 */
export interface BackdropFrame {
  src: string;
  /** Progresso (0..1) em que esta camada assume a cena. */
  at: number;
  /** Escurecimento sobre a imagem (legibilidade do texto). Default 0.4. */
  scrim?: number;
}

export function RealmBackdrop({ frames, fade = 0.16 }: { frames: BackdropFrame[]; fade?: number }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const apply = () => {
      ticking = false;
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      frames.forEach((f, i) => {
        const el = refs.current[i];
        if (!el) return;
        // a primeira camada é a base (sempre visível); as demais entram por cima
        const o = i === 0 ? 1 : Math.min(1, Math.max(0, (p - (f.at - fade)) / fade));
        el.style.opacity = String(o);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
    };
  }, [frames, fade]);

  return (
    <div className="fixed inset-0 -z-10 bg-black" aria-hidden>
      {frames.map((f, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, transition: "opacity 0.25s linear" }}
        >
          {/* src vazio = camada de puro escuro (ex.: a morte, antes de qualquer lugar) */}
          {f.src && <img src={assetPath(f.src)} alt="" className="w-full h-full object-cover" />}
          <div className="absolute inset-0" style={{ background: `rgba(6,6,10,${f.scrim ?? 0.4})` }} />
        </div>
      ))}
    </div>
  );
}
