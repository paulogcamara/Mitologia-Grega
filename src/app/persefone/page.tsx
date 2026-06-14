"use client";

import { useEffect } from "react";
import { DoorShell } from "@/cinematic/DoorShell";
import type { BackdropFrame } from "@/cinematic/RealmBackdrop";
import { Beat } from "@/cinematic/Beat";
import { GodStage } from "@/cinematic/GodStage";
import { getGod } from "@/data/gods";
import { preloadGodModel } from "@/components/canvas/GodModel";

/**
 * Porta 3 — O MITO DE PERSÉFONE.
 * Conceito: a única história que costura os três mundos. O rapto, o luto de
 * Deméter, o inverno e o retorno — a origem das estações. Voz de narração,
 * lírica. Perséfone não tem estátua: é luz e ausência, sentida pela falta.
 * Arco: luz → escuro → luz. Sensação: amor, perda e reencontro.
 */

// O fundo faz o ciclo: primavera (mundo) → submundo → primavera de novo.
const frames: BackdropFrame[] = [
  { src: "/scenes/mortal-world.webp", at: 0.0, scrim: 0.32 },
  { src: "/scenes/underworld.webp", at: 0.42, scrim: 0.5 },
  { src: "/scenes/mortal-world.webp", at: 0.82, scrim: 0.32 },
];

export default function Persefone() {
  const demeter = getGod("demeter")!;
  const hades = getGod("hades")!;
  const zeus = getGod("zeus")!;
  const hermes = getGod("hermes")!;

  useEffect(() => {
    [demeter, hades, zeus, hermes].forEach((g) => preloadGodModel(g.modelPath));
  }, [demeter, hades, zeus, hermes]);

  return (
    <DoorShell frames={frames}>
      {/* I — A primavera eterna */}
      <Beat
        tone="gold"
        kicker="O Mito de Perséfone"
        lines={[
          "Houve um tempo em que o mundo não conhecia o inverno.",
          "Deméter, deusa da terra, tinha uma filha. Enquanto as duas riam juntas, tudo florescia.",
        ]}
      />
      <GodStage
        god={demeter}
        side="left"
        preset="godLight"
        kicker="A mãe"
        lines={[
          "Perséfone era a alegria de Deméter, e a alegria de Deméter era a primavera do mundo.",
          "Onde a filha pisava, nasciam flores. Seria assim para sempre, pensava a mãe.",
        ]}
      />

      {/* II — O rapto */}
      <Beat
        tone="light"
        lines={[
          "Perséfone colhia narcisos num campo, sozinha.",
          "Então a terra se abriu sem aviso.",
        ]}
      />
      <GodStage
        god={hades}
        side="right"
        preset="underworld"
        kicker="O rapto"
        lines={[
          "De dentro da fenda subiu Hades, senhor dos mortos, em sua carruagem negra.",
          "Levou Perséfone para o escuro antes que o grito dela alcançasse os céus.",
        ]}
      />

      {/* III — O luto e o inverno */}
      <Beat
        tone="red"
        lines={[
          "Deméter procurou a filha por nove dias e nove noites, tochas nas mãos, sem comer, sem dormir.",
          "Quando soube quem a levara, a deusa parou. E com ela parou o mundo.",
        ]}
      />
      <Beat
        tone="red"
        kicker="O Primeiro Inverno"
        lines={["As folhas caíram. Os campos secaram. A terra conheceu, pela primeira vez, o frio e a fome."]}
      />

      {/* IV — O acordo */}
      <GodStage
        god={zeus}
        side="left"
        preset="godDark"
        kicker="O acordo"
        lines={[
          "Zeus viu o mundo morrer de fome e ordenou que a moça voltasse.",
          "Mas Perséfone já provara seis sementes de romã no submundo. E quem come no reino dos mortos, a ele pertence em parte.",
        ]}
      />
      <GodStage
        god={hermes}
        side="right"
        preset="godDark"
        kicker="O mensageiro desce"
        lines={["Coube a Hermes descer e reconduzi-la à luz. Mas o pacto das sementes já estava selado: metade do ano em cima, metade embaixo."]}
      />

      {/* V — O retorno e o ciclo */}
      <Beat
        tone="gold"
        kicker="O Retorno"
        lines={[
          "Seis meses no alto, ao lado da mãe, e o mundo floresce.",
          "Seis meses embaixo, ao lado de Hades, e o mundo adormece.",
        ]}
      />
      <Beat
        tone="gold"
        lines={[
          "Toda primavera é Perséfone subindo de volta.",
          "Todo inverno é uma mãe sentindo falta da filha.",
        ]}
      />
    </DoorShell>
  );
}
