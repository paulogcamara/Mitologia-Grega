"use client";

import { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assetPath, DRACO_DECODER_PATH } from "@/lib/paths";

const TEMPLE_PATH = "/models/ancient_greek_temple.glb";

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
  const { scene } = useGLTF(assetPath(TEMPLE_PATH), DRACO_DECODER_PATH);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.05 + rotation[1];
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(assetPath(TEMPLE_PATH), DRACO_DECODER_PATH);
