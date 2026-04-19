"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assetPath, DRACO_DECODER_PATH } from "@/lib/paths";

interface TempleModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function TempleModel({
  position = [0, -2, -5],
  scale = 0.5,
  rotation = [0, 0, 0],
}: TempleModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(assetPath("/models/ancient_greek_temple.glb"), DRACO_DECODER_PATH);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.05 + rotation[1];
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  );
}
