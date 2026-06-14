"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Atmosfera por ato. O post-processing não é enfeite: é o que faz a luz do
 * Olimpo "brilhar" e o frio de Hades "pesar". Calibrado por preset.
 *
 * - olympus: bloom quente generoso (a morada que reluz).
 * - godDark: bloom médio + vinheta suave (foco na estátua, sala escura).
 * - godLight: só bloom discreto (fundo claro não pede vinheta).
 * - underworld: bloom baixo + vinheta fria e pesada (o peso do fim).
 */
type Preset = "olympus" | "godDark" | "godLight" | "underworld";

const PRESETS: Record<
  Preset,
  { bloom: { intensity: number; threshold: number; smoothing: number }; vignette?: { darkness: number; offset: number } }
> = {
  olympus: { bloom: { intensity: 0.85, threshold: 0.55, smoothing: 0.9 } },
  godDark: { bloom: { intensity: 0.6, threshold: 0.7, smoothing: 0.85 }, vignette: { darkness: 0.55, offset: 0.32 } },
  godLight: { bloom: { intensity: 0.35, threshold: 0.82, smoothing: 0.9 } },
  underworld: { bloom: { intensity: 0.4, threshold: 0.62, smoothing: 0.8 }, vignette: { darkness: 0.75, offset: 0.22 } },
};

export function PostFX({ preset = "godDark", enabled = true }: { preset?: Preset; enabled?: boolean }) {
  if (!enabled) return null;
  const cfg = PRESETS[preset];

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={cfg.bloom.intensity}
        luminanceThreshold={cfg.bloom.threshold}
        luminanceSmoothing={cfg.bloom.smoothing}
        mipmapBlur
      />
      {cfg.vignette ? (
        <Vignette darkness={cfg.vignette.darkness} offset={cfg.vignette.offset} eskil={false} />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
}
