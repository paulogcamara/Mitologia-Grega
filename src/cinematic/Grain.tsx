"use client";

/**
 * Grão de filme + vinheta, fixos sobre tudo. Por quê: unifica as imagens
 * geradas, o 3D e o texto numa só "película", e dá textura cinematográfica.
 * Sensação: memória, mito, algo filmado e não renderizado. Como: vinheta
 * radial barata + ruído SVG sutil em multiply. pointer-events-none.
 */
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/></svg>`
  );

export function Grain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden>
      {/* vinheta */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
      {/* grão */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "160px 160px", opacity: 0.06 }}
      />
    </div>
  );
}
