export interface God {
  id: string;
  name: string;
  greekName: string;
  /** Título formal (ex.: "Rei dos Deuses e Senhor do Olimpo"). */
  title: string;
  /** Epíteto curto e poético, usado como abertura da audiência. */
  epithet: string;
  domain: string;
  /** Essência: quem o deus é, em poucas linhas. */
  description: string;
  /** Um mito específico e vivo — a história que fica, não a definição. */
  myth: string;
  /** Uma única linha memorável, dirigida ao mortal que visita. */
  pullQuote: string;
  /** Registro emocional que guia luz, cor e movimento da cena. */
  mood: string;
  /** Agrupamento narrativo do panteão (ver narrative.ts). */
  group: string;
  /** Fio que conecta este deus aos outros (rivalidade, amor, parentesco). */
  relations?: string;
  symbols: string[];
  colors: [string, string];
  emoji: string;
  realm: "olympus" | "underworld" | "sea";
  modelPath: string;
}

// Ordem = a ordem da jornada (audiências do panteão). Hades fica fora do
// panteão: ele é o Ato IV, o destino que a jornada vinha adiando.
export const gods: God[] = [
  // ── O Trono e a Coroa ───────────────────────────────────────────────
  {
    id: "zeus",
    name: "Zeus",
    greekName: "Ζεύς",
    title: "Rei dos Deuses e Senhor do Olimpo",
    epithet: "O Senhor do Raio",
    domain: "Trovão, Céu, Justiça",
    description:
      "O mais poderoso entre os Olímpicos. Derrotou o pai, Cronos, e os Titãs, e repartiu o mundo com os irmãos: o céu coube a ele. Do alto do Olimpo, governa deuses e mortais com um raio que ninguém ousa enfrentar.",
    myth:
      "Engoliu a primeira esposa, Métis, com medo de gerar um filho que o superasse. Por isso Atena nasceu já adulta e armada de dentro da própria cabeça dele. Seus amores encheram o mundo de heróis, e a Hera, de fúria.",
    pullQuote: "Toda ordem do mundo começa onde cai o seu raio.",
    mood: "majestade",
    group: "thrones",
    relations: "Irmão de Poseidon e Hades. Marido e tormento de Hera. Pai de quase todos.",
    symbols: ["Raio", "Águia", "Cetro", "Carvalho"],
    colors: ["#c9a84c", "#3b82f6"],
    emoji: "⚡",
    realm: "olympus",
    modelPath: "/models/zeus.glb",
  },
  {
    id: "hera",
    name: "Hera",
    greekName: "Ἥρα",
    title: "Rainha dos Deuses e Guardiã do Casamento",
    epithet: "A Rainha que tudo vê",
    domain: "Casamento, Família, Poder",
    description:
      "Esposa e irmã de Zeus, rainha do Olimpo. Guardiã do casamento e do juramento conjugal, sua vingança contra as amantes do marido e os filhos delas atravessa toda a mitologia.",
    myth:
      "Perseguiu Héracles desde o berço, enviando serpentes ao seu quarto. Mas foi do leite derramado de seu próprio peito que nasceu a faixa de estrelas a que chamamos Via Láctea.",
    pullQuote: "Faça um juramento. Ela está ouvindo.",
    mood: "ciúme régio",
    group: "thrones",
    relations: "Rainha ao lado de Zeus, e sua rival eterna pelos amores dele.",
    symbols: ["Pavão", "Coroa", "Vaca", "Romã"],
    colors: ["#a855f7", "#c0c0c0"],
    emoji: "👑",
    realm: "olympus",
    modelPath: "/models/hera.glb",
  },

  // ── As Águas e a Terra ──────────────────────────────────────────────
  {
    id: "poseidon",
    name: "Poseidon",
    greekName: "Ποσειδῶν",
    title: "Senhor dos Mares e Agitador da Terra",
    epithet: "Aquele que sacode a terra",
    domain: "Mar, Terremotos, Cavalos",
    description:
      "Irmão de Zeus e senhor dos oceanos. Com um golpe do tridente abre tempestades, faz nascer cavalos da espuma e racha a terra em terremotos. Seu humor é o próprio mar: calmo num instante, devastador no seguinte.",
    myth:
      "Disputou Atenas com Atena. Ele ofereceu uma fonte; ela, a oliveira. A cidade escolheu a deusa, e o deus nunca esqueceu a afronta: a ira dele perseguiu Odisseu por dez anos de volta para casa.",
    pullQuote: "Reze antes de zarpar. O mar pertence a ele.",
    mood: "tempestade",
    group: "cycles",
    relations: "Um dos três irmãos que dividiram o mundo. Rival de Atena por Atenas.",
    symbols: ["Tridente", "Cavalo", "Golfinho", "Touro"],
    colors: ["#0ea5e9", "#2dd4bf"],
    emoji: "🔱",
    realm: "sea",
    modelPath: "/models/poseidon.glb",
  },
  {
    id: "demeter",
    name: "Deméter",
    greekName: "Δημήτηρ",
    title: "Deusa da Agricultura e das Estações",
    epithet: "A Mãe das colheitas",
    domain: "Colheita, Fertilidade, Estações",
    description:
      "Senhora da terra cultivada. Onde ela caminha, o trigo cresce; quando ela chora, o mundo inteiro congela.",
    myth:
      "Quando Hades raptou sua filha Perséfone para o submundo, Deméter parou toda colheita e trouxe o primeiro inverno. O acordo que devolve a filha por parte do ano é a razão de a primavera sempre voltar.",
    pullQuote: "Cada primavera é uma mãe reencontrando a filha.",
    mood: "luto fértil",
    group: "cycles",
    relations: "Mãe de Perséfone, a rainha do submundo. O fio que liga o Olimpo a Hades.",
    symbols: ["Trigo", "Tocha", "Porco", "Cornucópia"],
    colors: ["#22c55e", "#ca8a04"],
    emoji: "🌾",
    realm: "olympus",
    modelPath: "/models/demeter_of_knidos.glb",
  },

  // ── A Mente e a Lâmina ──────────────────────────────────────────────
  {
    id: "atena",
    name: "Atena",
    greekName: "Ἀθηνᾶ",
    title: "Deusa da Sabedoria e da Guerra Estratégica",
    epithet: "A de olhos glaucos",
    domain: "Sabedoria, Estratégia, Ofício",
    description:
      "Nascida adulta e armada da cabeça de Zeus. Sabedoria, estratégia e o domínio das mãos. Onde Ares ama a carnificina, Atena ama a vitória pensada.",
    myth:
      "Aracne, uma mortal, ousou desafiá-la na tecelagem — e tecia bem demais. Atena a transformou em aranha, condenada a fiar para sempre. A deusa da razão também conhece o orgulho.",
    pullQuote: "A guerra que se vence começa na mente, não na lâmina.",
    mood: "clareza fria",
    group: "mind-blade",
    relations: "O oposto exato de Ares. Venceu Poseidon pelo direito a Atenas.",
    symbols: ["Coruja", "Oliveira", "Égide", "Lança"],
    colors: ["#9ca3af", "#c9a84c"],
    emoji: "🦉",
    realm: "olympus",
    modelPath: "/models/athena_lemnia.glb",
  },
  {
    id: "ares",
    name: "Ares",
    greekName: "Ἄρης",
    title: "Deus da Guerra e da Violência",
    epithet: "O flagelo dos mortais",
    domain: "Guerra, Violência, Carnificina",
    description:
      "A guerra sem estratégia: o sangue, o grito, o caos do campo de batalha. Temido e desprezado até pelos próprios deuses, que preferem a frieza de Atena.",
    myth:
      "Amante de Afrodite, foi apanhado com ela numa rede invisível forjada por Hefesto, o marido traído, e exposto ao riso de todo o Olimpo. Nem o deus da guerra escapa da humilhação.",
    pullQuote: "Ele não escolhe lados. Só quer que a batalha continue.",
    mood: "fúria",
    group: "mind-blade",
    relations: "Espelho violento de Atena. Amante de Afrodite, rival de Hefesto.",
    symbols: ["Lança", "Escudo", "Javali", "Abutre"],
    colors: ["#dc2626", "#1c1917"],
    emoji: "⚔️",
    realm: "olympus",
    modelPath: "/models/ares_ludovisi.glb",
  },

  // ── O Sol e a Lua ───────────────────────────────────────────────────
  {
    id: "apolo",
    name: "Apolo",
    greekName: "Ἀπόλλων",
    title: "Deus do Sol, da Música e da Profecia",
    epithet: "O que vê o que virá",
    domain: "Sol, Música, Profecia, Cura",
    description:
      "Sol, música, poesia, cura e profecia. O mais belo dos deuses, senhor do oráculo de Delfos, cuja lira afina o próprio cosmos.",
    myth:
      "Perseguiu a ninfa Dafne, que, para escapar dele, virou loureiro entre seus braços. Desde então ele usa os louros — a coroa da vitória, feita de um amor que se perdeu.",
    pullQuote: "Ele cura e ele fere com a mesma flecha.",
    mood: "luz serena",
    group: "twins",
    relations: "Irmão gêmeo de Ártemis: o dia ao lado da noite.",
    symbols: ["Lira", "Arco de Prata", "Sol", "Louros"],
    colors: ["#eab308", "#f97316"],
    emoji: "☀️",
    realm: "olympus",
    modelPath: "/models/apollo.glb",
  },
  {
    id: "artemis",
    name: "Ártemis",
    greekName: "Ἄρτεμις",
    title: "Deusa da Caça e da Lua",
    epithet: "A senhora das feras",
    domain: "Caça, Lua, Natureza",
    description:
      "Irmã gêmea de Apolo. Caçadora das florestas selvagens, protetora dos animais e das jovens. Gentil com os inocentes, impiedosa com quem cruza seus limites.",
    myth:
      "O caçador Actéon a viu banhando-se nua na floresta. Por isso ela o transformou em cervo, e os próprios cães dele o caçaram e despedaçaram. Ninguém vê a deusa sem ser convidado.",
    pullQuote: "A floresta é o templo dela. Pise com respeito.",
    mood: "lua selvagem",
    group: "twins",
    relations: "Irmã gêmea de Apolo.",
    symbols: ["Arco de Prata", "Cervo", "Lua Crescente", "Cipreste"],
    colors: ["#c0c0c0", "#166534"],
    emoji: "🌙",
    realm: "olympus",
    modelPath: "/models/artemis_fountain.glb",
  },

  // ── O Desejo e a Forja ──────────────────────────────────────────────
  {
    id: "afrodite",
    name: "Afrodite",
    greekName: "Ἀφροδίτη",
    title: "Deusa do Amor e da Beleza",
    epithet: "Nascida da espuma",
    domain: "Amor, Beleza, Desejo",
    description:
      "Surgiu adulta da espuma do mar. A beleza a que ninguém resiste e o desejo que move deuses, mortais e guerras. Seu cinto torna irresistível quem o veste.",
    myth:
      "Prometeu a Páris a mulher mais bela do mundo — e entregou-lhe Helena, já casada. Com isso acendeu a Guerra de Troia. O amor que ela concede sempre cobra um preço.",
    pullQuote: "O coração que ela toca não volta a ser o mesmo.",
    mood: "desejo",
    group: "desire-forge",
    relations: "Casada com Hefesto. Amante de Ares. O triângulo mais famoso do Olimpo.",
    symbols: ["Pomba", "Rosa", "Concha", "Espelho"],
    colors: ["#ec4899", "#c9a84c"],
    emoji: "🌹",
    realm: "olympus",
    modelPath: "/models/aphrodite.glb",
  },
  {
    id: "hefesto",
    name: "Hefesto",
    greekName: "Ἥφαιστος",
    title: "Deus do Fogo e da Forja",
    epithet: "O ferreiro dos deuses",
    domain: "Fogo, Metalurgia, Ofício",
    description:
      "O único deus imperfeito: coxo, rejeitado e atirado do Olimpo ao nascer. Nas forjas sob os vulcões, suas mãos tortas criam as obras mais perfeitas do cosmos — o raio de Zeus, a armadura de Aquiles, autômatos de bronze.",
    myth:
      "Traído por Afrodite, não revidou com violência, mas com engenho: teceu uma rede de fios finos demais para a vista e prendeu os amantes diante de todo o Olimpo. A vingança do artesão é feita à mão.",
    pullQuote: "O que o Olimpo despreza, a forja transforma em arte.",
    mood: "brasa",
    group: "desire-forge",
    relations: "Marido traído de Afrodite. Forjou as armas de quase todos os deuses.",
    symbols: ["Martelo", "Bigorna", "Pinças", "Vulcão"],
    colors: ["#ea580c", "#6b7280"],
    emoji: "🔨",
    realm: "olympus",
    modelPath: "/models/vulcan.glb",
  },

  // ── O Mensageiro e o Êxtase ─────────────────────────────────────────
  {
    id: "hermes",
    name: "Hermes",
    greekName: "Ἑρμῆς",
    title: "Mensageiro dos Deuses e Guia das Almas",
    epithet: "O guia das almas",
    domain: "Mensagens, Viajantes, Comércio",
    description:
      "O mais rápido e astuto dos Olímpicos. Com sandálias aladas, leva as mensagens de Zeus, protege viajantes e mercadores — e conduz as almas dos mortos até a porta do submundo.",
    myth:
      "No próprio dia em que nasceu, fugiu do berço, roubou o gado de Apolo e inventou a lira com o casco de uma tartaruga. Tinha poucas horas de vida.",
    pullQuote: "Quando você morrer, é a mão dele que vai te guiar.",
    mood: "astúcia veloz",
    group: "messenger-ecstasy",
    relations: "O único que transita livre entre o Olimpo e o submundo. A ponte para o que vem.",
    symbols: ["Caduceu", "Sandálias Aladas", "Pétaso", "Tartaruga"],
    colors: ["#38bdf8", "#c9a84c"],
    emoji: "🪽",
    realm: "olympus",
    modelPath: "/models/hermes.glb",
  },
  {
    id: "dionisio",
    name: "Dionísio",
    greekName: "Διόνυσος",
    title: "Deus do Vinho e do Êxtase",
    epithet: "O deus duas vezes nascido",
    domain: "Vinho, Teatro, Loucura",
    description:
      "O mais jovem dos Olímpicos e o único filho de mãe mortal. Vinho, teatro, festa e a loucura que liberta. Ensinou os homens a cultivar a videira e a perder o medo de si mesmos.",
    myth:
      "Arrancado do ventre da mãe morta e costurado na coxa de Zeus até nascer pela segunda vez. Quem nasce duas vezes não teme a transformação.",
    pullQuote: "Ele liberta — e a liberdade nem sempre é gentil.",
    mood: "êxtase",
    group: "messenger-ecstasy",
    relations: "Ocupa no Olimpo o trono que Héstia cedeu para manter a paz.",
    symbols: ["Videira", "Uva", "Tirso", "Leopardo"],
    colors: ["#7c3aed", "#22c55e"],
    emoji: "🍇",
    realm: "olympus",
    modelPath: "/models/marble_torso_from_a_statue_of_dionysos.glb",
  },

  // ── A Chama do Lar ──────────────────────────────────────────────────
  {
    id: "hestia",
    name: "Héstia",
    greekName: "Ἑστία",
    title: "Deusa do Lar e da Lareira Sagrada",
    epithet: "A chama que não se apaga",
    domain: "Lar, Família, Lareira",
    description:
      "A mais velha e a mais serena dos Olímpicos. Guardiã do fogo do lar e do altar. Abriu mão do próprio trono para evitar conflito, e por isso toda casa e toda cidade começavam o dia acendendo a chama dela.",
    myth:
      "Não tem raptos, guerras ou vinganças. Sua história é o fogo aceso no centro de cada casa: o deus que você encontra todo dia sem perceber.",
    pullQuote: "Antes de subir ao Olimpo, você já a conhecia. É o fogo da sua casa.",
    mood: "quietude",
    group: "hearth",
    relations: "Cedeu seu trono a Dionísio para manter a harmonia entre os deuses.",
    symbols: ["Lareira", "Chama", "Altar", "Círculo"],
    colors: ["#f59e0b", "#92400e"],
    emoji: "🔥",
    realm: "olympus",
    modelPath: "/models/parthenon_east_pediment_hestia.glb",
  },

  // ── O Submundo (Ato IV — fora do panteão) ───────────────────────────
  {
    id: "hades",
    name: "Hades",
    greekName: "ᾍδης",
    title: "Senhor do Submundo e dos Mortos",
    epithet: "O senhor implacável",
    domain: "Morte, Submundo, Riquezas da Terra",
    description:
      "O irmão mais velho de Zeus. Não é o mal — é o fim. Governa os mortos com justiça fria, guardado por Cérbero, o cão de três cabeças, e cercado pelas águas do rio Estige. Para ele, todo mortal um dia desce.",
    myth:
      "Raptou Perséfone e a fez rainha do submundo. Deu-lhe a comer seis sementes de romã, e por isso ela passa seis meses do ano ao lado dele — e a terra, nesse tempo, adormece em inverno.",
    pullQuote: "Você não escolhe encontrá-lo. Só escolhe quando.",
    mood: "solenidade fria",
    group: "underworld",
    relations: "O terceiro irmão. O destino que a jornada inteira vinha adiando.",
    symbols: ["Elmo da Invisibilidade", "Cérbero", "Cipreste", "Narciso"],
    colors: ["#581c87", "#1c1917"],
    emoji: "💀",
    realm: "underworld",
    modelPath: "/models/ethereal_hades.glb",
  },
];

/** Os deuses do panteão (Ato II), na ordem da jornada. Exclui Hades. */
export const pantheon: God[] = gods.filter((g) => g.group !== "underworld");

/** Busca rápida por id. */
export function getGod(id: string): God | undefined {
  return gods.find((g) => g.id === id);
}
