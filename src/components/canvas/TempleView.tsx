"use client";

import { Suspense } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { LazyCanvas } from "./LazyCanvas";
import { TempleModel } from "./TempleModel";
import { Lighting } from "./Lighting";

interface TempleViewProps {
  className?: string;
  scale?: number;
  rotation?: [number, number, number];
  autoRotateSpeed?: number;
}

export function TempleView({
  className,
  scale = 0.15,
  rotation = [0, 0, 0],
  autoRotateSpeed = 1,
}: TempleViewProps) {
  return (
    <LazyCanvas
      className={className}
      cameraPosition={[0, 2, 6]}
      cameraFov={50}
    >
      <Lighting />
      <Suspense fallback={null}>
        <TempleModel position={[0, -1.5, 0]} scale={scale} rotation={rotation} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.2} blur={2.5} far={4} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
      />
    </LazyCanvas>
  );
}
