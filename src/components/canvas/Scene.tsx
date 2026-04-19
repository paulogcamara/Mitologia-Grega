"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { TempleModel } from "./TempleModel";
import { Lighting } from "./Lighting";

export function TempleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Lighting />
      <Suspense fallback={null}>
        <TempleModel position={[0, -1.5, 0]} scale={0.15} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.2} blur={2.5} far={4} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}
