"use client";

import { useRef } from "react";
import { useGLTF, Bounds, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assetPath, DRACO_DECODER_PATH } from "@/lib/paths";

interface GodModelProps {
  modelPath: string;
  autoRotate?: boolean;
  margin?: number;
  yOffset?: number;
}

export function GodModel({ modelPath, autoRotate = true, margin = 1.3, yOffset = 0 }: GodModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(assetPath(modelPath), DRACO_DECODER_PATH);

  useFrame(() => {
    if (!groupRef.current || !autoRotate) return;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      <Bounds fit clip observe margin={margin}>
        <Center>
          <primitive object={scene.clone()} />
        </Center>
      </Bounds>
    </group>
  );
}
