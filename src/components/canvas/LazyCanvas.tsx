"use client";

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

interface LazyCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  /** Margem de antecipação: monta o canvas bem antes de entrar em quadro,
   *  para que a estátua já esteja renderizada quando você chega nela. */
  rootMargin?: string;
}

export function LazyCanvas({
  children,
  className,
  cameraPosition = [0, 0, 4],
  cameraFov = 45,
  rootMargin = "1400px 0px",
}: LazyCanvasProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    setCanRender(true);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={className}>
      {canRender && isVisible && (
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          dpr={[1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          performance={{ min: 0.5 }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
