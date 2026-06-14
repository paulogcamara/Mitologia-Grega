"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Variant = "mist" | "embers";

interface ParticleData {
  id: number;
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
}

function Particle({
  data,
  color,
  opacity,
  variant,
}: {
  data: ParticleData;
  color: string;
  opacity: number;
  variant: Variant;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseY = data.position[1];

  useFrame((state) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    if (variant === "embers") {
      // brasas sobem lentamente e reaparecem embaixo — o ar do submundo
      m.position.y += data.speed * 0.01;
      if (m.position.y > baseY + 12) m.position.y = baseY - 2;
      m.position.x += Math.sin(t * data.speed + data.phase) * 0.002;
    } else {
      // bruma: deriva preguiçosa, como névoa no pico
      m.position.x += Math.sin(t * data.speed + data.phase) * 0.001;
      m.position.y += Math.cos(t * data.speed * 0.5) * 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} position={data.position}>
      <sphereGeometry args={[data.scale, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={variant === "embers" ? 1.4 : 0.6}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

interface CloudsProps {
  variant?: Variant;
  count?: number;
  color?: string;
  opacity?: number;
}

export function Clouds({
  variant = "mist",
  count = 30,
  color,
  opacity,
}: CloudsProps) {
  const resolvedColor = color ?? (variant === "embers" ? "#c4582a" : "#d8b85a");
  const resolvedOpacity = opacity ?? (variant === "embers" ? 0.5 : 0.18);

  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 + 3,
        (Math.random() - 0.5) * 20 - 5,
      ] as [number, number, number],
      scale: variant === "embers" ? Math.random() * 0.12 + 0.04 : Math.random() * 0.14 + 0.05,
      speed: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count, variant]);

  return (
    <group>
      {particles.map((p) => (
        <Particle key={p.id} data={p} color={resolvedColor} opacity={resolvedOpacity} variant={variant} />
      ))}
    </group>
  );
}
