"use client";

import { useEffect, useRef, useState } from "react";
import { getAmbient } from "@/lib/audio";

/**
 * Controle de som — mudo por padrão. Liga a atmosfera sonora a partir de um
 * gesto do usuário e, enquanto ativa, alimenta o engine com a posição na
 * jornada para que o timbre escureça na descida a Hades.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!on) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const ambient = getAmbient();
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.body.scrollHeight - window.innerHeight;
      const darkness = max > 0 ? window.scrollY / max : 0;
      ambient.setScene(darkness);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [on]);

  const toggle = () => {
    const ambient = getAmbient();
    if (on) {
      ambient.disable();
      setOn(false);
    } else {
      ambient.enable();
      setOn(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Desligar som ambiente" : "Ligar som ambiente"}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full border border-gold/20 bg-black/40 backdrop-blur-sm text-gold/70 hover:text-gold hover:border-gold/50 transition-colors duration-300"
    >
      <span className="flex items-end gap-[2px] h-3" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[2px] bg-current rounded-full"
            style={{
              height: on ? `${[6, 11, 8][i]}px` : "3px",
              transition: "height 0.3s ease",
              animation: on ? `sndbar 1.1s ease-in-out ${i * 0.18}s infinite` : "none",
            }}
          />
        ))}
      </span>
      <span className="font-[family-name:var(--font-cinzel)] text-[0.6rem] tracking-[0.3em] uppercase">
        {on ? "Som" : "Mudo"}
      </span>
    </button>
  );
}
