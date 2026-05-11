#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, rmSync } from "node:fs";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "public", "models");
const OUT = join(ROOT, "public", "models");
const BAK = join(ROOT, "models-original-backup");
const TMP = join(ROOT, "public", "models-optimized");

const TEMPLE_PROFILE = {
  args: [
    "--compress", "draco",
    "--texture-compress", "webp",
    "--texture-size", "512",
    "--simplify-ratio", "0.05",
    "--simplify-error", "0.01",
    "--simplify-lock-border", "false",
  ],
};

const GOD_PROFILE = {
  args: [
    "--compress", "draco",
    "--texture-compress", "webp",
    "--texture-size", "1024",
    "--simplify-ratio", "0.5",
    "--simplify-error", "0.005",
  ],
};

const SMALL_PROFILE = {
  args: [
    "--compress", "draco",
    "--texture-compress", "webp",
    "--texture-size", "1024",
    "--simplify-ratio", "0.7",
    "--simplify-error", "0.002",
  ],
};

const DEAD = new Set(["greek_temple_scan.glb"]);

function profileFor(name, sizeMB) {
  if (name === "ancient_greek_temple.glb") return TEMPLE_PROFILE;
  if (sizeMB < 1.5) return SMALL_PROFILE;
  return GOD_PROFILE;
}

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
}

function optimize(input, output, profile) {
  const quote = (s) => `"${s}"`;
  const cmd = ["npx", "--no-install", "gltf-transform", "optimize", quote(input), quote(output), ...profile.args].join(" ");
  const result = spawnSync(cmd, { stdio: "pipe", shell: true, encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    throw new Error(`gltf-transform failed for ${basename(input)}`);
  }
}

function main() {
  if (!existsSync(BAK)) mkdirSync(BAK, { recursive: true });
  if (!existsSync(TMP)) mkdirSync(TMP, { recursive: true });

  const files = readdirSync(SRC).filter((f) => f.endsWith(".glb"));
  const rows = [];

  for (const file of files) {
    const inputPath = join(SRC, file);
    const tmpPath = join(TMP, file);
    const bakPath = join(BAK, file);
    const before = statSync(inputPath).size;
    const beforeMB = before / 1024 / 1024;

    if (DEAD.has(file)) {
      console.log(`▶ ${file} — DEAD, removing (${fmt(before)})`);
      if (!existsSync(bakPath)) copyFileSync(inputPath, bakPath);
      rmSync(inputPath);
      rows.push({ file, before: fmt(before), after: "REMOVED", saved: fmt(before) });
      continue;
    }

    const profile = profileFor(file, beforeMB);
    console.log(`▶ ${file} (${fmt(before)}) — optimizing…`);
    optimize(inputPath, tmpPath, profile);
    const after = statSync(tmpPath).size;

    if (!existsSync(bakPath)) copyFileSync(inputPath, bakPath);
    copyFileSync(tmpPath, join(OUT, file));
    rmSync(tmpPath);

    rows.push({
      file,
      before: fmt(before),
      after: fmt(after),
      saved: ((1 - after / before) * 100).toFixed(1) + "%",
    });
  }

  try { rmSync(TMP, { recursive: true, force: true }); } catch {}

  console.log("\n=== RESULTADO ===");
  console.table(rows);

  const totalBefore = rows.reduce((s, r) => {
    return s + parseFloat(r.before);
  }, 0);
  const totalAfter = rows.reduce((s, r) => {
    if (r.after === "REMOVED") return s;
    return s + parseFloat(r.after);
  }, 0);
  console.log(`\nTotal: ${totalBefore.toFixed(2)}MB → ${totalAfter.toFixed(2)}MB (${((1 - totalAfter/totalBefore)*100).toFixed(1)}% menor)`);
}

main();
