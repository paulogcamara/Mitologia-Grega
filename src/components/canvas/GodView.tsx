"use client";

import { Suspense } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { LazyCanvas } from "./LazyCanvas";
import { GodModel } from "./GodModel";

interface GodViewProps {
  modelPath: string;
  primaryColor: string;
  secondaryColor: string;
  className?: string;
}

export function GodView({ modelPath, primaryColor, secondaryColor, className }: GodViewProps) {
  return (
    <LazyCanvas className={className} cameraPosition={[0, 0, 6]} cameraFov={45}>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={0.8} color={primaryColor} />
      <pointLight position={[3, -2, 4]} intensity={0.5} color={secondaryColor} />
      <Suspense fallback={null}>
        <GodModel modelPath={modelPath} autoRotate />
        <ContactShadows position={[0, -2, 0]} opacity={0.15} blur={2} far={5} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
    </LazyCanvas>
  );
}
