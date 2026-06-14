"use client";

import { useMemo, useRef } from "react";
import { useGLTF, Bounds, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assetPath, DRACO_DECODER_PATH } from "@/lib/paths";

interface GodModelProps {
  modelPath: string;
  autoRotate?: boolean;
  margin?: number;
  yOffset?: number;
  /** Entrada por escala: a presença "se forma" diante do mortal. */
  entrance?: boolean;
}

export function GodModel({
  modelPath,
  autoRotate = false,
  margin = 1.3,
  yOffset = 0,
  entrance = true,
}: GodModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(assetPath(modelPath), DRACO_DECODER_PATH);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Escala-alvo é 1; começa um pouco menor e se aproxima — a estátua
  // emerge em vez de simplesmente aparecer.
  const start = entrance ? 0.92 : 1;

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    if (autoRotate) g.rotation.y += 0.003;
    if (entrance) {
      const k = 1 - Math.pow(0.06, delta); // damp suave, independente de fps
      const s = THREE.MathUtils.lerp(g.scale.x, 1, k);
      g.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]} scale={start}>
      <Bounds fit clip observe margin={margin}>
        <Center>
          <primitive object={cloned} />
        </Center>
      </Bounds>
    </group>
  );
}

export function preloadGodModel(modelPath: string) {
  useGLTF.preload(assetPath(modelPath), DRACO_DECODER_PATH);
}
