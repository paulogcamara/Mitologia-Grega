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
}

export function LazyCanvas({
  children,
  className,
  cameraPosition = [0, 0, 4],
  cameraFov = 45,
}: LazyCanvasProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [canRender, setCanRender] = useState(false);

  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    setCanRender(true);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {canRender && isVisible && (
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
