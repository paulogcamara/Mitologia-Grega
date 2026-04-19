"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";

export function SharedCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
