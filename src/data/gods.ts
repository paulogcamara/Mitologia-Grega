export interface God {
  id: string;
  name: string;
  greekName: string;
  title: string;
  domain: string;
  description: string;
  symbols: string[];
  colors: [string, string];
  emoji: string;
  realm: "olympus" | "underworld" | "sea";
  modelPath: string;
}

export const gods: God[] = [
  {
    id: "zeus",
    name: "Zeus",
    greekName: "Ζεύς",
    title: "Rei dos Deuses e Senhor do Olimpo",
    domain: "Trovão, Céu, Raios, Justiça",
    description:
      "O mais poderoso entre os Olímpicos. Zeus derrotou seu pai Cronos e os Titãs, dividindo o mundo com seus irmãos. Do topo do Monte Olimpo, governa deuses e mortais com seu raio inabalável, dispensando justiça e moldando o destino.",
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
    title: "Rainha dos Deuses e Protetora do Casamento",
    domain: "Casamento, Família, Nascimento",
    description:
      "Esposa e irmã de Zeus, Hera é a rainha do Olimpo. Protetora feroz do casamento e da fidelidade conjugal, sua fúria divina era temida por mortais e imortais. Seus olhos de vaca, símbolo de beleza na Grécia antiga, viam tudo.",
    symbols: ["Pavão", "Coroa", "Vaca", "Romã"],
    colors: ["#a855f7", "#c0c0c0"],
    emoji: "👑",
    realm: "olympus",
    modelPath: "/models/hera.glb",
  },
  {
    id: "poseidon",
    name: "Poseidon",
    greekName: "Ποσειδῶν",
    title: "Senhor dos Mares e Agitador da Terra",
    domain: "Mar, Terremotos, Cavalos",
    description:
      "Irmão de Zeus e governante dos oceanos, Poseidon comanda as marés e tempestades com seu tridente de poder devastador. Criador dos cavalos e causador de terremotos, seu temperamento instável reflete a própria natureza do mar.",
    symbols: ["Tridente", "Cavalo", "Golfinho", "Touro"],
    colors: ["#0ea5e9", "#2dd4bf"],
    emoji: "🔱",
    realm: "sea",
    modelPath: "/models/poseidon.glb",
  },
  {
    id: "atena",
    name: "Atena",
    greekName: "Ἀθηνᾶ",
    title: "Deusa da Sabedoria e da Guerra Estratégica",
    domain: "Sabedoria, Estratégia, Artesanato",
    description:
      "Nascida diretamente da cabeça de Zeus, já vestida com armadura completa, Atena é a encarnação da sabedoria e da estratégia militar. Padroeira de Atenas, ela venceu Poseidon pelo direito de proteger a cidade ao oferecer a oliveira.",
    symbols: ["Coruja", "Oliveira", "Escudo Égide", "Lança"],
    colors: ["#9ca3af", "#c9a84c"],
    emoji: "🦉",
    realm: "olympus",
    modelPath: "/models/athena_lemnia.glb",
  },
  {
    id: "apolo",
    name: "Apolo",
    greekName: "Ἀπόλλων",
    title: "Deus do Sol, da Música e da Profecia",
    domain: "Sol, Música, Poesia, Profecia, Cura",
    description:
      "O mais belo dos deuses, Apolo conduz a carruagem do sol pelo céu a cada dia. Senhor do Oráculo de Delfos, suas profecias moldaram o destino de heróis e nações. Sua lira produz a música que harmoniza o cosmos.",
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
    domain: "Caça, Lua, Natureza, Virgindade",
    description:
      "Irmã gêmea de Apolo, Ártemis percorre as florestas selvagens com seu bando de ninfas e seu arco de prata. Protetora dos animais e da virgindade, ela é tanto gentil com os inocentes quanto implacável com aqueles que a desrespeitam.",
    symbols: ["Arco de Prata", "Cervo", "Lua Crescente", "Cipreste"],
    colors: ["#c0c0c0", "#166534"],
    emoji: "🌙",
    realm: "olympus",
    modelPath: "/models/artemis_fountain.glb",
  },
  {
    id: "ares",
    name: "Ares",
    greekName: "Ἄρης",
    title: "Deus da Guerra e da Violência",
    domain: "Guerra, Violência, Carnificina",
    description:
      "Onde Atena representa a estratégia, Ares personifica a brutalidade crua da guerra. Temido e desprezado até pelos outros deuses, ele se deleita no caos do campo de batalha. Seu grito de guerra ecoa por todo o mundo mortal.",
    symbols: ["Lança", "Escudo", "Javali", "Abutre"],
    colors: ["#dc2626", "#1c1917"],
    emoji: "⚔️",
    realm: "olympus",
    modelPath: "/models/ares_ludovisi.glb",
  },
  {
    id: "afrodite",
    name: "Afrodite",
    greekName: "Ἀφροδίτη",
    title: "Deusa do Amor e da Beleza",
    domain: "Amor, Beleza, Desejo, Prazer",
    description:
      "Nascida da espuma do mar, Afrodite é a mais bela entre as imortais. Seu cinto mágico torna irresistível qualquer um que o use. Do amor mais terno à paixão mais devastadora, suas influências guiam o coração de deuses e mortais.",
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
    domain: "Fogo, Metalurgia, Artesanato, Vulcões",
    description:
      "O ferreiro divino, Hefesto forja na profundeza dos vulcões as armas e armaduras dos deuses. Criador de autômatos e maravilhas mecânicas, suas mãos imperfeitas produzem as obras mais perfeitas do cosmos — incluindo o raio de Zeus.",
    symbols: ["Martelo", "Bigorna", "Pinças", "Vulcão"],
    colors: ["#ea580c", "#6b7280"],
    emoji: "🔨",
    realm: "olympus",
    modelPath: "/models/vulcan.glb",
  },
  {
    id: "hermes",
    name: "Hermes",
    greekName: "Ἑρμῆς",
    title: "Mensageiro dos Deuses e Guia das Almas",
    domain: "Mensagens, Viajantes, Comércio, Ladrões",
    description:
      "O mais ágil e astuto dos Olímpicos, Hermes voa entre os reinos com suas sandálias aladas, levando mensagens de Zeus. Guia das almas ao submundo e patrono dos viajantes, comerciantes e — sim — também dos ladrões.",
    symbols: ["Caduceu", "Sandálias Aladas", "Petaso", "Tartaruga"],
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
    domain: "Vinho, Festa, Teatro, Loucura",
    description:
      "O mais jovem dos Olímpicos e o único com mãe mortal, Dionísio representa a libertação através do êxtase e da embriaguez. Deus do teatro e das festas, ele ensinou aos mortais o cultivo da vinha e os mistérios da transformação.",
    symbols: ["Videira", "Uva", "Tirso", "Leopardo"],
    colors: ["#7c3aed", "#22c55e"],
    emoji: "🍇",
    realm: "olympus",
    modelPath: "/models/marble_torso_from_a_statue_of_dionysos.glb",
  },
  {
    id: "demeter",
    name: "Deméter",
    greekName: "Δημήτηρ",
    title: "Deusa da Agricultura e das Estações",
    domain: "Agricultura, Colheita, Fertilidade, Estações",
    description:
      "Mãe de Perséfone, Deméter controla o ciclo das estações. Quando Hades raptou sua filha, seu luto mergulhou o mundo no inverno eterno. Seu amor maternal é tão vasto quanto os campos de trigo que abençoa — e sua fúria, tão devastadora quanto a fome.",
    symbols: ["Trigo", "Tocha", "Porco", "Cornucópia"],
    colors: ["#22c55e", "#ca8a04"],
    emoji: "🌾",
    realm: "olympus",
    modelPath: "/models/demeter_of_knidos.glb",
  },
  {
    id: "hestia",
    name: "Héstia",
    greekName: "Ἑστία",
    title: "Deusa do Lar e da Lareira Sagrada",
    domain: "Lar, Família, Lareira, Sacrifício",
    description:
      "A mais antiga dos Olímpicos e a mais pacífica, Héstia é a guardiã da chama sagrada do Olimpo. Cedeu seu trono a Dionísio para evitar conflito, preferindo manter a harmonia. Toda refeição dos mortais começava e terminava com uma oferenda a ela.",
    symbols: ["Lareira", "Chama", "Chaleira", "Círculo"],
    colors: ["#f59e0b", "#92400e"],
    emoji: "🔥",
    realm: "olympus",
    modelPath: "/models/parthenon_east_pediment_hestia.glb",
  },
  {
    id: "hades",
    name: "Hades",
    greekName: "ᾍδης",
    title: "Senhor do Submundo e dos Mortos",
    domain: "Morte, Submundo, Riquezas da Terra",
    description:
      "Irmão mais velho de Zeus, Hades governa o reino dos mortos com justiça sombria. Embora temido, não é mau — apenas implacável. Guardado pelo cão tricéfalo Cérbero e banhado pelas águas do rio Estige, seu reino é eterno e inevitável para todos os mortais.",
    symbols: ["Elmo da Invisibilidade", "Cérbero", "Cipreste", "Narciso"],
    colors: ["#581c87", "#1c1917"],
    emoji: "💀",
    realm: "underworld",
    modelPath: "/models/ethereal_hades.glb",
  },
];
