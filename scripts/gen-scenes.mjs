/**
 * Gera os ambientes (céus/lugares) de cada reino para a v3.
 *
 * Cada imagem só existe porque um BEAT da jornada precisa daquele lugar — sem
 * lugar, a experiência flutua no preto. Estética clássica (dourado, mármore,
 * dark, grão de filme), nunca o azul-tech do DAS: por isso usamos o gerador
 * Gemini com --raw-style e prompt próprio. Fallback manual: Pollinations.
 *
 * Uso: node scripts/gen-scenes.mjs [nome-da-cena]   (sem arg = todas)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const GEN = "C:/Users/paulo.camara/Desktop/DAS/scripts/media/gen_image_gemini.py";
const OUT = path.resolve(import.meta.dirname, "..", "public", "scenes");
mkdirSync(OUT, { recursive: true });

const WARM =
  "cinematic matte painting, classical greek mythology, golden hour light, white marble and aged gold, " +
  "volumetric god rays, atmospheric haze, deep soft shadows, fine film grain, painterly epic scale, " +
  "muted desaturated palette with warm gold accents, no people, no text, no watermark";
const COLD =
  "cinematic matte painting, classical greek mythology underworld, cold pale light, black stone, " +
  "thick mist, faint ember-red glow in the distance, oppressive darkness, fine film grain, painterly epic scale, " +
  "desaturated cold palette, no people, no text, no watermark";

const SCENES = [
  {
    name: "olympus-sky",
    size: "hero",
    prompt:
      "Vast sky above the clouds at golden dawn, seen from the summit of Mount Olympus. " +
      "Distant silhouettes of white marble temples crowning cloud-wreathed peaks, warm light breaking through. " +
      WARM,
  },
  {
    name: "clouds-descent",
    size: "hero",
    prompt:
      "Descending through an endless sea of luminous clouds, soft diffuse light from above, " +
      "the world growing dim and distant far below, a vertiginous sense of falling. " +
      WARM,
  },
  {
    name: "mortal-world",
    size: "hero",
    prompt:
      "Aerial view of the ancient mortal world at dusk seen from high above thinning clouds, " +
      "distant mountain ranges, winding rivers, tiny temples and fields, fading warm light. " +
      WARM,
  },
  {
    name: "styx",
    size: "inline",
    prompt:
      "The dark river Styx in cold mist, black still water reflecting nothing, a worn stone shore, " +
      "a vast cavern mouth ahead, pale grey light, frozen silence and dread. " +
      COLD,
  },
  {
    name: "underworld",
    size: "inline",
    prompt:
      "A vast cathedral-like cavern of the underworld, immense unknowable scale, columns of black rock, " +
      "distant glowing embers and a faint red horizon, total oppressive darkness, the feeling of the end. " +
      COLD,
  },
  {
    name: "doors",
    size: "inline",
    prompt:
      "Three ancient weathered greek stone doorways standing side by side in darkness, carved meander motifs, " +
      "dramatic raking side light, mysterious and inviting, symmetrical composition, depth and shadow. " +
      WARM,
  },
];

const only = process.argv[2];
const list = only ? SCENES.filter((s) => s.name === only) : SCENES;

for (const s of list) {
  const out = path.join(OUT, `${s.name}.png`);
  console.log(`\n→ ${s.name} (${s.size})`);
  try {
    const stdout = execFileSync(
      "python",
      [GEN, "--prompt", s.prompt, "--out", out, "--size", s.size, "--raw-style"],
      { encoding: "utf-8", timeout: 200000 }
    );
    console.log(stdout.trim());
  } catch (e) {
    console.error(`FALHOU ${s.name}:`, e.stdout?.toString() || e.message);
  }
}
console.log("\nfim.");
