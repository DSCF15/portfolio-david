"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * Playlist do portefólio.
 * - Três faixas geradas no browser com Web Audio (sem ficheiros nem direitos de autor):
 *   dois ambientes e um house.
 * - Uma faixa de terceiros tocada no leitor oficial do Spotify (embed), que é a forma
 *   legal de a ter num site público.
 * O filtro principal abre e fecha conforme a secção da página.
 * Os browsers só deixam tocar som depois de um clique, por isso começa desligado.
 */

export const TRACKS = [
  { id: "basalto", title: "Basalto", kind: "Ambiente", engine: "ambient-a" },
  { id: "nevoeiro", title: "Nevoeiro", kind: "Ambiente", engine: "ambient-b" },
  { id: "canico", title: "Caniço 122", kind: "House", engine: "house" },
  {
    id: "kanye",
    title: "No Child Left Behind",
    artist: "Kanye West",
    kind: "Spotify",
    spotify: "3hd6zLhnTlbJ8PupYt3cAI",
  },
];

const STORE_KEY = "df-som";
const TRACK_KEY = "df-faixa";
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Brilho (frequência do filtro principal) por secção
const BRIGHTNESS = {
  "": 1600,
  "Sobre mim": 1200,
  Projetos: 2400,
  "Em campo": 3200,
  Percurso: 1100,
  "Antes do código": 1500,
  Método: 1100,
  Contacto: 1900,
};

/* ───────────────────────── Motor partilhado ───────────────────────── */

function createMixer() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  filter.Q.value = 0.5;

  // Eco partilhado
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.48;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.36;
  const wet = ctx.createGain();
  wet.gain.value = 0.3;
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(filter);

  filter.connect(comp).connect(master).connect(ctx.destination);

  // Ruído branco reutilizável (pratos, palmas)
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  return { ctx, master, filter, delay, noise };
}

/* ───────────────────────── Ambientes ───────────────────────── */

const AMBIENT_PRESETS = {
  // Ré maior com nonas: quente e aberto
  "ambient-a": {
    chords: [
      [50, 57, 61, 64, 66],
      [47, 54, 57, 61, 62],
      [43, 50, 54, 57, 62],
      [45, 52, 57, 59, 64],
    ],
    bells: [74, 76, 78, 81, 83, 86, 88],
    chordEvery: 8000,
    attack: 3,
    delayTime: 0.48,
    bellChance: 0.75,
  },
  // Mi menor, mais lento e escuro, como nevoeiro
  "ambient-b": {
    chords: [
      [40, 52, 55, 59, 62, 66],
      [36, 48, 52, 55, 59, 64],
      [43, 50, 55, 59, 62, 64],
      [38, 50, 54, 57, 61, 64],
    ],
    bells: [64, 67, 69, 71, 74, 76],
    chordEvery: 11000,
    attack: 4.5,
    delayTime: 0.72,
    bellChance: 0.5,
  },
};

function createAmbient(mix, presetName) {
  const { ctx, filter, delay } = mix;
  const p = AMBIENT_PRESETS[presetName];
  let chordIndex = 0;
  let timers = [];
  let running = false;
  const bus = ctx.createGain();
  bus.gain.value = 0;
  bus.connect(filter);

  const pad = (when) => {
    const notes = p.chords[chordIndex++ % p.chords.length];
    const dur = p.chordEvery / 1000 + 1;
    notes.forEach((n, i) => {
      [-6, 6].forEach((detune) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.value = mtof(n);
        osc.detune.value = detune;
        const g = ctx.createGain();
        const peak = (i === 0 ? 0.07 : 0.032) / 2;
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(peak, when + p.attack);
        g.gain.setValueAtTime(peak, when + dur - p.attack);
        g.gain.linearRampToValueAtTime(0, when + dur + 0.5);
        osc.connect(g);
        g.connect(bus);
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
    osc.frequency.value = mtof(p.bells[Math.floor(Math.random() * p.bells.length)]);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
    osc.connect(g);
    g.connect(bus);
    g.connect(delay);
    osc.start(t);
    osc.stop(t + 3);
  };

  const loop = () => {
    if (!running) return;
    pad(ctx.currentTime + 0.1);
    timers.push(setTimeout(loop, p.chordEvery));
  };
  const bells = () => {
    if (!running) return;
    if (Math.random() < p.bellChance) bell();
    timers.push(setTimeout(bells, 1400 + Math.random() * 2400));
  };

  return {
    start() {
      running = true;
      delay.delayTime.setTargetAtTime(p.delayTime, ctx.currentTime, 0.3);
      bus.gain.setTargetAtTime(1, ctx.currentTime, 0.8);
      loop();
      timers.push(setTimeout(bells, 2500));
    },
    stop() {
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
      bus.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      setTimeout(() => bus.disconnect(), 3000);
    },
  };
}

/* ───────────────────────── House (122 BPM) ───────────────────────── */

function createHouse(mix) {
  const { ctx, filter, delay, noise } = mix;
  const BPM = 122;
  const step = 60 / BPM / 4; // semicolcheia
  const bus = ctx.createGain();
  bus.gain.value = 0;
  bus.connect(filter);

  // Lá menor 7 · Fá maior 7 · Dó maior 7 · Sol 6, um compasso cada
  const progression = [
    { root: 45, chord: [57, 60, 64, 67] },
    { root: 41, chord: [57, 60, 64, 65] },
    { root: 48, chord: [55, 59, 60, 64] },
    { root: 43, chord: [55, 59, 62, 64] },
  ];
  const bassPattern = [0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1];
  const stabPattern = [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0];

  let nextTime = 0;
  let stepIndex = 0;
  let timer = null;

  const kick = (t) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
    o.connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.45);
  };

  const noiseHit = (t, { type, freq, q = 1, gain, decay }) => {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    src.connect(f).connect(g).connect(bus);
    src.start(t, Math.random() * 0.5);
    src.stop(t + decay + 0.02);
    return g;
  };

  const bass = (t, note) => {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = mtof(note);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(700, t);
    f.frequency.exponentialRampToValueAtTime(180, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.22, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(f).connect(g).connect(bus);
    o.start(t);
    o.stop(t + 0.25);
  };

  const stab = (t, notes) => {
    notes.forEach((n) => {
      const o = ctx.createOscillator();
      o.type = "square";
      o.frequency.value = mtof(n);
      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(2200, t);
      f.frequency.exponentialRampToValueAtTime(500, t + 0.2);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.025, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.26);
      o.connect(f).connect(g);
      g.connect(bus);
      g.connect(delay);
      o.start(t);
      o.stop(t + 0.3);
    });
  };

  const schedule = (s, t) => {
    const bar = Math.floor(s / 16) % progression.length;
    const pos = s % 16;
    const { root, chord } = progression[bar];
    if (pos % 4 === 0) kick(t);
    if (pos === 4 || pos === 12) noiseHit(t, { type: "bandpass", freq: 1500, q: 0.8, gain: 0.35, decay: 0.16 });
    if (pos % 4 === 2) noiseHit(t, { type: "highpass", freq: 7500, gain: 0.16, decay: 0.12 });
    else if (pos % 2 === 1) noiseHit(t, { type: "highpass", freq: 9000, gain: 0.05, decay: 0.04 });
    if (bassPattern[pos]) bass(t, root - 12 + (pos === 14 ? 12 : 0));
    if (stabPattern[pos]) stab(t, chord);
  };

  const tick = () => {
    while (nextTime < ctx.currentTime + 0.12) {
      schedule(stepIndex, nextTime);
      nextTime += step;
      stepIndex++;
    }
  };

  return {
    start() {
      delay.delayTime.setTargetAtTime(step * 3, ctx.currentTime, 0.2);
      nextTime = ctx.currentTime + 0.1;
      stepIndex = 0;
      bus.gain.setTargetAtTime(0.85, ctx.currentTime, 0.3);
      timer = setInterval(tick, 25);
    },
    stop() {
      clearInterval(timer);
      bus.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      setTimeout(() => bus.disconnect(), 2000);
    },
  };
}

/* ───────────────────────── Contexto React ───────────────────────── */

const SoundContext = createContext(null);
export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }) {
  const mix = useRef(null);
  const current = useRef(null); // motor gerado a tocar
  const [on, setOn] = useState(false);
  const [trackId, setTrackId] = useState(TRACKS[0].id);
  const [prompt, setPrompt] = useState(false);
  const [panel, setPanel] = useState(false);

  // Convite só para quem ainda não escolheu; recupera a última faixa
  useEffect(() => {
    let choice = null;
    try {
      choice = localStorage.getItem(STORE_KEY);
      const t = localStorage.getItem(TRACK_KEY);
      if (t && TRACKS.some((x) => x.id === t)) setTrackId(t);
    } catch {}
    if (choice === null) {
      const id = setTimeout(() => setPrompt(true), 2500);
      return () => clearTimeout(id);
    }
  }, []);

  const store = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {}
  };

  const stopEngine = () => {
    current.current?.stop();
    current.current = null;
  };

  const play = useCallback(async (id) => {
    const track = TRACKS.find((t) => t.id === id) ?? TRACKS[0];
    setTrackId(track.id);
    store(TRACK_KEY, track.id);
    setPrompt(false);
    store(STORE_KEY, "on");
    stopEngine();

    if (track.spotify) {
      // O Spotify toca no seu próprio leitor; o nosso som fica em silêncio
      mix.current?.master.gain.setTargetAtTime(0, mix.current.ctx.currentTime, 0.3);
      setOn(true);
      setPanel(true);
      return;
    }

    if (!mix.current) mix.current = createMixer();
    const m = mix.current;
    if (!m) return;
    if (m.ctx.state === "suspended") await m.ctx.resume();
    m.master.gain.cancelScheduledValues(m.ctx.currentTime);
    m.master.gain.setTargetAtTime(0.9, m.ctx.currentTime, 0.8);
    current.current = track.engine === "house" ? createHouse(m) : createAmbient(m, track.engine);
    current.current.start();
    setOn(true);
  }, []);

  const stop = useCallback(() => {
    stopEngine();
    const m = mix.current;
    if (m) m.master.gain.setTargetAtTime(0, m.ctx.currentTime, 0.4);
    setOn(false);
    setPrompt(false);
    store(STORE_KEY, "off");
  }, []);

  const toggle = useCallback(() => (on ? stop() : play(trackId)), [on, stop, play, trackId]);

  // Brilho conforme a secção + "tic" ao clicar
  useEffect(() => {
    if (!on) return;
    const onSection = (e) => {
      const m = mix.current;
      if (m) m.filter.frequency.setTargetAtTime(BRIGHTNESS[e.detail] ?? 1600, m.ctx.currentTime, 1.5);
    };
    const onClick = (e) => {
      const m = mix.current;
      if (!m || !current.current || !e.target.closest?.("button, a")) return;
      const t = m.ctx.currentTime;
      const o = m.ctx.createOscillator();
      o.frequency.setValueAtTime(1320, t);
      o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
      const g = m.ctx.createGain();
      g.gain.setValueAtTime(0.03, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(m.master);
      o.start(t);
      o.stop(t + 0.14);
    };
    window.addEventListener("section-change", onSection);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("section-change", onSection);
      document.removeEventListener("click", onClick);
    };
  }, [on]);

  // Silencia quando o separador fica escondido
  useEffect(() => {
    if (!on) return;
    const onVis = () => {
      const m = mix.current;
      if (!m) return;
      if (document.hidden) m.ctx.suspend();
      else m.ctx.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];

  return (
    <SoundContext.Provider value={{ on, track, panel, setPanel, play, stop, toggle }}>
      {children}

      {/* Convite discreto, canto inferior esquerdo */}
      <div
        role="dialog"
        aria-label="Ligar o som"
        hidden={!prompt}
        className="glass fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-5 z-[70] w-[min(340px,calc(100vw-2.5rem))] bg-[#17130f]/85 p-5 text-[#faf4ea] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#f5b342]">Esta página tem som</p>
        <p className="mt-2 text-sm text-[#c2b6a3]">
          Uma playlist de quatro faixas, do ambiente ao house. A música muda contigo ao longo da página.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => play(trackId)}
            className="bg-[#ffd88a] px-4 py-2 text-sm text-[#17130f] transition-colors hover:bg-[#faf4ea]"
          >
            Ligar o som
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt(false);
              setPanel(true);
            }}
            className="px-3 py-2 text-sm text-[#faf4ea] underline-offset-4 hover:underline"
          >
            Escolher faixa
          </button>
          <button
            type="button"
            onClick={() => {
              setPrompt(false);
              store(STORE_KEY, "off");
            }}
            className="px-3 py-2 text-sm text-[#c2b6a3] transition-colors hover:text-[#faf4ea]"
          >
            Agora não
          </button>
        </div>
      </div>

      <SoundPanel />
    </SoundContext.Provider>
  );
}

/* ───────────────────────── Painel da playlist ───────────────────────── */

function SoundPanel() {
  const { on, track, panel, setPanel, play, stop } = useSound();
  const ref = useRef(null);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e) => e.key === "Escape" && setPanel(false);
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target) && !e.target.closest?.("[data-sound-toggle]")) setPanel(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [panel, setPanel]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Playlist"
      hidden={!panel}
      className="fixed right-3 top-[4.75rem] z-[75] w-[min(360px,calc(100vw-1.5rem))] rounded-2xl border border-[#faf4ea]/10 bg-[#17130f]/90 p-4 text-[#faf4ea] shadow-[0_30px_90px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl md:right-8"
    >
      <div className="flex items-center justify-between px-1 pb-3 font-mono text-[11px] uppercase tracking-[0.16em]">
        <span className="text-[#f5b342]">Playlist</span>
        <button type="button" onClick={() => setPanel(false)} className="text-[#c2b6a3] hover:text-[#faf4ea]">
          Fechar
        </button>
      </div>

      <ol className="grid gap-1">
        {TRACKS.map((t, i) => {
          const active = t.id === track.id && on;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => (active && !t.spotify ? stop() : play(t.id))}
                aria-pressed={active}
                className={`group grid w-full grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active ? "bg-[#f5b342]/15" : "hover:bg-[#faf4ea]/5"
                }`}
              >
                <span className="font-mono text-[11px] text-[#c2b6a3] tabular-nums">
                  {active && !t.spotify ? (
                    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                      {[0, 1, 2].map((b) => (
                        <span key={b} className="sound-bar w-[2px] bg-[#f5b342]" style={{ animationDelay: `${b * 0.15}s` }} />
                      ))}
                    </span>
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-sm ${active ? "text-[#ffd88a]" : ""}`}>{t.title}</span>
                  <span className="block truncate text-xs text-[#c2b6a3]">{t.artist ?? "Gerada no browser"}</span>
                </span>
                <span className="rounded-full border border-[#faf4ea]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c2b6a3]">
                  {t.kind}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Leitor oficial do Spotify para a faixa de terceiros */}
      {track.spotify && on && (
        <div className="mt-3 overflow-hidden rounded-xl">
          <iframe
            title={`${track.title}, ${track.artist}, no Spotify`}
            src={`https://open.spotify.com/embed/track/${track.spotify}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block border-0"
          />
          <p className="mt-2 px-1 text-[11px] leading-snug text-[#c2b6a3]">
            Carrega no play do Spotify. Sem sessão iniciada no Spotify, ouve-se uma amostra de 30 segundos.
          </p>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[#faf4ea]/10 px-1 pt-3 text-xs text-[#c2b6a3]">
        <span>O som das faixas geradas muda com a secção.</span>
        {on && (
          <button type="button" onClick={stop} className="text-[#faf4ea] underline-offset-4 hover:underline">
            Parar
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Botão do cabeçalho ───────────────────────── */

export function SoundToggle() {
  const ctx = useSound();
  if (!ctx) return null;
  const { on, track, panel, setPanel } = ctx;
  return (
    <button
      type="button"
      data-sound-toggle
      onClick={() => setPanel(!panel)}
      aria-expanded={panel}
      aria-label={on ? `A tocar: ${track.title}. Abrir playlist` : "Abrir playlist"}
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
      <span className="hidden max-w-[10rem] truncate sm:inline">{on ? track.title : "Som"}</span>
    </button>
  );
}
