"use client";

/**
 * Atmosfera sonora procedural — sem arquivos, fiel ao espírito do projeto
 * ("zero assets externos"). Um pad grave e um ar etéreo que MORFAM com o
 * scroll: claros e arejados no Olimpo, graves e fechados ao descer a Hades.
 *
 * Som é o atalho mais curto para emoção. Aqui ele sublinha a jornada sem
 * nunca chamar atenção para si. Mudo por padrão; só toca após gesto do
 * usuário (política de autoplay) e pode ser desligado a qualquer momento.
 */

type Ctx = AudioContext;

class AmbientEngine {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private airGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private drones: OscillatorNode[] = [];
  private noise: AudioBufferSourceNode | null = null;
  private enabled = false;
  private readonly targetVolume = 0.16;

  isEnabled() {
    return this.enabled;
  }

  /** Liga o áudio. Deve ser chamado a partir de um gesto do usuário. */
  enable() {
    if (this.enabled) return;
    try {
      this.build();
      this.enabled = true;
      const now = this.ctx!.currentTime;
      this.master!.gain.cancelScheduledValues(now);
      this.master!.gain.setValueAtTime(this.master!.gain.value, now);
      this.master!.gain.linearRampToValueAtTime(this.targetVolume, now + 1.5);
      void this.ctx!.resume();
    } catch {
      this.enabled = false;
    }
  }

  /** Desliga com fade e suspende o contexto. */
  disable() {
    if (!this.enabled || !this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.8);
    this.enabled = false;
    window.setTimeout(() => {
      if (!this.enabled) void this.ctx?.suspend();
    }, 900);
  }

  /**
   * Morfa o timbre conforme a posição na jornada.
   * @param darkness 0 = Olimpo (claro/arejado) … 1 = submundo (grave/fechado)
   */
  setScene(darkness: number) {
    if (!this.ctx || !this.filter || !this.airGain) return;
    const d = Math.min(1, Math.max(0, darkness));
    const now = this.ctx.currentTime;
    // filtro abre no alto e fecha embaixo
    const cutoff = 900 - d * 720; // 900Hz → 180Hz
    this.filter.frequency.setTargetAtTime(cutoff, now, 0.6);
    // o ar some conforme se desce
    const air = 0.5 - d * 0.42; // 0.5 → 0.08
    this.airGain.gain.setTargetAtTime(air, now, 0.6);
    // o pad afunda de tom
    const base = 55 - d * 11; // 55Hz → 44Hz
    if (this.drones[0]) this.drones[0].frequency.setTargetAtTime(base, now, 0.8);
    if (this.drones[1]) this.drones[1].frequency.setTargetAtTime(base * 1.5, now, 0.8);
  }

  private build() {
    if (this.ctx) return;
    const AC: typeof AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.master = master;

    // Pad grave: duas senoides em quinta, levemente desafinadas
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    filter.connect(master);
    this.filter = filter;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.7;
    droneGain.connect(filter);

    [55, 82.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = i === 0 ? -4 : 5;
      osc.connect(droneGain);
      osc.start();
      this.drones.push(osc);
    });

    // Ar etéreo: ruído rosa-ish filtrado, em loop
    const airGain = ctx.createGain();
    airGain.gain.value = 0.5;
    airGain.connect(filter);
    this.airGain = airGain;

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // filtro passa-baixa simples → ruído mais "macio" que branco puro
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const airBand = ctx.createBiquadFilter();
    airBand.type = "bandpass";
    airBand.frequency.value = 600;
    airBand.Q.value = 0.4;
    noise.connect(airBand);
    airBand.connect(airGain);
    noise.start();
    this.noise = noise;
  }
}

let engine: AmbientEngine | null = null;

export function getAmbient(): AmbientEngine {
  if (!engine) engine = new AmbientEngine();
  return engine;
}
