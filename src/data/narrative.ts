/**
 * Narrativa central de "A Jornada do Mortal".
 *
 * Toda a copy da experiência vive aqui, numa voz única: segunda pessoa,
 * presente, épica mas íntima. O visitante é o protagonista — um mortal que
 * sobe ao Olimpo, é levado à presença dos deuses, desce ao submundo e
 * retorna. Português acentuado, sem clichê. Estruturado para habilitar
 * i18n no futuro sem reescrever componentes.
 */

// ── Ato 0 — O Limiar ──────────────────────────────────────────────────
export const threshold = {
  // Mostrado no Loader, antes da primeira luz.
  loaderLine: "Antes da luz, havia o escuro.",
  title: ["MITOLOGIA", "GREGA"],
  subtitle: "Uma travessia pelos reinos dos deuses",
  // Convite que entrega o scroll ao visitante.
  invite: "Role para começar a subir",
};

// ── Ato I — A Origem (cosmogonia, no Hero) ────────────────────────────
// Cada beat ocupa uma tela. A luz cresce conforme você sobe.
export const cosmogony: string[] = [
  "No princípio, havia apenas o Caos: um vazio sem forma, sem luz, sem tempo.",
  "Do escuro nasceram Gaia, a Terra, e Urano, o Céu. Dos dois vieram os Titãs, colossos que reinaram por eras.",
  "Então Zeus, o mais novo dos filhos de Cronos, ergueu-se contra o pai. O universo tremeu na guerra a que os gregos chamaram Titanomaquia.",
  "Os Olímpicos venceram. O trovão selou o triunfo, e o Monte Olimpo tornou-se o trono eterno dos deuses.",
  "É para lá que você sobe agora. Acima das nuvens, longe do alcance dos mortais, o mármore reluz sob uma luz que nunca se apaga.",
];

// ── Ato II — O Panteão ────────────────────────────────────────────────
export const pantheon = {
  kicker: "Ato II — O Panteão",
  title: "Os Senhores do Olimpo",
  intro:
    "Um a um, os deuses se voltam para você. Não são estátuas atrás de um vidro: são as forças que moldaram este mundo, e que ainda movem o seu.",
};

export interface PantheonGroup {
  id: string;
  title: string;
  line: string;
}

// Os deuses não vêm soltos: vêm em pares e contrastes que contam algo.
export const pantheonGroups: PantheonGroup[] = [
  {
    id: "thrones",
    title: "O Trono e a Coroa",
    line: "No alto de tudo, os dois que repartiram o mundo e o governam.",
  },
  {
    id: "cycles",
    title: "As Águas e a Terra",
    line: "Os deuses de que depende toda vida: a fúria do mar e a paciência da colheita.",
  },
  {
    id: "mind-blade",
    title: "A Mente e a Lâmina",
    line: "Duas formas de guerra, irmãs e inimigas: a vitória pensada e a carnificina.",
  },
  {
    id: "twins",
    title: "O Sol e a Lua",
    line: "Os gêmeos que dividem o céu entre a luz do dia e o silêncio da caçada.",
  },
  {
    id: "desire-forge",
    title: "O Desejo e a Forja",
    line: "A beleza que incendeia e as mãos que constroem. Casados, e em guerra.",
  },
  {
    id: "messenger-ecstasy",
    title: "O Mensageiro e o Êxtase",
    line: "Os que cruzam fronteiras: entre os reinos, e dentro de você.",
  },
  {
    id: "hearth",
    title: "A Chama do Lar",
    line: "Antes da descida, a mais quieta de todos. A deusa que você já conhecia.",
  },
];

// ── Ato III — A Descida (a travessia do Estige) ───────────────────────
export const descent = {
  // Transição longa e deliberada: a luz imortal fica para trás.
  lines: [
    "Mas nem todos os reinos pertencem à luz.",
    "Abaixo da terra, além do rio Estige, espera o único deus que todo mortal um dia encontra.",
  ],
  cue: "Desça.",
};

// ── Ato IV — O Submundo ───────────────────────────────────────────────
export const underworld = {
  kicker: "Ato IV — O Submundo",
};

// ── Ato V — O Retorno ─────────────────────────────────────────────────
export const ret = {
  kicker: "Ato V — O Retorno",
  title: "E você volta",
  paragraphs: [
    "Nenhum mortal permanece entre os deuses. A luz do Olimpo e o frio de Hades ficam para trás, e você emerge de novo à superfície.",
    "Mas algo fica. Os mesmos deuses que moldaram este mundo ainda têm os nomes nos planetas, nos meses, nas palavras que você usa sem pensar. O mito não terminou: ele virou linguagem.",
    "Os gregos não inventaram os deuses para explicar o céu. Inventaram para explicar a si mesmos.",
  ],
  signature: "Uma jornada construída por Paulo Câmara",
};
