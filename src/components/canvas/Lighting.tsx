"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#e8d48b" />
      <pointLight position={[0, -3, 5]} intensity={0.5} color="#c9a84c" />
    </>
  );
}
