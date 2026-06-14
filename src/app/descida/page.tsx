"use client";

import { useEffect } from "react";
import { DoorShell } from "@/cinematic/DoorShell";
import type { BackdropFrame } from "@/cinematic/RealmBackdrop";
import { Beat } from "@/cinematic/Beat";
import { GodStage } from "@/cinematic/GodStage";
import { getGod } from "@/data/gods";
import { preloadGodModel } from "@/components/canvas/GodModel";

/**
 * Porta 1 — A DESCIDA.
 * Conceito: você é um mortal descendo, fisicamente, do alto do Olimpo até
 * Hades. O scroll É a queda; o mundo se transforma sem corte. Cada deus é um
 * marco que a descida encontra. Sensação: viagem e gravidade rumo ao fim.
 */

// O fundo morfa de reino em reino conforme você desce (justificativa: dar lugar à queda).
const frames: BackdropFrame[] = [
  { src: "/scenes/olympus-sky.webp", at: 0.0, scrim: 0.34 },
  { src: "/scenes/clouds-descent.webp", at: 0.28, scrim: 0.4 },
  { src: "/scenes/mortal-world.webp", at: 0.5, scrim: 0.42 },
  { src: "/scenes/styx.webp", at: 0.72, scrim: 0.48 },
  { src: "/scenes/underworld.webp", at: 0.88, scrim: 0.55 },
];

export default function Descida() {
  const zeus = getGod("zeus")!;
  const hera = getGod("hera")!;
  const poseidon = getGod("poseidon")!;
  const demeter = getGod("demeter")!;
  const apolo = getGod("apolo")!;
  const hades = getGod("hades")!;

  // pré-carrega todas as estátuas da jornada para que já estejam prontas
  useEffect(() => {
    [zeus, hera, poseidon, demeter, apolo, hades].forEach((g) => preloadGodModel(g.modelPath));
  }, [zeus, hera, poseidon, demeter, apolo, hades]);

  return (
    <DoorShell frames={frames}>
      {/* Limiar — no alto de tudo */}
      <Beat
        tone="gold"
        kicker="A Descida"
        lines={[
          "Você chegou ao limite onde o mármore toca o céu, ao alto de tudo.",
          "A partir daqui, só há uma direção. Para baixo.",
        ]}
      />

      {/* O cume: o poder que governa de cima */}
      <GodStage god={zeus} side="left" preset="olympus" kicker="O Cume — Zeus governa de cima" />
      <GodStage god={hera} side="right" preset="olympus" kicker="Ao lado do trono" />

      {/* Atravessando as nuvens */}
      <Beat
        tone="light"
        lines={["Você desce. As nuvens se fecham, e o Olimpo desaparece atrás de você."]}
      />

      {/* O mundo dos vivos: forças que tocam a vida */}
      <GodStage god={poseidon} side="left" preset="godDark" kicker="As águas que cercam o mundo" />
      <GodStage god={demeter} side="right" preset="godLight" kicker="A terra que alimenta os vivos" />
      <GodStage god={apolo} side="left" preset="olympus" kicker="A última luz antes do escuro" />

      {/* O limiar do Estige */}
      <Beat
        tone="red"
        lines={[
          "O ar esfria. Surge uma margem de pedra e um rio que não devolve nenhum reflexo.",
          "É o Estige. Do outro lado, não há volta.",
        ]}
      />

      {/* O fundo: Hades */}
      <GodStage god={hades} side="right" preset="underworld" kicker="O fundo do mundo — Hades" />

      {/* Fecho */}
      <Beat
        tone="gold"
        kicker="O Fim da Queda"
        lines={["Toda descida termina aqui.", "Você chegou ao fundo do mundo, onde um dia todos chegam."]}
      />
    </DoorShell>
  );
}
