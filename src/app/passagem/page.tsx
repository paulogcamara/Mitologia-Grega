"use client";

import { useEffect } from "react";
import { DoorShell } from "@/cinematic/DoorShell";
import type { BackdropFrame } from "@/cinematic/RealmBackdrop";
import { Beat } from "@/cinematic/Beat";
import { GodStage } from "@/cinematic/GodStage";
import { getGod } from "@/data/gods";
import { preloadGodModel } from "@/components/canvas/GodModel";

/**
 * Porta 2 — A PASSAGEM DA ALMA.
 * Conceito: você morreu. Hermes te conduz, você cruza o Estige e é levado
 * diante das forças que pesaram a sua vida, até o trono de Hades. Voz em
 * segunda pessoa, íntima, ponderando. Sensação: perda e prestação de contas.
 */

// Começa no puro escuro (a morte), depois o Estige, depois o submundo.
const frames: BackdropFrame[] = [
  { src: "", at: 0.0, scrim: 0 },
  { src: "/scenes/styx.webp", at: 0.26, scrim: 0.5 },
  { src: "/scenes/underworld.webp", at: 0.6, scrim: 0.55 },
];

export default function Passagem() {
  const hermes = getGod("hermes")!;
  const atena = getGod("atena")!;
  const ares = getGod("ares")!;
  const afrodite = getGod("afrodite")!;
  const dionisio = getGod("dionisio")!;
  const hades = getGod("hades")!;

  useEffect(() => {
    [hermes, atena, ares, afrodite, dionisio, hades].forEach((g) => preloadGodModel(g.modelPath));
  }, [hermes, atena, ares, afrodite, dionisio, hades]);

  return (
    <DoorShell frames={frames}>
      {/* O último suspiro */}
      <Beat
        tone="light"
        kicker="A Passagem da Alma"
        lines={[
          "Seu último suspiro acabou de passar.",
          "Não há mais dor. Só o escuro, e uma voz que chama o seu nome.",
        ]}
      />

      {/* Hermes, o guia */}
      <GodStage
        god={hermes}
        side="left"
        preset="godDark"
        kicker="Quem veio por você"
        lines={[
          "Foi ele quem veio. Hermes, o guia das almas, que conhece de cor o caminho que você vai fazer agora.",
          "Dê a mão. Ele já levou por aqui todos os que vieram antes de você.",
        ]}
      />

      {/* A travessia */}
      <Beat
        tone="red"
        lines={[
          "Vocês chegam ao Estige. Caronte espera na barca.",
          "Pague a travessia e não olhe para a água. Do outro lado, não se volta.",
        ]}
      />

      {/* Os que te pesam — cada deus recita o que você foi */}
      <GodStage
        god={atena}
        side="right"
        preset="godDark"
        kicker="O que você soube"
        lines={["A sabedoria pesa a sua vida. Quanto dela foi razão, e quanto foi apenas orgulho fingindo ser razão?"]}
      />
      <GodStage
        god={ares}
        side="left"
        preset="godDark"
        kicker="O que você feriu"
        lines={["A violência reconhece a sua. Toda a raiva que você carregou e descarregou está aqui, anotada, sem desconto."]}
      />
      <GodStage
        god={afrodite}
        side="right"
        preset="godDark"
        kicker="O que você amou"
        lines={["O amor mede o que você deu e o que reteve por medo. Ninguém atravessa sem prestar essa conta."]}
      />
      <GodStage
        god={dionisio}
        side="left"
        preset="godDark"
        kicker="O que você viveu"
        lines={["O êxtase faz a pergunta mais simples e mais dura: você viveu de verdade, ou só atravessou a vida com medo dela?"]}
      />

      {/* O julgamento */}
      <GodStage
        god={hades}
        side="right"
        preset="underworld"
        kicker="O julgamento"
        lines={["Diante do trono, não há defesa nem acusação. Não há a quem apelar.", "Só o peso exato do que você foi, posto numa balança que não erra."]}
      />

      {/* O que fica */}
      <Beat
        tone="red"
        kicker="O Veredito"
        lines={["O veredito não vem em palavras. Vem em silêncio.", "E o silêncio, aqui, é para sempre."]}
      />
    </DoorShell>
  );
}
