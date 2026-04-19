"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

export function CameraController() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetY = useRef(2);
  const targetZ = useRef(10);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;

    // Camera moves down and closer as user scrolls
    targetY.current = THREE.MathUtils.lerp(5, -5, progress);
    targetZ.current = THREE.MathUtils.lerp(10, 6, Math.min(progress * 2, 1));

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY.current,
      0.05
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ.current,
      0.05
    );

    camera.lookAt(0, camera.position.y - 1, 0);
  });

  return null;
}
