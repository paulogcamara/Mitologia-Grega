"use client";

import { useEffect, useState } from "react";

/**
 * Detecta viewport pequeno para reduzir custo (desativar post-FX, baixar
 * contagem de partículas) sem quebrar a experiência no mobile.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
