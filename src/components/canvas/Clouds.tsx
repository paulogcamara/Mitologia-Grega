"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CloudParticle({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.x += Math.sin(state.clock.elapsedTime * speed) * 0.001;
    meshRef.current.position.y += Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.0005;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[scale, 8, 8]} />
      <meshStandardMaterial
        color="#c9a84c"
        transparent
        opacity={0.03}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Clouds() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 + 3,
        (Math.random() - 0.5) * 20 - 5,
      ] as [number, number, number],
      scale: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  return (
    <group>
      {particles.map((p) => (
        <CloudParticle key={p.id} {...p} />
      ))}
    </group>
  );
}
