# Mitologia Grega — Experiência Imersiva 3D

Uma jornada visual interativa pelos reinos da mitologia grega, construída com **Next.js 16**, **React Three Fiber** e **GSAP**. Do Monte Olimpo ao submundo de Hades, o usuário navega por modelos 3D reais de esculturas clássicas enquanto uma narrativa mitológica se revela pelo scroll.

> **Status:** `v1.0` — projeto em evolução contínua. Veja a seção [Roadmap](#roadmap).

---

## 🎯 Sobre o Projeto

Projeto de portfólio pessoal com o objetivo de explorar o estado da arte em experiências web imersivas — combinando rendering 3D no navegador, animações scroll-driven e storytelling visual.

A experiência é dividida em três grandes atos:

1. **Ascensão ao Olimpo** — narrativa primordial com scroll-triggered reveal e um templo grego 3D sticky ao lado.
2. **Panteão dos Imortais** — seções full-screen dedicadas a cada um dos 12 deuses olímpicos + Héstia, com estátuas clássicas renderizadas em tempo real.
3. **Descida ao Submundo** — transição dramática para o reino de Hades, com contraste invertido (fundo claro, estátua sombria) para impacto visual.

---

## 🛠️ Stack Técnica

| Camada | Tecnologia |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| 3D Engine | [Three.js](https://threejs.org/) |
| 3D React | [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://drei.docs.pmnd.rs/) |
| Animações | [GSAP 3](https://gsap.com/) + ScrollTrigger |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Estilização | [Tailwind CSS v4](https://tailwindcss.com/) |
| Otimização 3D | [gltf-transform](https://gltf-transform.dev/) (Draco + WebP) |

### Tipografia
- **Cinzel** — títulos e elementos de destaque (inspiração clássica)
- **Cormorant Garamond** — corpo de texto narrativo

---

## ✨ Destaques Técnicos

- **Pipeline de otimização de modelos 3D**: Redução de **1.3GB → 80MB** (94% de compressão) via Draco geometry compression + WebP textures, preservando qualidade visual.
- **Lazy-loaded canvases**: Cada modelo 3D usa `IntersectionObserver` para montar apenas quando entra na viewport — contorna o limite de contextos WebGL simultâneos do navegador.
- **Auto-fit universal de modelos**: Uso combinado de `<Bounds>` e `<Center>` do drei para enquadrar qualquer modelo independente da geometria original, eliminando cortes ou zoom excessivo.
- **Scroll-triggered storytelling**: Cada parágrafo narrativo ocupa uma viewport completa, com fade in/out controlado por ScrollTrigger — enquanto um modelo 3D permanece sticky ao lado.
- **Tema visual adaptativo**: Fundos alternam entre escuro (`#0c0c14`) e claro (`#e8e4dc`) por seção, com texto que se adapta automaticamente ao contraste.

---

## 📁 Estrutura do Projeto

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Layout raiz + fontes + metadata
│   ├── page.tsx              # Composição das seções
│   └── globals.css           # Design tokens + Tailwind
├── components/
│   ├── canvas/               # Infraestrutura 3D (R3F)
│   │   ├── LazyCanvas.tsx    # Canvas com IntersectionObserver
│   │   ├── GodModel.tsx      # Wrapper com Bounds + Center
│   │   ├── TempleModel.tsx   # Templo sticky do Hero
│   │   └── Lighting.tsx      # Iluminação padrão
│   ├── sections/             # Seções do storytelling
│   │   ├── Hero.tsx          # Hero + narrativa (sticky 3D)
│   │   ├── Gods.tsx          # Container dos deuses
│   │   ├── Descent.tsx       # Transição ao submundo
│   │   ├── Underworld.tsx    # Seção do Hades
│   │   └── Footer.tsx        # Rodapé + redes
│   ├── gods/
│   │   └── GodCard.tsx       # Card full-screen de cada deus
│   └── ui/
│       ├── Loader.tsx        # Tela de carregamento
│       └── SmoothScrollProvider.tsx  # Wrapper do Lenis
├── data/
│   └── gods.ts               # Dados dos 13 deuses
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useSmoothScroll.ts
└── lib/
    └── gsap.ts               # Registro de plugins GSAP

public/
├── models/                   # Modelos 3D otimizados (.glb)
└── draco/                    # Decoder Draco (copiado do three)
```

---

## 🚀 Executando Localmente

**Pré-requisitos:** Node.js 20+ e npm.

```bash
# Instalar dependências
npm install

# Dev server com Turbopack
npm run dev

# Build de produção
npm run build
npm run start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🗺️ Roadmap

Como qualquer v1.0, há várias frentes planejadas para as próximas iterações:

- [ ] **Performance**: virtualização de seções fora da viewport, code splitting mais agressivo
- [ ] **Shaders customizados**: materiais procedurais para mármore, bronze e pátina nas estátuas
- [ ] **Post-processing**: bloom, vignette, chromatic aberration, god rays
- [ ] **Nuvens volumétricas** no Hero (Monte Olimpo envolto em brumas)
- [ ] **Responsividade mobile**: versão otimizada para dispositivos touch (atualmente é desktop-first)
- [ ] **Áudio imersivo**: ambiência sonora por seção (vento no Olimpo, sussurros no submundo)
- [ ] **Seção de heróis**: Hércules, Perseu, Aquiles, Odisseu
- [ ] **Criaturas mitológicas**: Cérbero, Minotauro, Pégaso
- [ ] **Internacionalização**: suporte para inglês e grego

---

## 📜 Créditos e Licenças

Este projeto utiliza modelos 3D sob licença **CC Attribution** e outros créditos listados em [`CREDITS.md`](./CREDITS.md).

O **código-fonte** deste repositório é distribuído sob a licença [MIT](./LICENSE).

---

## 👤 Autor

**Paulo Câmara** — Full Stack Developer

- 🌐 [paulocamara.pages.dev](https://paulocamara.pages.dev)
- 💼 [LinkedIn](https://linkedin.com/in/paulo-gabriel-c%C3%A2mara-406659339)
- 🐙 [GitHub](https://github.com/paulogcamara)

---

<p align="center">
  <em>"No pico mais alto da Grécia, além das nuvens e do alcance dos mortais, ergue-se a morada dos deuses."</em>
</p>
