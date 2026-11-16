"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * Música ambiente gerada no browser (Web Audio): sem ficheiros nem direitos de autor.
 * - Acordes quentes que mudam a cada ~8 s, com ataque e saída lentos.
 * - Notas soltas de uma escala pentatónica, com eco.
 * - O filtro abre e fecha conforme a secção: mais luminoso nos projetos,
 *   mais fechado nas secções de leitura.
 * Os browsers só deixam tocar som depois de um clique, por isso começa desligado.
 */

const SoundContext = createContext({ on: false, toggle: () => {}, ready: false });
export const useSound = () => useContext(SoundContext);

const STORE_KEY = "df-som";
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Ré maior, com nonas e sextas: Dmaj9 · Bm9 · Gmaj9 · Asus
const CHORDS = [
  [50, 57, 61, 64, 66],
  [47, 54, 57, 61, 62],
  [43, 50, 54, 57, 62],
  [45, 52, 57, 59, 64],
];
const PENTA = [74, 76, 78, 81, 83, 86, 88];

// Brilho (frequência do filtro) por secção
const BRIGHTNESS = {
  "": 1400,
  "Sobre mim": 1100,
  Projetos: 2200,
  "Em campo": 2600,
  Percurso: 1000,
  "Antes do código": 1300,
  Método: 1000,
  Contacto: 1700,
};

function createEngine() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.4;

  // Eco simples com realimentação
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.48;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.38;
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(filter);

  filter.connect(master).connect(ctx.destination);

  let chordIndex = 0;
  let timers = [];
  let running = false;

  const pad = (when) => {
    const notes = CHORDS[chordIndex % CHORDS.length];
    chordIndex++;
    const dur = 9;
    notes.forEach((n, i) => {
      [-6, 6].forEach((detune) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.value = mtof(n);
        osc.detune.value = detune;
        const g = ctx.createGain();
        const peak = (i === 0 ? 0.07 : 0.035) / 2;
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(peak, when + 3);
        g.gain.setValueAtTime(peak, when + dur - 3.5);
        g.gain.linearRampToValueAtTime(0, when + dur + 0.5);
        osc.connect(g).connect(filter);
        g.connect(delay);
        osc.start(when);
        osc.stop(when + dur + 0.6);
      });
    });
  };

  const bell = () => {
    const t = ctx.currentTime + 0.05;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = mtof(PENTA[Math.floor(Math.random() * PENTA.length)]);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
    osc.connect(g);
    g.connect(filter);
    g.connect(delay);
    osc.start(t);
    osc.stop(t + 2.8);
  };

  const loop = () => {
    if (!running) return;
    pad(ctx.currentTime + 0.1);
    timers.push(setTimeout(loop, 8000));
  };
  const bells = () => {
    if (!running) return;
    if (Math.random() < 0.75) bell();
    timers.push(setTimeout(bells, 1400 + Math.random() * 2200));
  };

  return {
    async start() {
      if (ctx.state === "suspended") await ctx.resume();
      running = true;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.9, ctx.currentTime, 1.2);
      loop();
      timers.push(setTimeout(bells, 2500));
    },
    stop() {
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
    },
    brightness(hz) {
      filter.frequency.setTargetAtTime(hz, ctx.currentTime, 1.5);
    },
    // Pequeno "tic" para interações
    tick() {
      if (!running) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1320, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.03, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(g).connect(master);
      osc.start(t);
      osc.stop(t + 0.14);
    },
  };
}

export function SoundProvider({ children }) {
  const engine = useRef(null);
  const [on, setOn] = useState(false);
  const [prompt, setPrompt] = useState(false);

  // Mostra o convite só a quem ainda não escolheu
  useEffect(() => {
    let choice = null;
    try {
      choice = localStorage.getItem(STORE_KEY);
    } catch {}
    if (choice === null) {
      const id = setTimeout(() => setPrompt(true), 2500);
      return () => clearTimeout(id);
    }
  }, []);

  const remember = (v) => {
    try {
      localStorage.setItem(STORE_KEY, v);
    } catch {}
  };

  const setSound = useCallback(async (value) => {
    if (value) {
      if (!engine.current) engine.current = createEngine();
      if (!engine.current) return;
      await engine.current.start();
    } else {
      engine.current?.stop();
    }
    setOn(value);
    setPrompt(false);
    remember(value ? "on" : "off");
  }, []);

  const toggle = useCallback(() => setSound(!on), [on, setSound]);

  // Brilho conforme a secção + "tic" ao clicar em botões
  useEffect(() => {
    if (!on) return;
    const onSection = (e) => engine.current?.brightness(BRIGHTNESS[e.detail] ?? 1400);
    const onClick = (e) => {
      if (e.target.closest?.("button, a")) engine.current?.tick();
    };
    window.addEventListener("section-change", onSection);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("section-change", onSection);
      document.removeEventListener("click", onClick);
    };
  }, [on]);

  // Pausa quando o separador fica escondido
  useEffect(() => {
    if (!on) return;
    const onVis = () => (document.hidden ? engine.current?.stop() : engine.current?.start());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  return (
    <SoundContext.Provider value={{ on, toggle }}>
      {children}

      {/* Convite discreto, canto inferior esquerdo */}
      <div
        role="dialog"
        aria-label="Ligar o som"
        hidden={!prompt}
        className="glass fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-5 z-[70] w-[min(340px,calc(100vw-2.5rem))] bg-obsidian/85 p-5 text-ivory shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Esta página tem som</p>
        <p className="mt-2 text-sm text-smoke">
          Uma música ambiente que muda contigo ao longo da página. Fica melhor com auscultadores.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => setSound(true)}
            className="bg-champagne px-4 py-2 text-sm text-[#17130f] transition-colors hover:bg-ivory"
          >
            Ligar o som
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt(false);
              remember("off");
            }}
            className="px-3 py-2 text-sm text-smoke transition-colors hover:text-ivory"
          >
            Agora não
          </button>
        </div>
      </div>
    </SoundContext.Provider>
  );
}

/** Botão do cabeçalho: barras que dançam quando o som está ligado. */
export function SoundToggle() {
  const { on, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Desligar o som" : "Ligar o som"}
      className="group flex items-center gap-2.5"
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] bg-current ${on ? "sound-bar" : ""}`}
            style={{ height: on ? undefined : "3px", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{on ? "Som" : "Sem som"}</span>
    </button>
  );
}
